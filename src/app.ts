import { Server } from "./presentation/server";
import { envs } from "./config/envs.plugin";
import { AppRoutes } from "./presentation/routes";
import { MongoConnectionDataBase } from "./data/mongo";

const main = async () => {
  /* antes de ejecutar el servidor podemos asegurarnos de tener la conexión a la base de datos */
  await MongoConnectionDataBase.connect({
    mongoUrl: envs.MONGO_URL,
    databaseName: envs.MONGO_DB_NAME,
  });

  const server = new Server({
    port: envs.PORT,
    public_path: envs.PUBLIC_PATH,
    routes: AppRoutes.routes,
  });

  server.start();
};

(async () => {
  main();
})();
