import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { RealEstate } from "../../entities";
import { AppError } from "../../errors";

const listSchedulesByRealEstateService = async (
  idRealEstate: number
): Promise<RealEstate> => {
  const realEstateRepository: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const realEstateFind: RealEstate | null = await realEstateRepository.findOne({
    where: { id: idRealEstate },
    relations: {
      address: true,
      category: true,
      schedules: {
        user: true,
      },
    },
  });

  if (!realEstateFind) {
    throw new AppError("RealEstate not found", 404);
  }

  return realEstateFind;
};

export default listSchedulesByRealEstateService;
