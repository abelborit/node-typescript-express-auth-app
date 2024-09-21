/* hay que crear esquemas y modelos y estos son una forma de colección que sería como una tabla en una base de datos relacionales. Es una manera en la cual vamos a comenzar a grabar información en nuestra base de datos mongodb. Aquí se llaman modelos porque de alguna manera tenemos que ir viendo cómo vamos a guardar nuestra información en mongo */

/* uno de los beneficios de trabajar con mongoose y mongo es que a diferencia de la base de datos relacionales, aquí se puede ir trabajando con la base de datos antes de se tenga definida la base de datos que aquí son llamadas colecciones y documentos */

import mongoose, { Schema } from "mongoose";

/* el esquema serán las reglas que queremos definir en el objeto y es cómo queremos guardar la información */
/* este esquema tendrá la diferencia en que cada categoría creada en la base de datos debe tener relación con un usuario en la base de datos */
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    // required: true, // si se quiere guardar el name en nuestro categorySchema entonces el name tiene que venir sí o sí porque si no dará un error
    required: [true, "Name is required"], // si se quiere guardar el name en nuestro categorySchema entonces el name tiene que venir sí o sí porque si no dará un error el cual se lo podemos mandar de esa forma en un arreglo
    unique: true,
  },
  available: {
    type: Boolean,
    default: false,
  },
  user: {
    type: Schema.Types.ObjectId, // este campo de -- user : {........} -- será de tipo Schema.Types.ObjectId el cual es un tipo especial similar a los String o Boolean, pero Schema.Types.ObjectId va a obligar a que se esté trabajando con un id de Mongo
    ref: "User", // hacer referencia a nuestro modelo creado de user.model.ts
    required: true, // cada categoría debe de tener un usuario
  },
});

/* modelo para poder interactuar con mongo. El nombre que aparecerá será "Categories" porque mongoose por defecto toma el nombre del modelo y le aumenta una "s" o "ies" pero eso igual se puede colocar según el nombre que nosotros queramos */
export const CategoryModel = mongoose.model("Category", categorySchema);
