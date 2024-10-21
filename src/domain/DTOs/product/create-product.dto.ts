/* por ejemplo si queremos crear una categoría necesitaríamos que nos mande cierta información como un name, user, etc, pero cada propiedad o campo puede tener sus propias restricciones y validaciones. Si estamos esperando recibir esa información entonces eso se tiene que validar y transformar en caso sea necesario para tener el tipo de dato que se espera recibir porque puede ser que la aplicación no funcione si por ejemplo en el name se manda como boolean pero se esperaba recibir un string, entonces para hacer esas validaciones y transformaciones se usan los DTOs */

/* los DTOs pueden ser una clase o función, pero se debe de asegurar de cómo viene la data */
/* NOTA: lo que se hará aquí a diferencia de lo que se hizo en -- create-category.dto.ts -- es que aquí se va a recibir el usuario porque debería ser obligatorio tener el id del usuario o lo que se necesite del usuario para poder crear el producto. En el caso del -- create-category.dto.ts -- lo que se está haciendo es solo recibir lo necesario para crear la categoría y luego en el -- category.service.ts -- es quien recibe el usuario. Ambas formas son correctas, igual sería mejor trabajarlo como se está haciendo aquí, pero se hizo de ambas formas para tener más opciones para trabajar o lo que se nos haga más facil y entendible */
export class CreateProductDTO {
  /* será un private constructor porque la única forma de crear un DTO será a través del método estático propio de esta clase */
  private constructor(
    public readonly name: string,
    public readonly available: boolean,
    public readonly price: number,
    public readonly description: string,
    public readonly user: string, // se podría pensar que podría ser de tipo UserEntity pero hay que recordar que este es un DTO, es decir, está bien relacionado con a la información que se espera recibir en lo que se envíe en el post de la petición (ya sea como raw o x-www-form-urlencoded) y no se está esperando que ahí se envíe el usuario pero será necesario tenerlo para crear un producto. Lo manejaremos como un string porque ahí vendrá el id del usuario que es lo único que necesitamos por ahora
    public readonly category: string // aquí también será el id de la categoría
  ) {}

  /* aquí las props van a simular lo que vendría del request.body. Lo que se regresar puede ser cualquier cosa según como lo necesitemos, puede ser ": CreateProductDTO | undefined" indicando que hubo un error o también ": CreateProductDTO | string" para manejar si se retornar un error en caso algo salió mal y ver el mensaje pero en este caso será ": [string?, CreateProductDTO?]" un arreglo donde el primer elemento será un string para saber qué fue lo que salió mal que indicaría el error y el segundo será una instancia del CreateProductDTO pero ambos serán opcionales porque si tenemos un error entonces está el string y si no tenemos un error entonces está el CreateProductDTO que sería la instancia */
  static execute(props: { [key: string]: any }): [string?, CreateProductDTO?] {
    const {
      name,
      available = false,
      price,
      description,
      user,
      category,
    } = props;

    let availableAsBoolean = available; // para tomar el valor que viene de available y guardarlo en una variable para luego hacer las validaciones y si es algo que no sea un valor boolean (porque por ejemplo si se manda como json será tipo boolean pero si se manda como x-www-form-urlencoded vendrá como string) entonces tocará hacer la conversión necesaria

    /* validaciones de nuestras properties tal cual lo haríamos comúnmente */
    if (!name) return ["name is missing", undefined]; // se podría colocar también como -- if (!name) return ["name is missing"]; -- porque el segundo argumento sería considerado como undefined
    if (!user) return ["user is missing", undefined]; // se podría colocar también como -- if (!user) return ["user is missing"]; -- porque el segundo argumento sería considerado como undefined
    if (!category) return ["category is missing", undefined]; // se podría colocar también como -- if (!category) return ["category is missing"]; -- porque el segundo argumento sería considerado como undefined

    /* el available puede venir como string o sino como un boolean, porque por ejemplo si se manda como json será tipo boolean pero si se manda como x-www-form-urlencoded vendrá como string */
    if (typeof available !== "boolean") {
      availableAsBoolean = available === "true"; // con esto dirá que si available es igual a "true" como string entonces lo coloque como true (es una simple validación) y si es cualquier otra cosa entonces será un false
    }

    return [
      undefined,
      new CreateProductDTO(
        name,
        availableAsBoolean, // lo que también se puede hacer es colocarlo como -- !!available -- para que tenga la doble negación porque aquí puede venir un valor pero no necesariamente un boolean sino un string
        price,
        description,
        user,
        category
      ),
    ];
  }
}
