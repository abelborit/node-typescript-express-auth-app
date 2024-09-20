/* al crear un middleware podemos colocar que si falla entonces detenga la ejecución y que mande un error, en nuestro caso, si el token no es válido o ya expiró podemos cancelar el funcionamiento */

import { NextFunction, Request, Response } from "express";
import { CustomError } from "../../domain/errors/custom.error";
import { JwtAdapter } from "../../config";
import { AuthModel } from "../../data/mongo";
import { UserEntity } from "../../domain/entities/user.entity";

export class AuthMiddleware {
  /* para este caso, este middleware no necesita crear una instancia, por ende, no necesita un constructor, entonces bastaría con crear métodos estáticos */

  /* aquí será muy similar a un controlador de ruta, es decir, un controller, porque tendrá una request, un response pero ahora también tendrá un next */
  static async validateJWT(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    /* la idea será tomar el token que viene dentro de los headers de autenticación en el Bearer Token. Se puede colocar el Authorization o sino un x-token si queremos que sea un header personalizado. El Authorization es un header bien estándar para estos casos */
    const authorization = request.header("Authorization");

    if (!authorization)
      return response
        .status(401)
        .json({ error: "No token sent. You have to provide it" });

    /* indicar que se tiene que proveer el token como un Bearer Token */
    if (!authorization.startsWith("Bearer "))
      return response.status(401).json({ error: "Ivalid Bearer token" });

    /* tomar el token, es decir, lo que viene después del Bearer y su espacio por eso el .split(" ") y tomaremos la segunda posición con el .at(1) o sino también puede ser [1] sino que con la nueva forma o métodos para los arreglos podría ser con .at(1) o como siempre con el [1] */
    const token = authorization.split(" ").at(1) || ""; // si no viene nada entonces será un string vacío solo para asegurarnos que siempre se tendrá un valor en nuestro token y que siempre será un string

    try {
      /* verificar el token y tendrá el tipo de objeto que tenga un id que sea de tipo string */
      const payloadToken = await JwtAdapter.validateToken<{
        id: string;
        email: string;
      }>(token);

      /* aquí también se puede colocar como un bad request, pero estaría mejor como unauthorized (no autorizado) porque el token no es válido */
      if (!payloadToken) throw CustomError.unauthorized_401("Invalid Token"); // porque puede ser que no se firmó correctamente, no tiene la misma seed y que por ende no podemos confiar en ese token

      /* si no nos acordamos qué estamos enviando en el token podemos realizar un registro de un nuevo usuario o un login de un usuario existente y en la respuesta que nos genera copiar el token e ir a https://jwt.io/ y pegar el token y veremos que estamos enviando el id y el email. También se puede ir al archivo auth.service.ts para ver en los métodos de registerUser y loginUser y en la generación del token veremos que estamos enviando el id y el email */
      /* porque puede ser que haya un problema con el email que se mandó en el payload, o no se mandó por el lado del backend o sucedió algo inesperado */
      if (!payloadToken.email)
        throw CustomError.internalServer_500("Email not in token");
      if (!payloadToken.id)
        throw CustomError.internalServer_500("Id not in token");

      /* tomar el usuario de la base de datos según el id que viene en el token */
      const user = await AuthModel.findById(payloadToken.id);

      /* el usuario debería de existir pero por A o B motivo si el usuario no existe o alguien lo borró o sucedió algo inesperado y se coloca un internalServer_500 porque es un error de nuestro lado, es decir, no podría ser un badRequest_400 porque no tiene nada que ver con que el usuario haya enviado mal alguna data. También podría ser un 401 para indicar que el usuario no está autorizado para realizar alguna acción */
      // if (!user) throw CustomError.internalServer_500("Invalid token - user not exists");
      if (!user) throw CustomError.unauthorized_401("Invalid token - user");

      /* entonces si tenemos un usuario vendríamos a enviar el token, lo cual se puede enviar en el body, en los headers, o donde veamos que sea necesario */
      // request.body.user = user; // hacerlo de esta forma estaríamos amarrando a la request que tengan las propiedades que vengan con el usuario, entonces nos gustaría que cuando venga el request.body.user sea una instancia de nuestra entidad UserEntity y usaremos el fromObject y eso hará otras validaciones internas
      request.body.user = UserEntity.fromObject(user); // con esto, entonces lo que sea que pase después de llamar a este AuthMiddleware con su validateJWT, siempre vamos a tener al usuario en la request del body. También se podría mandar en los headers pero en el body será muy facil poder obtenerlo, y al crear la categoría veremos que viene el usuario en el body

      /* si todo sale bien entonces al final tenemos que llamar a la función next() para que pueda seguir el proces del siguiente middleware o con el siguiente controlador de ruta (controller) o lo que esté primero */
      next();
    } catch (error) {
      console.log(error);

      /* FORMA 1: usando directamente */
      return response
        .status(500)
        .json({ error: `Internal Server error - ${error}` });

      /* FORMA 2: usando el CustomError */
      // throw CustomError.internalServer_500(`Internal Server Error - ${error}`);
    }
  }
}
