/* por ejemplo si queremos crear una categoría necesitaríamos que nos mande cierta información como un name, user, etc, pero cada propiedad o campo puede tener sus propias restricciones y validaciones. Si estamos esperando recibir esa información entonces eso se tiene que validar y transformar en caso sea necesario para tener el tipo de dato que se espera recibir porque puede ser que la aplicación no funcione si por ejemplo en el name se manda como boolean pero se esperaba recibir un string, entonces para hacer esas validaciones y transformaciones se usan los DTOs */

/* los DTOs pueden ser una clase o función, pero se debe de asegurar de cómo viene la data */
export class CreateCategoryDTO {
  /* será un private constructor porque la única forma de crear un DTO será a través del método estático propio de esta clase */
  private constructor(
    public readonly name: string,
    public readonly available: boolean
  ) {}

  /* aquí las props van a simular lo que vendría del request.body. Lo que se regresar puede ser cualquier cosa según como lo necesitemos, puede ser ": CreateCategoryDTO | undefined" indicando que hubo un error o también ": CreateCategoryDTO | string" para manejar si se retornar un error en caso algo salió mal y ver el mensaje pero en este caso será ": [string?, CreateCategoryDTO?]" un arreglo donde el primer elemento será un string para saber qué fue lo que salió mal que indicaría el error y el segundo será una instancia del CreateCategoryDTO pero ambos serán opcionales porque si tenemos un error entonces está el string y si no tenemos un error entonces está el CreateCategoryDTO que sería la instancia */
  static execute(props: { [key: string]: any }): [string?, CreateCategoryDTO?] {
    const { name, available = false } = props;

    let availableAsBoolean = available; // para tomar el valor que viene de available y guardarlo en una variable para luego hacer las validaciones y si es algo que no sea un valor boolean (porque por ejemplo si se manda como json será tipo boolean pero si se manda como x-www-form-urlencoded vendrá como string) entonces tocará hacer la conversión necesaria

    /* validaciones de nuestras properties tal cual lo haríamos comúnmente */
    if (!name) return ["name is missing", undefined]; // se podría colocar también como --if (!name) return ["name is missing"];-- porque el segundo argumento sería considerado como undefined

    /* el available puede venir como string o sino como un boolean, porque por ejemplo si se manda como json será tipo boolean pero si se manda como x-www-form-urlencoded vendrá como string */
    if (typeof available !== "boolean") {
      availableAsBoolean = available === "true"; // con esto dirá que si available es igual a "true" como string entonces lo coloque como true (es una simple validación) y si es cualquier otra cosa entonces será un false
    }

    return [undefined, new CreateCategoryDTO(name, availableAsBoolean)];
  }
}
