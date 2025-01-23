import { Router } from 'express';

import { UserRoutes } from '../modules/user/user.route';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { OrganizationRoutes } from '../modules/Organization/organization.route';
import { InvitationRoutes } from '../modules/Invitation/Invitation.route';
import { TaskRoute } from '../modules/Task/task.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/organization',
    route: OrganizationRoutes,
  },
  {
    path: '/invitation',
    route: InvitationRoutes,
  },
  {
    path: '/task',
    route: TaskRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
