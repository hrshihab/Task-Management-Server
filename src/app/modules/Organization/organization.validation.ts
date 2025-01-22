import { z } from "zod";
import { isValidObjectId } from "mongoose";

const createOrganizationValidation = z.object({
  body: z.object({
    name: z.string().min(3).max(50),
    owner: z.string().min(3).max(50),

  }).strict(),
});

const inviteMembersToOrganizationValidation = z.object({
  body: z.object({
    members: z.array(z.object({
      email: z.string().email(),
      status: z.enum(["pending", "accepted", "rejected"]),
    })),
    organization: z.string().refine((val) => isValidObjectId(val), {
      message: "Invalid ObjectId",
    }),
  }),
});

export const OrganizationValidation = {
  createOrganizationValidation,
  inviteMembersToOrganizationValidation,
};
