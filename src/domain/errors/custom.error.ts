/* puede ser extends o implements */
export class CustomError extends Error {
  /* se coloca como private para que solo se pueda utilizar en nuestros métodos estáticos */
  private constructor(
    public readonly messageError: string,
    public readonly statusCode: number
  ) {
    /* aquí se coloca el super() porque como CustomError se está extendiendo del Error entonces necesita inicializar lo que necesita el Error para que sea permitido */
    super(messageError);
  }

  /* como van a ser muchos errores los que podríamos manejar, entonces sería medio tedioso ir creando la instancia de CustomError y pasarle el messageError y statusCode, entonces también podríamos hacer una serie de factory constructors o métodos factory que regresen nuestra instancia previamente creada */
  static badRequest_400(messageError: string) {
    /* regrear una instancia de nuestro CustomError con el messageError del método badRequest y el código en duro de lo que sería el error personalizado */
    return new CustomError(messageError, 400);
  }

  static unauthorized_401(messageError: string) {
    return new CustomError(messageError, 401);
  }

  static forbidden_403(messageError: string) {
    return new CustomError(messageError, 403);
  }

  static notFound_404(messageError: string) {
    return new CustomError(messageError, 404);
  }

  static internalServer_500(messageError: string) {
    return new CustomError(messageError, 500);
  }
}
