import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { TWithoutPassword } from "../../interfaces/users.intefaces";
import { UserWithoutPasswordSchema } from "../../schemas/users.schemas";

const listAllUserService = async (): Promise<TWithoutPassword[]> => {
  const user: Repository<User> = AppDataSource.getRepository(User);

  const userFind: User[] = await user.find();

  const userParse: TWithoutPassword[] =
    UserWithoutPasswordSchema.array().parse(userFind);

  return userParse;
};

export default listAllUserService;
