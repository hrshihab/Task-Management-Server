import { Router } from 'express';
import { InvitationValidation } from './Invitation.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { TUserRole } from '../user/user.interface';
import { InvitationController } from './Invitation.controller';
const router = Router();



router.post('/invite-members',
   auth(USER_ROLE.Admin as TUserRole),
    validateRequest(InvitationValidation.inviteMembersToOrganizationValidation),
    InvitationController.inviteMembersToOrganization
)

router.get('/:invitationId',
    auth(USER_ROLE.Admin as TUserRole,USER_ROLE.Owner as TUserRole),
    InvitationController.getInvitationById
)

router.patch('/:invitationId/update-status',
    auth(USER_ROLE.Member as TUserRole),
    validateRequest(InvitationValidation.updateInvitationStatusValidation),
    InvitationController.updateInvitationStatus 
)

export const InvitationRoutes = router;