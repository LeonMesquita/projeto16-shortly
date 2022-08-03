import {Router} from   'express';
const router = Router();
import { registerUser, loginUser } from '../controllers/authController.js';
import {validateSignup, validateSignin} from '../middlewares/validateAuth.js';

router.post('/signup', validateSignup, registerUser);
router.post('/signin',validateSignin, loginUser);
export default router;