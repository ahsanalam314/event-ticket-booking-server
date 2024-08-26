import { Router } from "express";
import { UserController } from '../controllers';
import { dtoValidator } from "../middlewares/validators/dto-validator.middleware";
import { RegisterDTO, LoginDTO } from "../dto";


const userController = new UserController();
const router = Router();

router.post('/register', dtoValidator(RegisterDTO), userController.registerUser);
router.post('/login', dtoValidator(LoginDTO), userController.login);


export default router;






