import { Schema, model } from "mongoose";
import { TInviteMembersToOrganization, TOrganization } from "./organization.interface";

const organizationSchema = new Schema<TOrganization>({
  name: { type: String,unique: true,trim: true,required: true },
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

export const Organization = model<TOrganization>('Organization', organizationSchema);


const inviteMembersToOrganizationSchema = new Schema<TInviteMembersToOrganization>({
  organization: { type: Schema.Types.ObjectId, ref: 'Organization', required: true,unique:true },
  members: [{
    email: { type: String, required: true },
    status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' }
  }],
  
});

export const Invitation = model<TInviteMembersToOrganization>('Invitation', inviteMembersToOrganizationSchema);


