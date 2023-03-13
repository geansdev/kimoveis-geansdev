import { z } from "zod";

const schedulesBodySchema = z.object({
  date: z.string(),
  hour: z.string(),
  realEstateId: z.number(),
});

export { schedulesBodySchema };
