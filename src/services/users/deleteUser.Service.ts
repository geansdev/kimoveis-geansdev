import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { AppError } from "../../errors";

const deleteUserService = async (idUser: number): Promise<void> => {
  const user: Repository<User> = AppDataSource.getRepository(User);

  const userDataFind: User | null = await user.findOne({
    where: { id: idUser },
  });

  if (!userDataFind) {
    throw new AppError("User not found", 404);
  } else if (userDataFind?.deletedAt !== null) {
    throw new AppError("User deleted", 404);
  } else {
    await user.softRemove({
      id: idUser,
    });
  }
};

export default deleteUserService;
