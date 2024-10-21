import { ProductModel } from "../../data/mongo";
import { CreateProductDTO } from "../../domain/DTOs/product";
import { PaginationDTO } from "../../domain/DTOs/shared";
import { CustomError } from "../../domain/errors/custom.error";

export class ProductService {
  /* nuestro constructor será para poder hacer la inyección de dependencias en caso se necesite */
  constructor() {}

  public async createProduct(createProductDTO: CreateProductDTO) {
    const productExist = await ProductModel.findOne({
      name: createProductDTO.name,
    });

    if (productExist) throw CustomError.badRequest_400("Product already exist");

    try {
      /* en teoría, aquí solo sería necesario enviar el createProductDTO porque en el CreateProductDTO ya viene el usuario y la categoría y ese es uno de los beneficios también de hacerlo en el DTO y no en el servicio directamente */
      const newProduct = new ProductModel(createProductDTO);

      await newProduct.save();

      /* el return para poder regresar algo o lo necesario al hacer uso de esta API. Aquí se va a regresar totalmente el product y toda la información que venga como por ejemplo el _id de mongo entre otras cosas que sería bueno conocer que viene */
      return newProduct;
    } catch (error) {
      throw CustomError.internalServer_500(`Internal Server Error - ${error}`);
    }
  }

  public async getProducts(paginationDTO: PaginationDTO) {
    /* aquí también se podrían colocar valores por defecto como page = 1 y limit = 10 pero como ya está validado en los pasos previos entonces no sería necesario */
    const { page, limit } = paginationDTO;

    try {
      /* saber el total de registros */
      // const totalDocuments = await ProductModel.countDocuments();
      // /* aquí se colocará el skip que especifica la cantidad de documentos que se saltará, es decir, si page es 1 entonces sería 1 - 1 * 10 que sería igual a 0 registros saltados, entonces estamos en la página 1 mostrando los 10 primeros por defecto, si colocamos page 2 sería 2 - 1 * 10 que sería 10 entonces serían las primeras 10 categorías saltadas, es decir, estaríamos en la page 2 con los 10 registros siguientes. Se colcoca como (page - 1) porque vamos a querer enviar el page al usuario para que sepa en qué página está */
      // const products = await ProductModel.find()
      //   .skip((page - 1) * limit)
      //   .limit(limit);

      /* NOTA: arriba se están haciendo dos await por separado lo cual puede ser bloqueante porque se ejecutará una después de la otra, pero también se podrían hacer en simultáneo para ahorrar un poco de tiempo y que ambas peticiones se hagan en paralelo */
      const [totalDocuments, products] = await Promise.all([
        ProductModel.countDocuments(),
        ProductModel.find()
          .skip((page - 1) * limit)
          .limit(limit),
      ]);

      return {
        pagination: {
          page: page,
          limit: limit,
          totalDocuments: totalDocuments,
          next: `/api/products/get-products?page=${page + 1}&limit=${limit}`,
          prev:
            page - 1 > 0
              ? `/api/products/get-products?page=${page - 1}&limit=${limit}`
              : null,
        },
        products: products, // aquí se va a regresar totalmente el product y toda la información que venga como por ejemplo el _id de mongo entre otras cosas que sería bueno conocer que viene
      };
    } catch (error) {
      throw CustomError.internalServer_500(`Internal Server Error - ${error}`);
    }
  }
}
