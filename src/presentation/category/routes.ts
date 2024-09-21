import { Router } from "express";
import { CategoryController } from "./controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { CategoryService } from "../services/category.service";

export class CategoryRoutes {
  /* aquí se utiliza static functions porque como no se hará inyección de dependencias entonces no sería necesario instsanciar la clase AppRoutes y solo se coloca directo. También se están usando el get function para tener otra forma de realizar esta función, se podría realizar sin ese get (son solo diferentes formas de hacerlo) */
  static get routes(): Router {
    const router = Router();

    const categoryService = new CategoryService();
    const categoryController = new CategoryController(categoryService);

    /* Routes de las API del auth */
    /* FORMA 1: aquí solo se está mandando la referencia a la función porque lo que se manda y lo que se recibe es el mismo orden y lo mismo */
    /* se coloca primero las rutas que tengan parámetros porque puede ser que si se coloca primero la ruta base al querer llamar a las rutas con los parámetros estas no funcionen correctamente y me mande la respuesta de la ruta base. Este comportamiento seguramente se debe a cómo Express maneja las rutas, cuando llega una solicitud, Express recorre las rutas en el orden en que se definieron y utiliza la primera que coincide con la ruta de la solicitud, entonces, si se tiene la ruta "/" antes que la de "/:id" Express va a considerar cualquier cosa después del "/" como parte de esa ruta y no como un parámetro para "/:id" por eso es que si se invierte el orden y se pone el "/:id" primero, Express va a reconocer el id como un parámetro y va a devolver la información correspondiente en lugar otra información perteneciente a otra ruta. Algunas veces puede ocurrir eso, y algunas veces no importa el orden de las rutas, pero sería bueno colocar el orden adecuado desde un inicio para evitar problemas a futuro */
    router.get("/get-categories", categoryController.getCategories);

    /* en este caso, solo vamos a utilizar el middleware de AuthMiddleware para una ruta en particular, la cual es la ruta de crear la categoría que es un post, pero si se necesita colocar o que afecte a varias rutas dentro de una ruta padre, entonces también se podría hacer, es decir, si quisiéramos que afecte todas las rutas de una ruta padre, por ejemplo, que el AuthMiddleware afecte a todas las rutas hijas de ..../api/categories/.... también se puede hacer */
    /* en este caso como queremos que afecte a una ruta en particular, se coloca solo en esa ruta y se puede colocar como segundo argumento el middleware a utilizar o sino un arreglo de middleware porque si tenemos más middleware entonces sería solo añadirlo. Colocando el middleware aquí entonce hará que solo esta ruta en particular tenga esa validación necesaria en cada request para ver si el usuario puede acceder o no a crear una categoría y con esto estamos creando una ruta protegida */
    router.post(
      "/create-category",
      [AuthMiddleware.validateJWT], // si es un solo middleware se puede colocar directo AuthMiddleware.validateJWT sin el arreglo
      categoryController.createCategory
    );

    /* FORMA 2: aquí se está mandando la función con sus parámetros que es una segunda forma de hacerlo en vez de la de arriba  */
    // router.get("/get-categories", (request, response) =>
    //   categoryController.getCategories(request, response)
    // );

    return router;
  }
}
