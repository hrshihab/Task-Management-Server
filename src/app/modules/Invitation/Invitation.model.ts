import { Schema, model } from 'mongoose';
import { TInviteMembersToOrganization } from './Invitation.interface';

const inviteMembersToOrganizationSchema =
  new Schema<TInviteMembersToOrganization>({
    organization: {
      type: Schema.Types.ObjectId,
      ref: 'Organization',
      required: true,
      unique: true,
    },
    members: [
      {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        status: {
          type: String,
          enum: ['pending', 'accepted', 'rejected'],
          default: 'pending',
        },
      },
    ],
  });

export const Invitation = model<TInviteMembersToOrganization>(
  'Invitation',
  inviteMembersToOrganizationSchema,
);
