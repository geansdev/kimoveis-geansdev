import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Category } from "../entities";
import { AppError } from "../errors";

const ensureCategoryExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const categoryId = +req.params.id;
  const category = AppDataSource.getRepository(Category);

  const categoryExists = await category.findOneBy({
    id: categoryId,
  });

  if (!categoryExists) {
    throw new AppError("Category not found", 404);
  }

  return next();
};

export default ensureCategoryExistsMiddleware;
