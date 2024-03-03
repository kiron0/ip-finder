import { Router } from 'express';
import { GetIPRoutes } from '../modules/get-ip/get-ip.route';

const router = Router();

const moduleRoutes = [
          {
                    path: '/',
                    route: GetIPRoutes,
          },
];


moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;