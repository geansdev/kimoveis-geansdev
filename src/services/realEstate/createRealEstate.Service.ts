import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Address, Category, RealEstate } from "../../entities";
import { AppError } from "../../errors";

const createRealEstateService = async (
  realEstateData: any
): Promise<RealEstate[]> => {
  const realEstateRepository: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const addressRepository: Repository<Address> =
    AppDataSource.getRepository(Address);

  const categoryRepository: Repository<Category> =
    AppDataSource.getRepository(Category);

  const addressExist: Address | null = await addressRepository.findOneBy({
    street: realEstateData.address.street,
    city: realEstateData.address.city,
    zipCode: realEstateData.address.zipCode,
    state: realEstateData.address.state,
  });

  if (addressExist) {
    throw new AppError("Address already exists", 409);
  }

  const createAdress: Address[] = addressRepository.create(
    realEstateData.address
  );

  await addressRepository.save(createAdress);

  const categoryFind: Category | null = await categoryRepository.findOne({
    where: { id: realEstateData.categoryId },
  });

  if (!categoryFind) {
    throw new AppError("Category not found", 404);
  }

  const createRealEstate: RealEstate[] = realEstateRepository.create({
    ...realEstateData,
    address: createAdress,
    category: categoryFind,
  });

  await realEstateRepository.save(createRealEstate);

  return createRealEstate;
};
export default createRealEstateService;
