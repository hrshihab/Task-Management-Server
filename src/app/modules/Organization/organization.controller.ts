import httpStatus from "http-status";
import { OrganizationService } from "./organization.service";
import catchAsync from "../../utils/catchAsync";
import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";

const createOrganization = catchAsync(async (req: Request, res: Response) => {
    //console.log('controller',req.body)
    const { ...organizationData } = req.body;
    const result = await OrganizationService.createOrganizationInDB(organizationData);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Organization created successfully',
        data: result,
    });
});

const inviteMembersToOrganization = catchAsync(async (req: Request, res: Response) => {
    console.log(req.body)
    const { ...organizationData } = req.body;
   
    const result = await OrganizationService.InviteMembersToOrganization(organizationData);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Members invited successfully',
        data: result,
    });
});

export const OrganizationController = {
    createOrganization,
    inviteMembersToOrganization,
}