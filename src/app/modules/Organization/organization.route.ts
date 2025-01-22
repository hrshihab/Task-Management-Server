import { Router } from 'express';
import { OrganizationController } from './organization.controller';
import { OrganizationValidation } from './organization.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { TUserRole } from '../user/user.interface';

const router = Router();

router.post('/create-organization',
    auth(USER_ROLE.Admin as TUserRole),
    validateRequest(OrganizationValidation.createOrganizationValidation),
    OrganizationController.createOrganization
)

router.post('/invite-members-to-organization',
    auth(USER_ROLE.Admin as TUserRole),
    validateRequest(OrganizationValidation.inviteMembersToOrganizationValidation),
    OrganizationController.inviteMembersToOrganization
)

export const OrganizationRoutes = router;