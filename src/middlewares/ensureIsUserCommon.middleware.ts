import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";

const ensureIsUserCommonMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const admin = req.user.admin;

  if (admin === false && +req.params.id !== req.user.id) {
    throw new AppError("Insufficient permission", 403);
  }

  return next();
};

export default ensureIsUserCommonMiddleware;
