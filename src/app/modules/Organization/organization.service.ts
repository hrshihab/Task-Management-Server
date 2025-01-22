import { TOrganization } from "./organization.interface";
import { Organization } from "./organization.model";

const createOrganizationInDB = async (organizationData: TOrganization) => {
    console.log(organizationData)
    const result = await Organization.create(organizationData);
    return result;
}

const InviteMembersToOrganization = async (organizationData: TOrganization) => {
    console.log(organizationData)
    const result = await Organization.create(organizationData);
    return result;
}

export const OrganizationService = {
    createOrganizationInDB,
    InviteMembersToOrganization,
}