import { Request, Response } from "express";
import { TLoginBody } from "../interfaces/login.intefaces";
import createLoginService from "../services/login/createLogin.Service";

const createLoginController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const loginData: TLoginBody = req.body;
  const token = await createLoginService(loginData);

  return res.json({
    token: token,
  });
};

export { createLoginController };
