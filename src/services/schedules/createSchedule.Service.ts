import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { RealEstate, Schedule, User } from "../../entities";
import { AppError } from "../../errors";
import { TSchedulesBody } from "../../interfaces/users.intefaces";

const createScheduleService = async (
  idUser: number,
  schedulesData: TSchedulesBody
): Promise<string> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const realEstateRepository: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const schedulesRepository: Repository<Schedule> =
    AppDataSource.getRepository(Schedule);

  const userSchedulesFind: Schedule | null = await schedulesRepository.findOne({
    where: { date: schedulesData.date, hour: schedulesData.hour },
    relations: { user: true },
  });

  if (userSchedulesFind && userSchedulesFind.user.id === idUser) {
    throw new AppError(
      "User schedule to this real estate at this date and time already exists",
      409
    );
  }

  const schedulesFind: Schedule | null = await schedulesRepository.findOne({
    where: { date: schedulesData.date, hour: schedulesData.hour },
  });

  if (schedulesFind) {
    throw new AppError(
      "Schedule to this real estate at this date and time already exists",
      409
    );
  }

  const dateTime: string = schedulesData.date + " " + schedulesData.hour;
  const dateHour: number = new Date(dateTime).getHours();
  const dateDay: number = new Date(dateTime).getDay();

  if (dateDay > 5) {
    throw new AppError("Invalid date, work days are monday to friday", 400);
  }

  if (dateHour < 8 || dateHour > 18) {
    throw new AppError("Invalid hour, available times are 8AM to 18PM", 400);
  }

  const userFind: User | null = await userRepository.findOneBy({
    id: idUser,
  });

  if (!userFind) {
    throw new AppError("User not found", 404);
  }

  const realEstateFind: RealEstate | null = await realEstateRepository.findOne({
    where: { id: schedulesData.realEstateId },
    relations: {
      address: true,
      category: true,
    },
  });

  if (!realEstateFind) {
    throw new AppError("RealEstate not found", 404);
  }

  const createSchedule: Schedule = schedulesRepository.create({
    ...schedulesData,
    realEstate: realEstateFind,
    user: userFind,
  });

  const newSchedules: Schedule = schedulesRepository.create(createSchedule);

  await schedulesRepository.save(newSchedules);

  return "Schedule created";
};
export default createScheduleService;
