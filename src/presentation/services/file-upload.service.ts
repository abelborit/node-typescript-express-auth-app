import { UploadedFile } from "express-fileupload";
import fs from "fs";
import path from "path";
import { Uuid } from "../../config";
import { CustomError } from "../../domain/errors/custom.error";

export class FileUploadService {
  /* nuestro constructor será para poder hacer la inyección de dependencias en caso se necesite */
  constructor(
    /* aquí no se necesita instanciar la clase Uuid porque "uuidv4" es un método estático que hemos creado */
    private readonly uuid = Uuid.uuidv4
  ) {}

  /* verificar si existe el folder donde se quiere guardar la imagen */
  private checkFolder(folderPath: string) {
    /* si no existe el "folderPath" que le estamos enviando entonces que lo cree */
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }
  }

  /* cada archivo que se suba se cambiará el nombre por un identificador único y para eso usaremos el paquete "uuid" */
  /* para subir los archivos usará el paquete "express-fileupload" porque estamos usando node con express */
  public async uploadSingle(
    file: UploadedFile,
    folder: string = "uploades",
    validExtensions: string[] = ["png", "jpg", "jpeg", "gif"]
  ) {
    try {
      const fileExtension = file.mimetype.split("/").at(1) ?? ""; // para tomar la segunda posición por ejemplo image/jpeg -> jpeg y si no viene nada entonces que le coloque un string vacío

      if (!validExtensions.includes(fileExtension)) {
        throw CustomError.badRequest_400(
          `Invalid extension: -- ${fileExtension} --, valid ones -- ${validExtensions} --`
        );
      }

      const destination = path.resolve(__dirname, "../../../", folder); // el __dirname es relativo a la carpeta en donde se está ejecutando este archivo de "file-upload.service.ts" y toda esta función hará que se tome el directorio relativo a "file-upload.service.ts", luego que suba 3 directorios y que tome el folder que viene el cual debería estar en el root de la aplicación
      this.checkFolder(destination);

      const fileName = `${this.uuid()}` + "." + `${fileExtension}`;

      /* "mv" es una función que mueve el archivo a cualquier lugar que queramos */
      file.mv(destination + "/" + fileName);

      return { fileName };
    } catch (error) {
      console.log("file-upload.service.ts", { error });

      throw error;
    }
  }

  /* la idea de este método es que según la cantidad de archivos que se quieran subir, vamos a estar llamando al método "uploadSingle" */
  public async uploadMultiple(
    files: UploadedFile[],
    folder: string = "uploades",
    validExtensions: string[] = ["png", "jpg", "jpeg", "gif"]
  ) {
    /* tener en cuenta que por cada archivo se manda a llamar al método "uploadSingle" y dentro tiene el método "checkFolder" entonces por cada archivo que se está subiendo en este "uploadMultiple" se está evaluando si folder existe lo cual es un poco innecesario porque si una imagen se sube entonces todas llegarán al mismo folder. Lo que se puede hacer es tratar de dividir los métodos y sus validaciones para los folders para que solo se mande a llamar una vez esa validación de si la carpeta existe o no para que la cree y poder optimizar un poco el código */
    const filesToUpload = await Promise.all(
      files.map((file) => this.uploadSingle(file, folder, validExtensions))
    );

    return filesToUpload;
  }
}
