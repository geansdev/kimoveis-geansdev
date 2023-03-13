import { z } from "zod";

const userSchema = z.object({
  id: z.number(),
  name: z.string().min(3).max(45),
  email: z.string().email(),
  password: z.string(),
  admin: z.boolean().optional().default(false),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  deletedAt: z.string().nullable().optional(),
});

const creatUserSchemaId = userSchema.omit({
  id: true,
});

const createNewUserSchema = z.object({
  name: z.string().max(45),
  email: z.string().email().max(45),
  password: z.string().max(120),
});

const createUserWithAdmin = createNewUserSchema.extend({
  admin: z.boolean().optional(),
});
const updateUserSchema = createNewUserSchema.partial();

const UserWithoutPasswordSchema = userSchema.omit({ password: true });

export {
  userSchema,
  creatUserSchemaId,
  createUserWithAdmin,
  updateUserSchema,
  UserWithoutPasswordSchema,
};
