/* este archivo de paginación se crea en una carpeta shared porque me ayudará a crear una paginación independientemente de qué endpoint se esté utilizando, es por eso que está dentro de shared que sería como un compartido */

/* los DTOs pueden ser una clase o función, pero se debe de asegurar de cómo viene la data */
export class PaginationDTO {
  /* será un private constructor porque la única forma de crear un DTO será a través del método estático propio de esta clase */
  private constructor(
    public readonly page: number,
    public readonly limit: number
  ) {}

  /* aquí las props van a simular lo que vendría del request.body. Lo que se regresar puede ser cualquier cosa según como lo necesitemos, puede ser ": PaginationDTO | undefined" indicando que hubo un error o también ": PaginationDTO | string" para manejar si se retornar un error en caso algo salió mal y ver el mensaje pero en este caso será ": [string?, PaginationDTO?]" un arreglo donde el primer elemento será un string para saber qué fue lo que salió mal que indicaría el error y el segundo será una instancia del PaginationDTO pero ambos serán opcionales porque si tenemos un error entonces está el string y si no tenemos un error entonces está el PaginationDTO que sería la instancia */
  static execute(
    page: number = 1,
    limit: number = 10
  ): [string?, PaginationDTO?] {
    /* por si page o limit no son números, es decir, si se envían como string o como cualquier otra cosa */
    if (isNaN(page)) return ["Page must be a number", undefined];
    if (isNaN(limit)) return ["Limit must be a number", undefined];

    /* aquí también se podría hacer que si es 0 entonces se envíen los valores mínimos permitidos */
    if (page <= 0) return ["Page must be greater than 0", undefined];
    if (limit <= 0) return ["Limit must be greater than 0", undefined];
    if (limit > 20) return ["Limit must be equal or lower than 20", undefined];

    return [undefined, new PaginationDTO(page, limit)];
  }
}
