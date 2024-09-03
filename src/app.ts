import { Server } from "./presentation/server";
import { envs } from "./config/envs.plugin";
import { AppRoutes } from "./presentation/routes";

const main = () => {
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
