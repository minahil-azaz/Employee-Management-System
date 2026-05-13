import {Router} from 'express';
import { createLeaveApplication, getLeaveApplications, updateLeaveStatus } from '../controllers/leaveApplication.js';
import { protect } from '../middleware/authMiddleware.js';

const leaveRouter = Router();

leaveRouter.post("/",protect, createLeaveApplication);
leaveRouter.get("/",protect, getLeaveApplications);
leaveRouter.put("/:id",protect, updateLeaveStatus);

export default leaveRouter;