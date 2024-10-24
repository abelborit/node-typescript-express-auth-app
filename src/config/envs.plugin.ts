import "dotenv/config"; // para que use la configuración por defecto y cargue mis variables de entorno acorde a mi archivo .env
import { get } from "env-var";

export const envs = {
  PORT: get("PORT").required().asPortNumber(),
  PUBLIC_PATH: get("PUBLIC_PATH").default("public").asString(), // si no viene el valor usa "public" y si viene el valor entonces usa el valor que viene

  /* MONGO DB */
  MONGO_URL: get("MONGO_URL").required().asString(),
  MONGO_DB_NAME: get("MONGO_DB_NAME").required().asString(),
  MONGO_USER: get("MONGO_USER").required().asString(),
  MONGO_PASS: get("MONGO_PASS").required().asString(),

  /* JWT */
  JWT_SEED: get("JWT_SEED").required().asString(),

  /* ENVIO DE CORREO */
  MAILER_SERVICE: get("MAILER_SERVICE").required().asString(),
  MAILER_EMAIL: get("MAILER_EMAIL").required().asEmailString(),
  MAILER_SECRET_KEY: get("MAILER_SECRET_KEY").required().asString(),
  SEND_EMAIL_WORKING: get("SEND_EMAIL_WORKING")
    .default("false")
    .required()
    .asBool(), // las variables de entorno vienen como string por eso el "false" pero luego se le dice que lo trabaje como boolean con el .asBool()

  /* GENERAR LINK DE RETORNO AL CORREO DEL USUARIO Y PODER REALIZAR LA VALIDACIÓN */
  WEB_SERVICE_URL: get("WEB_SERVICE_URL").required().asString(),

  /* PARA SABER SI ESTAMOS EN PRODUCCIÓN O NO PARA VER SI PODEMOS O NO POBLAR LA BASE DE DATOS CON EL SEED */
  IS_PRODUCTION: get("IS_PRODUCTION").required().asBool(),
};
