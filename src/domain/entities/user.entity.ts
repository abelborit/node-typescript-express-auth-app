/* dentro de entities van a ser nuestros objetos que son lo más atómico de la aplicación y no debería tener ninguna ingerencia del mundo exterior (las carpetas exteriores), es decir, todo lo que hagamos en domain no debería de tener nada del código externo como por ejemplo, importaciones de librerías sino solo debería de ser el código y lenguaje de programación que estamos utilizando, en este caso express o si usamos python entonces solo python, eso sería lo recomendado */

import { CustomError } from "../errors/custom.error";

/* lo que esté en entities, y a diferencia de lo que tenemos en la base de datos, este entity no está relacionado a la base de datos, se asemeja mucho a lo que se grabará sin embargo, esto es lo que se usará en la aplicación y luego lo que se tendrá en la base de datos es indiferente porque la base de datos puede cambiar pero yo no quiero que mi aplicación se vea afectada y por otro lado si la entidad cambia por alguna razón no debería verse afectada la base de datos tampoco */

/* aquí como nosotros queramos crear nuestra entidad va a depender de lo que tengamos, por ejemplo tener un método que se fromJSON, o de repente otros. Esta es una simple entidad y conforme la vayamos usando, por ejemplo se podría crear un mapper y de lo que venga de Prisma o Mongo u otra base de datos a nuestra entidad vamos a tener que hacer algún tipo de conversión y que cuando se use la entidad siempre se va a tener la información correspondiente */
export class UserEntity {
  constructor(
    /* no se coloca como readonly a las propiedades porque bueno, esas propiedades se podrían modificar. Aquí es muy similar a lo que se tiene en la base de datos pero NO es lo mismo */
    public id: string, // aunque Mongoose colocará el _id, aquí también lo manejaremos pero como un id
    public name: string,
    public email: string,
    public emailValidated: boolean,
    public password: string,
    public roleUser: string[],
    public imageUser?: string // cuando se coloca una propiedad en opcional, tiene que ir al último
  ) {}

  /* ahora con esto podemos crear la instancia desde el objeto, entonces esto quiere decir que en realidad nuestro fromObject sería un método estático y por eso el static y al final nuestro fromObject recibirá el objeto y crea nuestra instancia con lo que necesita (con lo que se pide en el constructor) */
  /* cuando se define un argumento como { [key: string]: any }, se está diciendo básicamente que esperamos un objeto donde las keys del objeto son strings y los valores pueden ser de cualquier tipo, esto es útil cuando no se sabe exactamente qué propiedades va a tener el objeto que se va a recibir en la función, pero se sabe que puede tener varias y que todas serán strings con cualquier tipo de valor, es como una forma de decir esto puede ser cualquier cosa pero con la estructura de un objeto, así da la flexibilidad para manejar datos que pueden variar mucho sin perder la ventaja de tener tipado en TypeScript */
  public static fromObject(object: { [key: string]: any }): UserEntity {
    /* desestructurar de las propiedades que vienen de la base de datos para poder luego retornarlas en nuestra entidad */
    const {
      id, // este sería ya el id serializado, es decir, el que nos da Mongoose
      _id, // es el que viene de Mongo
      name,
      email,
      emailValidated,
      password,
      roleUser,
      imageUser,
    } = object;

    /* aquí se podrían realizar los análisis o las validaciones necesarias. Aquí también se podría colocar dentro de un logger pero técnicamente esto no se estaría esperando que sea algo que dispare el cliente o sea la solicitud de la persona, sino que son más que todo protecciones para los desarrolladores que quieran usar este UserEntity por si algún día cambia la base de datos y que no esté estrechamente ligado nuestro código con esa base de datos y poder trabajarlo de forma independiente */
    /* para un caso práctico se podría colocar directo algo similar a un --if (!id) throw "id is required";-- con el throw "propiedad is required" directo porque es un caso práctico y solo se está colocando el mensaje directo, pero sería mejor colocarlo con --if (!id) throw new Error("propiedad is required");-- para crear un objeto de error que contiene información adicional lo que facilita la depuración y entendimiento del código de error, pero en este caso haremos uso de la clase CustomError */
    if (!_id && !id) throw CustomError.badRequest_400("id is missing"); // si el _id y id no vienen dará error
    if (!name) throw CustomError.badRequest_400("name is missing"); // si el name no viene dará error
    if (!email) throw CustomError.badRequest_400("email is missing"); // si el email no viene dará error
    if (emailValidated === undefined)
      throw CustomError.badRequest_400("emailValidated is missing"); // se coloca emailValidated === undefined porque el emailValidated siempre será un boolean y también tiene un valor por defecto de false, entonces siempre lo vamos a querer recibir, entonces por A o por B si es explícitamente undefined dará error. Entonces cuando se trabajen valores booleanos se tendría que hacer de esta forma la validación
    if (!password) throw CustomError.badRequest_400("password is missing"); // si el password no viene dará error
    if (!roleUser) throw CustomError.badRequest_400("roleUser is missing"); // si el roleUser no viene dará error

    /* regresar nuestra entidad UserEntity con las propiedades necesarias para nuestra aplicación (aquí ya estarían convertidas del objeto que se recibe de la base de datos) */
    return new UserEntity(
      _id || id,
      name,
      email,
      emailValidated,
      password,
      roleUser,
      imageUser
    );
  }
}
