import {Router} from 'express';
import { login } from '../controllers/authComtroller.js';
import { getSession } from '../controllers/authComtroller.js';
import { changePassword } from '../controllers/authComtroller.js';
import { protect } from '../middleware/authMiddleware.js';




const authrouter = Router();

authrouter.post("/login",login);
authrouter.get("/session",protect, getSession);
authrouter.post("/change-password",protect, changePassword);

export default authrouter;