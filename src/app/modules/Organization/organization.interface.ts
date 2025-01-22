import { Types } from "mongoose";

export type TOrganization = {
  name: string;
  owner:Types.ObjectId;
  

};

export type TOrganizationMember = {
  email: string;
  status: "pending" | "accepted" | "rejected";
}

export type TInviteMembersToOrganization = {
  members: TOrganizationMember[];
  organization: Types.ObjectId;
}


