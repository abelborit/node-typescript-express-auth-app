/* por ejemplo si queremos crear un usuario necesitaríamos que nos mande cierta información como un name, email, age y password pero cada propiedad o campo puede tener sus propias restricciones y validaciones. Si estamos esperando recibir esa información entonces eso se tiene que validar y transformar en caso sea necesario para tener el tipo de dato que se espera recibir porque puede ser que la aplicación no funcione si por ejemplo en el age se manda como número pero se esperaba recibir un string, entonces para hacer esas validaciones y transformaciones se usan los DTOs */

import { regularExps } from "../../../config";

/* los DTOs pueden ser una clase o función, pero se debe de asegurar de cómo viene la data */
export class LoginUserDTO {
  /* será un private constructor porque la única forma de crear un DTO será a través del método estático propio de esta clase */
  private constructor(
    public readonly email: string,
    public readonly password: string
  ) {}

  /* aquí las props van a simular lo que vendría del request.body. Lo que se regresar puede ser cualquier cosa según como lo necesitemos, puede ser ": LoginUserDTO | undefined" indicando que hubo un error o también ": LoginUserDTO | string" para manejar si se retornar un error en caso algo salió mal y ver el mensaje pero en este caso será ": [string?, LoginUserDTO?]" un arreglo donde el primer elemento será un string para saber qué fue lo que salió mal que indicaría el error y el segundo será una instancia del LoginUserDTO pero ambos serán opcionales porque si tenemos un error entonces está el string y si no tenemos un error entonces está el LoginUserDTO que sería la instancia */
  static execute(props: { [key: string]: any }): [string?, LoginUserDTO?] {
    const { email, password } = props;

    /* validaciones de nuestras properties tal cual lo haríamos comúnmente */
    if (!email) return ["email is missing", undefined]; // se podría colocar también como --if (!email) return ["email is missing"];-- porque el segundo argumento sería considerado como undefined
    if (!regularExps.email.test(email))
      return ["email is not valid", undefined];
    if (!password) return ["password is missing", undefined];
    if (password.length < 6) return ["password is too short", undefined];

    return [undefined, new LoginUserDTO(email, password)];
  }
}
