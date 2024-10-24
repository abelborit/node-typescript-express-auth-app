/* archivo de inicialización de nuestra base de datos y conectar nuestra app con mongo */
import mongoose from "mongoose";

interface ConnectionOptions {
  mongoUrl: string;
  databaseName: string;
}

export class MongoConnectionDataBase {
  /* para la parte de la conexión, lo haremos con un método estático a menos que se necesite una inyección de dependencias, si no entonces este método estático sería una función común y corriente solo que ya lo tenemos agrupada aquí */

  /* en este caso para evitar esas "dependencias ocultas" es que se crea una interface para poder recibir las opciones que necesito en lugar de colocarlas directamente aquí, lo cual se podría llamar directamente desde las variables de entorno, pero se generarían unas "dependencias ocultas" */
  static async connect(connectionOptions: ConnectionOptions) {
    const { mongoUrl, databaseName } = connectionOptions;

    try {
      await mongoose.connect(mongoUrl, {
        dbName: databaseName,
      });

      console.log("Mongo connected✅");

      /* este método debería mínimo regresar un true si se llega a conectar y en el catch ahí ya lanza un error */
      return true;
    } catch (error) {
      console.log("Mongo connection error❌:", error);

      /* si se lanza un throw en un catch, entonces eso va a cancelar el proceso y lanzará un error, por ejemplo si mi aplicación graba en mongo y no puedo conectarme a mongo entonces no vale la pena continuar y que lance el error */
      throw error;
    }
  }

  static async disconnect() {
    await mongoose.disconnect();
  }
}
