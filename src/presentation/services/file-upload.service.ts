import { UploadedFile } from "express-fileupload";
import fs from "fs";
import path from "path";

export class FileUploadService {
  /* nuestro constructor será para poder hacer la inyección de dependencias en caso se necesite */
  constructor() {}

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
      const fileExtension = file.mimetype.split("/").at(1); // para tomar la segunda posición por ejemplo image/jpeg -> jpeg
      const destination = path.resolve(__dirname, "../../../", folder); // el __dirname es relativo a la carpeta en donde se está ejecutando este archivo de "file-upload.service.ts" y toda esta función hará que se tome el directorio relativo a "file-upload.service.ts", luego que suba 3 directorios y que tome el folder que viene el cual debería estar en el root de la aplicación

      this.checkFolder(destination);

      /* "mv" es una función que mueve el archivo a cualquier lugar que queramos */
      file.mv(destination + "/" + "nombre-archivo." + fileExtension);
    } catch (error) {
      console.log("file-upload.service.ts", { error });
    }
  }

  /* la idea de este método es que según la cantidad de archivos que se quieran subir, vamos a estar llamando al método "uploadSingle" */
  public async uploadMultiple(
    file: UploadedFile[],
    folder: string = "uploades",
    validExtensions: string[] = ["png", "jpg", "jpeg", "gif"]
  ) {
    throw new Error("Not implemented");
  }
}
