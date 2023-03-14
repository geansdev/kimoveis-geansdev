import { z } from "zod";
import {
  categoriesSchemas,
  createCategoriesSchemasId,
} from "../schemas/categories.schemas";
import { validRealEstateBody } from "../schemas/realEstate.schemas";
import { schedulesBodySchema } from "../schemas/schedules.schemas";
import { UserWithoutPasswordSchema } from "../schemas/users.schemas";

type TWithoutPassword = z.infer<typeof UserWithoutPasswordSchema>;
type TCategoriesBody = z.infer<typeof createCategoriesSchemasId>;
type TReturnCategory = z.infer<typeof categoriesSchemas>;
type TSchedulesBody = z.infer<typeof schedulesBodySchema>;
type TRealEstateBoby = z.infer<typeof validRealEstateBody>;

export {
  TWithoutPassword,
  TCategoriesBody,
  TReturnCategory,
  TSchedulesBody,
  TRealEstateBoby,
};
