import { CategoryModel } from "../../data/mongo";
import { CreateCategoryDTO } from "../../domain/DTOs/category";
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

  public async getCategories() {
    try {
      const categories = await CategoryModel.find();

      return categories.map((category) => {
        return {
          id: category.id,
          name: category.name,
          available: category.available,
        };
      });
    } catch (error) {
      throw CustomError.internalServer_500(`Internal Server Error - ${error}`);
    }
  }
}
