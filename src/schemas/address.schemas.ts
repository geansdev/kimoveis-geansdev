import { z } from "zod";

const addressSchemas = z.object({
  id: z.number(),
  street: z.string().max(45),
  zipCode: z.string().max(8),
  number: z.string().min(1, "Number must be greater than 0").max(7).optional(),
  city: z.string().max(20),
  state: z.string().min(2).max(2),
});

const createAddressSchemaId = addressSchemas.omit({
  id: true,
});

export { addressSchemas, createAddressSchemaId };
