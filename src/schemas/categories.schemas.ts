import { z } from "zod";

const categoriesSchemas = z.object({
  id: z.number(),
  name: z.string(),
});

const createCategoriesSchemasId = categoriesSchemas.omit({
  id: true,
});

export { categoriesSchemas, createCategoriesSchemasId };
