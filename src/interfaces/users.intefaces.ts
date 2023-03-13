import { z } from "zod";
import {
  categoriesSchemas,
  createCategoriesSchemasId,
} from "../schemas/categories.schemas";
import { schedulesBodySchema } from "../schemas/schedules.schemas";
import { UserWithoutPasswordSchema } from "../schemas/users.schemas";

type TWithoutPassword = z.infer<typeof UserWithoutPasswordSchema>;
type TCategoriesBody = z.infer<typeof createCategoriesSchemasId>;
type TReturnCategory = z.infer<typeof categoriesSchemas>;
type TSchedulesBody = z.infer<typeof schedulesBodySchema>;

export { TWithoutPassword, TCategoriesBody, TReturnCategory, TSchedulesBody };
