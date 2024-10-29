import { Request, Response } from "express";
import { CustomError } from "../../domain/errors/custom.error";
import { FileUploadService } from "../services/file-upload.service";
import { UploadedFile } from "express-fileupload";

/* el controlador será una clase que nos permita hacer inyección de dependencias y también tendrá todos los handlers los cuales recibirán la información para poder realizar alguna acción pero los handlers en el controlador no deberían realizar los trabajos de creación, validación y los demás procesos, ya que simplemente este es el controlador de la ruta y en este caso quien va a realizar esas tareas será un servicio que sería algo similar a un gestor de estado y será quien se encargue de ejecutar toda la parte pesada, es decir, todos los procesos o tareas de creación, validación, etc, entonces nuestro controlador es quien delegará la información al servicio quien realizará la lógica */
export class FileUploadController {
  /* nuestro constructor será para poder hacer la inyección de dependencias */
  constructor(private readonly fileUploadService: FileUploadService) {}

  /* vamos a centralizar las respuestas que sean de error. Se coloca error: unknown porque puede ser un error lanzada por la aplicación o nuestro custom error, entonces lo haremos de tal forma que pueda aceptar cualquier tipo de excepción que se pueda dar. Algo importante a tener en cuenta es que este handleErrorResponse tiene que ser lo último que se pueda ejecutar */
  private handleErrorResponse = (response: Response, error: unknown) => {
    /* significa que es una excepción lanzada o controlada por nosotros mismos y que intencionalmente nosotros hicimos para poder controlarlo */
    if (error instanceof CustomError) {
      response.status(error.statusCode).json({ error: error.messageError });
      return; // para que ya no continúe
    }

    /* si no es un error controlado por nosotros entonces será un 500 porque es un error que no estamos manejando ni controlando. Esto no debería de suceder nunca porque no es un error manejado por nosotros, pero se puede dar por ejemplo que la base de datos no estaba creada, una conversión no fue posible o cosas similares */
    return response
      .status(500)
      .json({ error: "Internal Server Error - Check your logs" });
  };

  public uploadFile = (request: Request, response: Response) => {
    // console.log({ body: request.body }); // NOTA: en el body aparte de recibir el archivo también se pueden recibir datos adicionales del usuario o del producto o de lo que necesitemos, y eso ya sería hacerlo con el -- multipart/form-data -- como se menciona en el README

    /* como se colocó el middleware de "fileUpload" entonces eso hará que en la request se cree una propiedad llamada "files" y es una propiedad opcional */
    /* NOTA: cuando es un solo archivo nos da un objeto y cuando son varios archivos nos da un arreglo lo cual vamos a homogenizar esa parte para que cuando sea un solo archivo o varios archivos, nos de un arreglo */
    // console.log({ files: request.files });
    // response.json("uploadFile");

    const type = request.params.type;
    const validTypes = ["users", "categories", "products"];

    if (!validTypes.includes(type)) {
      return response.status(400).json({
        error: `Invalid type: -- ${type} --, valid ones -- ${validTypes} --`,
      });
    }

    /* esto ya no sería necesario porque ya estamos pasando todo por nuestro middleware entonces ya no lo tenemos directo desde el "request.files" sino ahora lo colocamos desde el body "request.body.files" y es más facil de tomar los archivos desde ahí */
    // const file = request.files?.file as UploadedFile; // se coloca el "as UploadedFile" porque si no entonces saldrá un error en ".uploadSingle(file)" porque nosotros estamos mandando un "UploadedFile" y no un "UploadedFile | UploadedFile[]"
    const file = request.body.files[0] as UploadedFile; // podría ser también -- request.body.files.at(0) as UploadedFile; --

    this.fileUploadService
      .uploadSingle(file, `uploades/${type}`)
      .then((uploaded) => response.status(200).json(uploaded))
      .catch((error) => this.handleErrorResponse(response, error));
  };

  public uploadMultipleFiles = (request: Request, response: Response) => {
    // console.log({ body: request.body }); // NOTA: en el body aparte de recibir el archivo también se pueden recibir datos adicionales del usuario o del producto o de lo que necesitemos, y eso ya sería hacerlo con el -- multipart/form-data -- como se menciona en el README

    /* como se colocó el middleware de "fileUpload" entonces eso hará que en la request se cree una propiedad llamada "files" y es una propiedad opcional */
    /* NOTA: cuando es un solo archivo nos da un objeto y cuando son varios archivos nos da un arreglo lo cual vamos a homogenizar esa parte para que cuando sea un solo archivo o varios archivos, nos de un arreglo */
    // console.log({ files: request.files });
    // response.json("uploadMultipleFiles");

    const type = request.params.type;
    const validTypes = ["users", "categories", "products"];

    if (!validTypes.includes(type)) {
      return response.status(400).json({
        error: `Invalid type: -- ${type} --, valid ones -- ${validTypes} --`,
      });
    }

    /* esto ya no sería necesario porque ya estamos pasando todo por nuestro middleware entonces ya no lo tenemos directo desde el "request.files" sino ahora lo colocamos desde el body "request.body.files" y es más facil de tomar los archivos desde ahí */
    // const file = request.files?.file as UploadedFile; // se coloca el "as UploadedFile" porque si no entonces saldrá un error en ".uploadSingle(file)" porque nosotros estamos mandando un "UploadedFile" y no un "UploadedFile | UploadedFile[]"
    const files = request.body.files as UploadedFile[]; // podría ser también -- request.body.files.at(0) as UploadedFile; --

    this.fileUploadService
      .uploadMultiple(files, `uploades/${type}`)
      .then((uploaded) => response.status(200).json(uploaded))
      .catch((error) => this.handleErrorResponse(response, error));
  };
}
