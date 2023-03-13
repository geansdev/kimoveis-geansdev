import { z } from "zod";
import { createLoginSchemas } from "../schemas/login.schemas";

type TLoginBody = z.infer<typeof createLoginSchemas>;

export { TLoginBody };
