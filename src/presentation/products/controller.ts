import { Request, Response } from "express";
import { CustomError } from "../../domain/errors/custom.error";
import { PaginationDTO } from "../../domain/DTOs/shared";

/* el controlador será una clase que nos permita hacer inyección de dependencias y también tendrá todos los handlers los cuales recibirán la información para poder realizar alguna acción pero los handlers en el controlador no deberían realizar los trabajos de creación, validación y los demás procesos, ya que simplemente este es el controlador de la ruta y en este caso quien va a realizar esas tareas será un servicio que sería algo similar a un gestor de estado y será quien se encargue de ejecutar toda la parte pesada, es decir, todos los procesos o tareas de creación, validación, etc, entonces nuestro controlador es quien delegará la información al servicio quien realizará la lógica */
export class ProductController {
  /* nuestro constructor será para poder hacer la inyección de dependencias */
  constructor() {}

  /* vamos a centralizar las respuestas que sean de error. Se coloca error: unknown porque puede ser un error lanzada por la aplicación o nuestro custom error, entonces lo haremos de tal forma que pueda aceptar cualquier tipo de excepción que se pueda dar. Algo importante a tener en cuenta es que este handleErrorResponse tiene que ser lo último que se pueda ejecutar */
  private handleErrorResponse = (response: Response, error: unknown) => {
    /* significa que es una excepción lanzada o controlada por nosotros mismos y que intencionalmente nosotros hicimos para poder controlarlo */
    if (error instanceof CustomError) {
      response.status(error.statusCode).json({ error: error.messageError });
      return; // para que ya no continúe
    }

    /* si no es un error controlado por nosotros entonces será un 500 porque es un error que no estamos manejando ni controlando. Esto no debería de suceder nunca porque no es un error manejado por nosotros, pero se puede dar por ejemplo que la base de datos no estaba creada, una conversión no fue posible o cosas similares */
    return response
      .status(500)
      .json({ error: "Internal Server Error - Check your logs" });
  };

  public createProduct = (request: Request, response: Response) => {
    /* como en el AuthMiddleware estamos colocando que el body de la request se le coloque también el usuario entonces con este -- response.json(request.body) -- veremos que tiene el producto creado y toda la información del usuario, password, id, role, token, etc */
    // response.json(request.body);

    response.json("createProduct");
  };

  public getProducts = (request: Request, response: Response) => {
    /* los query parameters siempre vienen como string */
    const { page = 1, limit = 10 } = request.query;

    /* aquí se está haciendo recibiendo solo lo justo y necesario como el page y limit, pero también se puede colocar para que el PaginationDTO pueda recibir todo el request.query como arriba en el createCategory y ya en el DTO recién hacer las validaciones y demás */
    /* aquí se coloca el + en page y limit, es decir, se coloca así (+page, +limit) porque como page y limit del request.query siempre vendrán como string, entonces colocando el + ya lo convertiría en un número y ya en el DTO se hacen las validaciones correspondientes */
    const [error, paginationDTO] = PaginationDTO.execute(+page, +limit);

    if (error) return response.status(400).json({ error });

    response.status(200).json(paginationDTO);
  };
}