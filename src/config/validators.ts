import mongoose from "mongoose";

export class Validators {
  static isMongoID(id: string) {
    /* una pregunta sería el por qué no usar directamente el id en la capa de dominio. Primero, porque estamos usando un código de terceros aquí como mongoose y lo que queremos es que nuestros DTO's estén lo más limpios posibles con nuestro código propio para que si algo se tiene que cambiar, solo se cambie o actualice donde sea necesario como en este caso que se está usando el patrón adaptador, porque estamos adaptando una librería de terceros para usar solo en los lugares necesarios y si al día de mañana cambia algo de mongoose entonces este archivo sea el único que cambia */
    /* si no hacemos esta validación entonces al usar el endpoint por ejemplo en postman, cuando queramos enviar el id de la categoría o el id del usuario nos saldrá un error similar a:

      "error": "Internal Server Error - ValidationError: user: Cast to ObjectId failed for value \"UserEntity {\n  id: new ObjectId('66f1892f0c20f61261b1d497'),\n  name: 'Usuario 1',\n  email: 'correo@correo.com',\n  emailValidated: false,\n  password: '$2a$10$LlZ076Nd5q7WfX50xWVhiuSKaCLqqorwo6o1uttM/Ei6Z2LKpXC3e',\n  roleUser: [ 'USER_ROLE' ],\n  imageUser: undefined\n}\" (type UserEntity) at path \"user\" because of \"BSONError\", category: Cast to ObjectId failed for value \"123\" (type string) at path \"category\" because of \"BSONError\""
    */
    return mongoose.isValidObjectId(id);
  }
}
