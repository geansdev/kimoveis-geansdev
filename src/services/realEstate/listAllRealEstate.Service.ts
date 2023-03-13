import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { RealEstate } from "../../entities";

const listAllRealEstateService = async (): Promise<RealEstate[]> => {
  const realEstateRepository: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const realEstateFind: RealEstate[] = await realEstateRepository.find({
    relations: { address: true },
  });

  return realEstateFind;
};

export default listAllRealEstateService;
