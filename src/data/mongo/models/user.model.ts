/* hay que crear esquemas y modelos y estos son una forma de colección que sería como una tabla en una base de datos relacionales. Es una manera en la cual vamos a comenzar a grabar información en nuestra base de datos mongodb. Aquí se llaman modelos porque de alguna manera tenemos que ir viendo cómo vamos a guardar nuestra información en mongo */

/* uno de los beneficios de trabajar con mongoose y mongo es que a diferencia de la base de datos relacionales, aquí se puede ir trabajando con la base de datos antes de se tenga definida la base de datos que aquí son llamadas colecciones y documentos */

import mongoose from "mongoose";

/* el esquema serán las reglas que queremos definir en el objeto y es cómo queremos guardar la información */
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: true, // si se quiere guardar el name en nuestro userSchema entonces el name tiene que venir sí o sí porque si no dará un error
    required: [true, "Name is required"], // si se quiere guardar el name en nuestro userSchema entonces el name tiene que venir sí o sí porque si no dará un error el cual se lo podemos mandar de esa forma en un arreglo
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true, // el email tiene que ser un valor único entonces en la base de datos NO tiene que existir un email duplicado
  },
  emailValidated: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  imageUser: {
    type: String,
  },
  roleUser: {
    type: [String], // se coloca en un arreglo porque el rol puede ser Admin, User, Worker, etc, entonces es un arreglo de string
    enum: ["ADMIN_ROLE", "USER_ROLE"], // las opciones que puede tener el campo roleUser
    default: ["USER_ROLE"], // valor por defecto del campo roleUser
  },
});

/* modelo para poder interactuar con mongo. El nombre que aparecerá será "Users" porque mongoose por defecto toma el nombre del modelo y le aumenta una "s" pero eso igual se puede colocar según el nombre que nosotros queramos */
export const AuthModel = mongoose.model("User", userSchema);

/* ---- NOTAS DE OTRO EJERCICIO ---- */
/* NOTA 1 */
/* como sabemos, nuestra entidad como por ejemplo un "src\domain\entities\log.entity.ts" es la que rije, entonces nosotros tenemos que hacernos un modelo para trabajar con la información similar a la que está abajo, puede ser idéntica, puede ser diferente, puede que tenga una base de datos ya previamente creada, etc, pero lo de abajo es lo que se maneja en la entidad y eso es lo importante para nosotros y no lo que esté en la base de datos, lo cual puede ser algo dificil de pensar porque se puede decir que la base de datos es quien rije todo, cosa que al día de mañana puede cambiar la base de datos o la estructura o algo similar y la aplicación no debería verse afectada */
/*
  severityLevel: LogSeverityLevel;
  message: string;
  origin: string;
  createdAt?: Date;
*/
/* SUB-NOTA: en este ejercicio de node-typescript-express-auth-app la entidad es la que rije entonces nosotros creamos un modelo o esquema en base a lo que nosotros necesitamos trabajar en la base de datos, que en este caso es para trabajar con usuarios */

/* NOTA 2 */
/* también se puede tipar lo que regresa el model ya que tipar lo que retorna el modelo es una buena práctica en TypeScript. De esta manera, se puede asegurar que el modelo tenga las propiedades y métodos correctos. Además, en este caso, al extender la interfaz LogEntity e importar el tipo Document de Mongoose, también se está garantizando que el modelo tenga las propiedades y métodos necesarios para ser un modelo de Mongoose */

// import { LogEntity } from "../../../domain/entities/log.entity";

// export interface MongoLog extends LogEntity, Document {}

// export const LogModel = mongoose.model<MongoLog>("Log", logSchema);
