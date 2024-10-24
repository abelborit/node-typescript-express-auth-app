/* cuando estemos trabajando con una REST-Full API con conexión a una base de datos, es siempre conveniente tener algún seed o semilla para poblar la base de datos para que si llega un nuevo developer entonces no toque directamente la base de datos que se tiene en desarollo sino que se tenga una como base de datos local para poder hacer los cambios que se deseen */

/* algo que se recomienda es NO colocar la ruta directamente donde están las demás rutas de producción porque si está ahí entonces cabe la posiblidad que en alguna oportunidad esta ruta donde está el seed o semilla pueda ser llamada y como ya se tienen datos precargados entonces ese seed actualizaría toda la base de datos de producción. También sería conveniente tener como alguna variable en las envs que diga que estamos en producción y así no correr o ejecutar este procedimiento del seed porque nos podemos borrar toda la base de datos */

/* aquí estarían los prodecimientos que voy a ejecutar para el seed o semilla. Este seed será como un procedimiento independiente y asilado, no es el servidor, es un procedimiento similar que nos ayudará a llenar nuestra base de datos */

import { envs } from "../../config";
import {
  CategoryModel,
  MongoConnectionDataBase,
  ProductModel,
  UserModel,
} from "../mongo";
import { seedData } from "./data";

const randomBetween0AndX = (x: number) => {
  return Math.floor(Math.random() * x); // si x es 10 entonces iría desde un número de 0 a 10
};

const main = async () => {
  /* PASO 1 -> Borrar todo para empezar desde cero */
  await Promise.all([
    UserModel.deleteMany(),
    CategoryModel.deleteMany(),
    ProductModel.deleteMany(),
  ]);

  /* PASO 2 -> Crear usuarios */
  const users = await UserModel.insertMany(seedData.users);

  /* PASO 3 -> Crear categorías */
  const categories = await CategoryModel.insertMany(
    seedData.categories.map((category) => {
      return {
        ...category,
        user: users[0]._id, // necesitamos el id del usuario y en este caso estamos seleccionando el primer usuario
      };
    })
  );

  /* PASO 4 -> Crear productos */
  const products = await ProductModel.insertMany(
    seedData.products.map((product) => {
      return {
        ...product,
        /* se coloca -- seedData.users.length - 1 -- porque como los arreglos es en base a 0 entonces por eso el -1 */
        user: users[randomBetween0AndX(seedData.users.length - 1)]._id, // necesitamos el id del usuario y aquí lo estamos haciendo de forma aleatoria
        category:
          categories[randomBetween0AndX(seedData.categories.length - 1)]._id, // necesitamos el id de la categoría y aquí lo estamos haciendo de forma aleatoria
      };
    })
  );

  console.log("Base de datos poblada con el seed ✅");
};

/* otra forma de colocarlo también es colocar primero en la función anónima autoinvocada la conexión a la base de datos y dejar la función main un poco más limpia */
(async () => {
  if (envs.IS_PRODUCTION) {
    console.log("Estamos en producción, NO se ejecutará el seed!! ❌");
    return;
  }

  /* antes de ejecutar el servidor podemos asegurarnos de tener la conexión a la base de datos */
  await MongoConnectionDataBase.connect({
    mongoUrl: envs.MONGO_URL,
    databaseName: envs.MONGO_DB_NAME,
  });

  await main();

  /* para poder desconectarnos del servidor y ya con eso tenemos libre la terminal también porque se termina el proceso */
  await MongoConnectionDataBase.disconnect();
})();
