import {Router} from "express";
import { registerValidator, loginValidator } from "../middlewares/validators/register.validator";
import { UserController } from '../controllers';


const userController = new UserController();
const router = Router();


router.post('/register', registerValidator, userController.registerUser);
router.post('/login', loginValidator, userController.login);


export default router;






