import { Request, Response } from "express";
import createUserService from "../services/users/createUser.Service";
import deleteUserService from "../services/users/deleteUser.Service";
import listAllUserService from "../services/users/listAllUsers.Service";
import updateUserService from "../services/users/updateUser.Service";

const createUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userData = req.body;
  const newUser = await createUserService(userData);
  return res.status(201).json(newUser);
};

const listUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const listUserData = await listAllUserService();
  return res.json(listUserData);
};

const updateUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userData = req.body;
  const userId = +req.params.id;
  const updateUser = await updateUserService(userData, userId);
  return res.status(200).json(updateUser);
};

const deleteUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const idUser = +req.params.id;
  await deleteUserService(idUser);
  return res.status(204).send();
};

export {
  createUserController,
  listUsersController,
  updateUserController,
  deleteUserController,
};
