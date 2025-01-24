import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { Request, Response } from 'express';
import sendResponse from '../../utils/sendResponse';
import { InvitationService } from './Invitation.service';

const inviteMembersToOrganization = catchAsync(
  async (req: Request, res: Response) => {
    console.log(req.body);
    const { ...organizationData } = req.body;

    const result =
      await InvitationService.InviteMembersToOrganization(organizationData);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Invitation sent successfully',
      data: result,
    });
  },
);

const getInvitationById = catchAsync(async (req: Request, res: Response) => {
  const { invitationId } = req.params;
  const result = await InvitationService.getInvitationById(invitationId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Invitation fetched successfully',
    data: result,
  });
});

const updateInvitationStatus = catchAsync(
  async (req: Request, res: Response) => {
    const { invitationId } = req.params;
    const { status } = req.body;
    const userId = req.user?.userId;
    console.log(userId, status, invitationId);
    const result = await InvitationService.updateInvitationStatus(
      invitationId,
      userId,
      status,
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Invitation status updated successfully',
      data: result,
    });
  },
);

export const InvitationController = {
  inviteMembersToOrganization,
  getInvitationById,
  updateInvitationStatus,
};
