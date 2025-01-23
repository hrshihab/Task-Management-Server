import AppError from "../../errors/AppError";
import { TOrganization } from "./organization.interface";
import { Organization } from "./organization.model";
import httpStatus from 'http-status';

const createOrganizationInDB = async (organizationData: TOrganization) => {
    //console.log(organizationData)
    const result = await Organization.create(organizationData);
    return result;
}


export const OrganizationService = {
    createOrganizationInDB,
 
}