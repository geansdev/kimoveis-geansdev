import { Router } from "express";
import { createLoginController } from "../controllers/login.controller";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import { createLoginSchemas } from "../schemas/login.schemas";

const loginRoutes: Router = Router();

loginRoutes.post(
  "",
  ensureDataIsValidMiddleware(createLoginSchemas),
  createLoginController
);

export default loginRoutes;
