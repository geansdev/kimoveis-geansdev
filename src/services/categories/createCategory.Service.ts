import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Category } from "../../entities";
import { AppError } from "../../errors";
import { TCategoriesBody } from "../../interfaces/users.intefaces";

const createCategoryService = async (
  categoryData: TCategoriesBody
): Promise<Category> => {
  const categoryRepository: Repository<Category> =
    AppDataSource.getRepository(Category);

  const categoryFind: Category | null = await categoryRepository.findOne({
    where: { name: categoryData.name },
  });

  if (categoryFind) {
    throw new AppError("Category already exists", 409);
  }

  const newCategory: Category = categoryRepository.create(categoryData);

  await categoryRepository.save(newCategory);

  return newCategory;
};
export default createCategoryService;
