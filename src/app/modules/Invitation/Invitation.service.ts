import AppError from "../../errors/AppError";
import { TInviteMembersToOrganization } from "./Invitation.interface";
import { Invitation } from "./Invitation.model";
import httpStatus from 'http-status';



const InviteMembersToOrganization = async (organizationData: TInviteMembersToOrganization) => {
    //console.log('organizationData');
    
    // Check if an invitation already exists for the organization
    const existingInvitation = await Invitation.findOne({ organization: organizationData.organization });
    console.log('existingInvitation', existingInvitation);
    
    if (existingInvitation) {
        // Iterate over each member in the request
        organizationData.members.forEach(newMember => {
            // Check if the member is already in the existing invitation
            const isMember = existingInvitation.members.some(member => member.userId === newMember.userId);
            if (!isMember) {
                // Add the new member to the members array
                existingInvitation.members.push({
                    userId: newMember.userId,
                    status: newMember.status || 'pending'
                });
            }
        });
        await existingInvitation.save();
        return existingInvitation;
    } else {
        // If no existing invitation, return an error or handle accordingly
        const newInvitation = await Invitation.create(organizationData);
        return newInvitation;

    }
}

const getInvitationById = async (invitationId: string) => {
    const result = await Invitation.findOne({ _id: invitationId });
    return result;
}

const updateInvitationStatus = async (invitationId: string, userId: string, status: string) => {
    const result = await Invitation.findOneAndUpdate({ _id: invitationId, 'members.userId': userId }, { $set: { 'members.$.status': status } });
    return {status: status};
}

export const InvitationService = {
    InviteMembersToOrganization,
    getInvitationById,
    updateInvitationStatus,
}