import {Router} from 'express';
import { getProfile } from '../controllers/profileController.js';
import { updateProfile } from '../controllers/profileController.js';
import { protect } from '../middleware/authMiddleware.js';


const profilerouter = Router();

profilerouter.get("/",protect, getProfile);
profilerouter.put("/", protect, updateProfile);



export default profilerouter;