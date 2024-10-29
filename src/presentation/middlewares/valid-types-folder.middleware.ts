import { NextFunction, Request, Response } from "express";

export class ValidTypesFolderMiddleware {
  /* vamos a enviar los tipos de folders de forma semi dinámica porque queremos mandar por ejemplo -- const validTypes = ["users", "categories", "products"]; -- pero el código solo lo queremos tener una vez entonces vamos a enviar ese parámetro o argumento a nuestro middleware y hacerlo así sería algo como una inyección de dependencias por ejemplo, también darse cuenta que es un factory method, es decir, estamos retornando o regresando una función dentro de otra función */
  static checkTypeFolder(validTypes: string[]) {
    /* aquí vamos a retornar la función de nuestro middleware o producto de nuestro middleware */
    return (request: Request, response: Response, next: NextFunction) => {
      /* FORMA 1: colocando directo en la ruta */
      /* IMPORTANTE: si colocamos este middleware para que afecte a todas las rutas, es decir, en el -- router.use(......) -- entonces este type nos llegará como un "undefined" porque al colocarlo de forma general para todas las rutas entonces no sabemos qué ruta exactamente lo está usando y es por eso que no se pueden leer los parámetros y por ende nos da un "undefined" pero si colocamos este middleware directo en la ruta donde queremos usarlo por ejemplo para "uploadMultipleFiles" en -- router.post(......); -- entonces ahí sí reconoce los params y nos dará el parámetro */
      // const type = request.params.type;
      // console.log({ type });

      /* FORMA 2: usando el -- router.use(......) -- */
      /* para mantener la forma en cómo lo estamos trabajando, es decir, con el -- router.use(......) -- entonces lo vamos a solucionar de esta manera pero esta opción o la anterior son totalmente válidas */
      /* se coloca el -- ?? "" -- porque nos dice que puede ser que sea undefined */
      const type = request.url.split("/").at(2) ?? ""; // porque sería "/single/:type" -> [ '', 'single', 'products' ]
      // console.log({ type });

      if (!validTypes.includes(type)) {
        return response.status(400).json({
          error: `Invalid type: -- ${type} --, valid ones -- ${validTypes} --`,
        });
      }

      next();
    };
  }
}
