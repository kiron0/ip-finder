import express from 'express';
import { GetIPControllers } from './get-ip.controller';

const router = express.Router();

router.get(
          '/',
          GetIPControllers.getIP,
);

export const GetIPRoutes = router;