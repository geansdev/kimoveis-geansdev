import { z } from "zod";
import { createAddressSchemaId } from "./address.schemas";
import { createCategoriesSchemasId } from "./categories.schemas";

const realEstateSchema = z.object({
  id: z.number(),
  sold: z.boolean(),
  value: z.number().or(z.string()),
  size: z.number().int(),
  createdAt: z.string(),
  updateAt: z.string(),
  address: createAddressSchemaId,
  category: createCategoriesSchemasId,
});

const validRealEstateBody = z.object({
  value: z.number().or(z.string()),
  size: z.number().int().min(1, "Number must be greater than 0"),
  address: createAddressSchemaId,
  categoryId: z.number(),
});

const createRealEstateSchemaId = realEstateSchema.omit({
  id: true,
});

export { createRealEstateSchemaId, realEstateSchema, validRealEstateBody };
