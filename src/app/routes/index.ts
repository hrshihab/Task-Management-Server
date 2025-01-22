import { Router } from 'express';

import { UserRoutes } from '../modules/user/user.route';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { OrganizationRoutes } from '../modules/Organization/organization.route';

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
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
