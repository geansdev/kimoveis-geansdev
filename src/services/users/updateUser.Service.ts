import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { AppError } from "../../errors";
import { TWithoutPassword } from "../../interfaces/users.intefaces";
import { UserWithoutPasswordSchema } from "../../schemas/users.schemas";

const updateUserService = async (
  newUserData: Partial<User>,
  idUser: number
): Promise<TWithoutPassword> => {
  const user: Repository<User> = AppDataSource.getRepository(User);

  const userData: User | null = await user.findOne({
    where: { id: idUser },
  });

  if (!userData) {
    throw new AppError("User not found", 404);
  }

  const updateUserData: User = user.merge(userData, newUserData);
  const saveUserData: User = await user.save(updateUserData);

  const returnUserData: TWithoutPassword =
    UserWithoutPasswordSchema.parse(saveUserData);

  return returnUserData;
};
export default updateUserService;
