import express from 'express';
import {signUpUserHandler, loginUserHandler} from '../controller/user.controller';
import { authenticateToken } from '../services/auth.services';
const router = express.Router();

router.post('/signup',  signUpUserHandler);
router.get('/login', authenticateToken, loginUserHandler);
export default router;