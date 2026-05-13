import {Router} from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { clockInOut, getAttendance } from '../controllers/attendanceController.js';

const attendenceRouter = Router();

attendenceRouter.post("/",protect, clockInOut);
attendenceRouter.get("/",protect, getAttendance);

export default attendenceRouter;