import { Types } from "mongoose";



export type TOrganizationMember = {
  userId: Types.ObjectId;
  status: "pending" | "accepted" | "rejected";
}

export type TInviteMembersToOrganization = {
  members: TOrganizationMember[];
  organization: Types.ObjectId;
}

export type TUpdateInvitationStatus = {
  status: "pending" | "accepted" | "rejected";
}


