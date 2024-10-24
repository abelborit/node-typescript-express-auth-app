/* cuando estemos trabajando con una REST-Full API con conexión a una base de datos, es siempre conveniente tener algún seed o semilla para poblar la base de datos para que si llega un nuevo developer entonces no toque directamente la base de datos que se tiene en desarollo sino que se tenga una como base de datos local para poder hacer los cambios que se deseen */

/* algo que se recomienda es no colocar la ruta directamente donde están las demás rutas de producción porque si está ahí entonces cabe la posiblidad que en alguna oportunidad esta ruta donde está el seed o semilla pueda ser llamada y como ya se tienen datos precargados entonces ese seed actualizaría toda la base de datos de producción */

/* aquí estarían los prodecimientos que voy a ejecutar para el seed o semilla. Este seed será como un procedimiento independiente y asilado, no es el servidor, es un procedimiento similar que nos ayudará a llenar nuestra base de datos */

import { envs } from "../../config";
import { MongoConnectionDataBase } from "../mongo";

const main = async () => {
  console.log("Base de datos poblada con el seed ✅");
};

/* otra forma de colocarlo también es colocar primero en la función anónima autoinvocada la conexión a la base de datos y dejar la función main un poco más limpia */
(async () => {
  /* antes de ejecutar el servidor podemos asegurarnos de tener la conexión a la base de datos */
  await MongoConnectionDataBase.connect({
    mongoUrl: envs.MONGO_URL,
    databaseName: envs.MONGO_DB_NAME,
  });

  await main();

  /* para poder desconectarnos del servidor y ya con eso tenemos libre la terminal también porque se termina el proceso */
  await MongoConnectionDataBase.disconnect();
})();
