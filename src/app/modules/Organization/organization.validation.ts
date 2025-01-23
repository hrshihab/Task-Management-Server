import { z } from "zod";
import { isValidObjectId } from "mongoose";

const createOrganizationValidation = z.object({
  body: z.object({
    name: z.string().min(3).max(50),
    owner: z.string().min(3).max(50),

  }).strict(),
});


export const OrganizationValidation = {
  createOrganizationValidation,
};
