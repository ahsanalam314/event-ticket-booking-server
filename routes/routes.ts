import {Router} from "express";
import userRouters from './user.routes';
const router = Router();

router.use('/user', userRouters);

export default router;






