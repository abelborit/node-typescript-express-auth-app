export class FileUploadService {
  /* nuestro constructor será para poder hacer la inyección de dependencias en caso se necesite */
  constructor() {}

  /* verificar si existe el folder donde se quiere guardar la imagen */
  private checkFolder(folderPath: string) {
    throw new Error("Not implemented");
  }

  /* cada archivo que se suba se cambiará el nombre por un identificador único y para eso usaremos el paquete "uuid" */
  /* para subir los archivos usará el paquete "express-fileupload" porque estamos usando node con express */
  public uploadSingle(
    file: any,
    folder: string = "uploades",
    validExtensions: string[] = ["png", "jpg", "jpeg", "gif"]
  ) {
    throw new Error("Not implemented");
  }

  /* la idea de este método es que según la cantidad de archivos que se quieran subir, vamos a estar llamando al método "uploadSingle" */
  public uploadMultiple(
    file: any[],
    folder: string = "uploades",
    validExtensions: string[] = ["png", "jpg", "jpeg", "gif"]
  ) {
    throw new Error("Not implemented");
  }
}
