import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities";
import { AppError } from "../errors";

const ensureEmailExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const userEmail = req.body.email;
  const user = AppDataSource.getRepository(User);

  const emailExists = await user.findOneBy({
    email: userEmail,
  });

  if (emailExists) {
    throw new AppError("Email already exists", 409);
  }

  return next();
};

export default ensureEmailExistsMiddleware;
