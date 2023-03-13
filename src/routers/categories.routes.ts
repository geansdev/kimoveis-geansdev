import { Router } from "express";
import {
  createCategoryController,
  listAllCategoryController,
  listCategoryByRealEstateController,
} from "../controllers/category.controller";
import ensureCategoryExistsMiddleware from "../middlewares/ensureCategoryExists.middleware";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import ensureIsAdminMiddleware from "../middlewares/ensureIsAdmin.middleware";
import ensureTokenIsValidMiddleware from "../middlewares/ensureTokenIsValid.middleware";
import { createCategoriesSchemasId } from "../schemas/categories.schemas";

const categoriesRoutes: Router = Router();

categoriesRoutes.post(
  "",
  ensureTokenIsValidMiddleware,
  ensureIsAdminMiddleware,
  ensureDataIsValidMiddleware(createCategoriesSchemasId),
  createCategoryController
);

categoriesRoutes.get("", listAllCategoryController);

categoriesRoutes.get(
  "/:id/realEstate",
  ensureCategoryExistsMiddleware,
  listCategoryByRealEstateController
);

export default categoriesRoutes;
