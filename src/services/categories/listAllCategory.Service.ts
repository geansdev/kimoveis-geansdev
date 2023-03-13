import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Category } from "../../entities";
import { categoriesSchemas } from "../../schemas/categories.schemas";

const listAllCategoryService = async (): Promise<Category[]> => {
  const category: Repository<Category> = AppDataSource.getRepository(Category);
  const categoryFind: Category[] = await category.find();

  const categoryParse: Category[] = categoriesSchemas
    .array()
    .parse(categoryFind);

  return categoryParse;
};

export default listAllCategoryService;
