import { Router } from "express";
import { AuthRoutes } from "./auth/routes";
import { CategoryRoutes } from "./category/routes";
import { ProductRoutes } from "./products/routes";

export class AppRoutes {
  /* aquí se utiliza static functions porque como no se hará inyección de dependencias entonces no sería necesario instanciar la clase AppRoutes y solo se coloca directo. También se están usando el get function para tener otra forma de realizar esta función, se podría realizar sin ese get (son solo diferentes formas de hacerlo) */
  static get routes(): Router {
    const router = Router();

    /* Routes de las API */
    /* este sería un middelware básicamente porque es una función que se va a ejecutar cuando pase la ruta por aquí en "/api/todos" */
    // router.use("/api/todos", TodosRoutes.routes); // ejemplo de lo que podría crearse a futuro para usar en este archivo de routes
    router.use("/api/auth", AuthRoutes.routes);
    router.use("/api/categories", CategoryRoutes.routes);
    router.use("/api/products", ProductRoutes.routes);

    return router;
  }
}
