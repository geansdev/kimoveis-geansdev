import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Category, RealEstate } from "../../entities";
import { AppError } from "../../errors";

const listCategoryByRealEstateService = async (idCategory: number) => {
  const categoryRepository: Repository<Category> =
    AppDataSource.getRepository(Category);

  const realEstateRepository: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const CategoryFind: Category | null = await categoryRepository.findOne({
    where: { id: idCategory },
  });

  if (!CategoryFind) {
    throw new AppError("RealEstate not found", 404);
  }

  const realEstateFind: RealEstate[] = await realEstateRepository.find();

  const listFind = {
    ...CategoryFind,
    realEstate: realEstateFind,
  };

  return listFind;
};

export default listCategoryByRealEstateService;
