import {Router} from 'express';

import { getEmployees } from '../controllers/EmployeeController.js';
import { createEmployee } from '../controllers/EmployeeController.js';
import { updateEmployee } from '../controllers/EmployeeController.js';
import { deleteEmployee } from '../controllers/EmployeeController.js';
import { protect,protectAdmin } from '../middleware/authMiddleware.js';



const router = Router();

router.get("/",protect,protectAdmin, getEmployees)
router.post("/", protect,protectAdmin, createEmployee) 
router.put("/:id",protect,protectAdmin, updateEmployee)
router.delete("/:id",protect,protectAdmin, deleteEmployee)

export default router;