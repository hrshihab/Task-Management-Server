import { z } from 'zod';
import { isValidObjectId } from 'mongoose';

const inviteMembersToOrganizationValidation = z.object({
  body: z.object({
    members: z.array(
      z.object({
        userId: z.string().refine((val) => isValidObjectId(val), {
          message: 'Invalid ObjectId',
        }),
        status: z.enum(['pending', 'accepted', 'rejected']),
      }),
    ),
    organization: z.string().refine((val) => isValidObjectId(val), {
      message: 'Invalid ObjectId',
    }),
  }),
});

const updateInvitationStatusValidation = z.object({
  body: z.object({
    status: z.enum(['pending', 'accepted', 'rejected']),
  }),
});

export const InvitationValidation = {
  inviteMembersToOrganizationValidation,
  updateInvitationStatusValidation,
};
