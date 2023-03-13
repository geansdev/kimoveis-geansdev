import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { TWithoutPassword } from "../../interfaces/users.intefaces";
import { UserWithoutPasswordSchema } from "../../schemas/users.schemas";

const createUserService = async (userData: User): Promise<TWithoutPassword> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const user: User = userRepository.create(userData);

  await userRepository.save(user);

  const newUser: TWithoutPassword = UserWithoutPasswordSchema.parse(user);

  return newUser;
};

export default createUserService;
