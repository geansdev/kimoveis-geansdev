import { Router } from "express";
import {
  createRealEstateController,
  listAllRealEstateController,
} from "../controllers/realEstate.controller";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import ensureIsAdminMiddleware from "../middlewares/ensureIsAdmin.middleware";
import ensureTokenIsValidMiddleware from "../middlewares/ensureTokenIsValid.middleware";
import { validRealEstateBody } from "../schemas/realEstate.schemas";

const realEstateRoutes: Router = Router();

realEstateRoutes.post(
  "",
  ensureTokenIsValidMiddleware,
  ensureIsAdminMiddleware,
  ensureDataIsValidMiddleware(validRealEstateBody),
  createRealEstateController
);

realEstateRoutes.get("", listAllRealEstateController);

export default realEstateRoutes;
