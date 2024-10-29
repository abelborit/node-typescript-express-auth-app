import { Router } from "express";
import { ImagesController } from "./controller";

export class ImagesRoutes {
  /* aquí se utiliza static functions porque como no se hará inyección de dependencias entonces no sería necesario instsanciar la clase AppRoutes y solo se coloca directo. También se están usando el get function para tener otra forma de realizar esta función, se podría realizar sin ese get (son solo diferentes formas de hacerlo) */
  static get routes(): Router {
    const router = Router();

    const imagesController = new ImagesController();

    /* se coloca primero las rutas que tengan parámetros porque puede ser que si se coloca primero la ruta base al querer llamar a las rutas con los parámetros estas no funcionen correctamente y me mande la respuesta de la ruta base. Este comportamiento seguramente se debe a cómo Express maneja las rutas, cuando llega una solicitud, Express recorre las rutas en el orden en que se definieron y utiliza la primera que coincide con la ruta de la solicitud, entonces, si se tiene la ruta "/" antes que la de "/:id" Express va a considerar cualquier cosa después del "/" como parte de esa ruta y no como un parámetro para "/:id" por eso es que si se invierte el orden y se pone el "/:id" primero, Express va a reconocer el id como un parámetro y va a devolver la información correspondiente en lugar otra información perteneciente a otra ruta. Algunas veces puede ocurrir eso, y algunas veces no importa el orden de las rutas, pero sería bueno colocar el orden adecuado desde un inicio para evitar problemas a futuro */
    router.get("/:type/:img", imagesController.getImage);

    return router;
  }
}
