import AppError from "../../errors/AppError";
import { TInviteMembersToOrganization, TOrganization } from "./organization.interface";
import { Invitation, Organization } from "./organization.model";
import httpStatus from 'http-status';

const createOrganizationInDB = async (organizationData: TOrganization) => {
    //console.log(organizationData)
    const result = await Organization.create(organizationData);
    return result;
}

const InviteMembersToOrganization = async (organizationData: TInviteMembersToOrganization) => {
    console.log('organizationData');
    
    // Check if an invitation already exists for the organization
    const existingInvitation = await Invitation.findOne({ organization: organizationData.organization });
    console.log('existingInvitation', existingInvitation);
    
    if (existingInvitation) {
        // Iterate over each member in the request
        organizationData.members.forEach(newMember => {
            // Check if the member is already in the existing invitation
            const isMember = existingInvitation.members.some(member => member.email === newMember.email);
            if (!isMember) {
                // Add the new member to the members array
                existingInvitation.members.push({
                    email: newMember.email,
                    status: newMember.status || 'pending'
                });
            }
        });
        await existingInvitation.save();
        return existingInvitation;
    } else {
        // If no existing invitation, return an error or handle accordingly
        throw new AppError(httpStatus.BAD_REQUEST, 'No existing invitation found for the organization');
    }
}

export const OrganizationService = {
    createOrganizationInDB,
    InviteMembersToOrganization,
}