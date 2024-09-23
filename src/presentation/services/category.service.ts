import { CategoryModel } from "../../data/mongo";
import { CreateCategoryDTO } from "../../domain/DTOs/category";
import { PaginationDTO } from "../../domain/DTOs/shared";
import { UserEntity } from "../../domain/entities/user.entity";
import { CustomError } from "../../domain/errors/custom.error";

export class CategoryService {
  public async createCategory(
    createCategoryDTO: CreateCategoryDTO,
    user: UserEntity
  ) {
    const categoryExist = await CategoryModel.findOne({
      name: createCategoryDTO.name,
    });

    if (categoryExist)
      throw CustomError.badRequest_400("Category already exist");

    try {
      const newCategory = new CategoryModel({
        ...createCategoryDTO,
        user: user.id, // solo se necesita grabar el id del usuario para la creación de la categoría, para poder identificar a qué usuario le pertenece
      });

      await newCategory.save();

      /* el return para poder regresar algo o lo necesario al hacer uso de esta API */
      return {
        category: {
          id: newCategory.id,
          name: newCategory.name,
          available: newCategory.available,
        },
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      };
    } catch (error) {
      throw CustomError.internalServer_500(`Internal Server Error - ${error}`);
    }
  }

  public async getCategories(paginationDTO: PaginationDTO) {
    /* aquí también se podrían colocar valores por defecto como page = 1 y limit = 10 pero como ya está validado en los pasos previos entonces no sería necesario */
    const { page, limit } = paginationDTO;

    try {
      /* saber el total de registros */
      // const totalDocuments = await CategoryModel.countDocuments();
      // /* aquí se colocará el skip que especifica la cantidad de documentos que se saltará, es decir, si page es 1 entonces sería 1 - 1 * 10 que sería igual a 0 registros saltados, entonces estamos en la página 1 mostrando los 10 primeros por defecto, si colocamos page 2 sería 2 - 1 * 10 que sería 10 entonces serían las primeras 10 categorías saltadas, es decir, estaríamos en la page 2 con los 10 registros siguientes. Se colcoca como (page - 1) porque vamos a querer enviar el page al usuario para que sepa en qué página está */
      // const categories = await CategoryModel.find()
      //   .skip((page - 1) * limit)
      //   .limit(limit);

      /* NOTA: arriba se están haciendo dos await por separado lo cual puede ser bloqueante porque se ejecutará una después de la otra, pero también se podrían hacer en simultáneo para ahorrar un poco de tiempo y que ambas peticiones se hagan en paralelo */
      const [totalDocuments, categories] = await Promise.all([
        CategoryModel.countDocuments(),
        CategoryModel.find()
          .skip((page - 1) * limit)
          .limit(limit),
      ]);

      return {
        pagination: {
          page: page,
          limit: limit,
          totalDocuments: totalDocuments,
          next: `/api/categories/get-categories?page=${
            page + 1
          }&limit=${limit}`,
          prev:
            page - 1 > 0
              ? `/api/categories/get-categories?page=${page - 1}&limit=${limit}`
              : null,
        },
        categories: categories.map((category) => {
          return {
            id: category.id,
            name: category.name,
            available: category.available,
          };
        }),
      };
    } catch (error) {
      throw CustomError.internalServer_500(`Internal Server Error - ${error}`);
    }
  }
}
