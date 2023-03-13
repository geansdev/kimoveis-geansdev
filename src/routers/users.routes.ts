import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  listUsersController,
  updateUserController,
} from "../controllers/users.controllers";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import ensureEmailExistsMiddleware from "../middlewares/ensureEmailExists.middleware";
import ensureIsAdminMiddleware from "../middlewares/ensureIsAdmin.middleware";
import ensureIsUserCommonMiddleware from "../middlewares/ensureIsUserCommon.middleware";
import ensureTokenIsValidMiddleware from "../middlewares/ensureTokenIsValid.middleware";
import ensureUserExistsMiddleware from "../middlewares/ensureUserExists.middleware";
import {
  createUserWithAdmin,
  updateUserSchema,
} from "../schemas/users.schemas";

const usersRoutes: Router = Router();

usersRoutes.post(
  "",
  ensureDataIsValidMiddleware(createUserWithAdmin),
  ensureEmailExistsMiddleware,
  createUserController
);

usersRoutes.get(
  "",
  ensureTokenIsValidMiddleware,
  ensureIsAdminMiddleware,
  listUsersController
);

usersRoutes.patch(
  "/:id",
  ensureDataIsValidMiddleware(updateUserSchema),
  ensureUserExistsMiddleware,
  ensureTokenIsValidMiddleware,
  ensureIsUserCommonMiddleware,
  updateUserController
);

usersRoutes.delete(
  "/:id",
  ensureUserExistsMiddleware,
  ensureTokenIsValidMiddleware,
  ensureIsAdminMiddleware,
  deleteUserController
);

export default usersRoutes;
