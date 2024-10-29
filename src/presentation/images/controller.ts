import { Request, Response } from "express";
import fs from "fs";
import path from "path";

/* el controlador será una clase que nos permita hacer inyección de dependencias y también tendrá todos los handlers los cuales recibirán la información para poder realizar alguna acción pero los handlers en el controlador no deberían realizar los trabajos de creación, validación y los demás procesos, ya que simplemente este es el controlador de la ruta y en este caso quien va a realizar esas tareas será un servicio que sería algo similar a un gestor de estado y será quien se encargue de ejecutar toda la parte pesada, es decir, todos los procesos o tareas de creación, validación, etc, entonces nuestro controlador es quien delegará la información al servicio quien realizará la lógica */
export class ImagesController {
  /* nuestro constructor será para poder hacer la inyección de dependencias */
  constructor() {}

  public getImage = (request: Request, response: Response) => {
    const { type = "", img = "" } = request.params;

    /* en este caso lo haremos todo en el controlador porque no son muchas líneas de código aunque también se podría crear en un servicio aparte */
    const imagePath = path.resolve(
      __dirname,
      `../../../uploades/${type}/${img}`
    );
    console.log({ imagePath });

    if (!fs.existsSync(imagePath)) {
      return response.status(404).send({ error: "Image not found" });
    }

    response.status(200).sendFile(imagePath);
  };
}
