import {Router} from 'express';

import { getEmployees } from '../controllers/employeeController.js';
import { createEmployee } from '../controllers/employeeController.js';
import { updateEmployee } from '../controllers/employeeController.js';
import { deleteEmployee } from '../controllers/employeeController.js';
import { protect,protectAdmin } from '../middleware/authMiddleware.js';



const router = Router();

router.get("/",protect,protectAdmin, getEmployees)
router.post("/", protect,protectAdmin, createEmployee) 
router.put("/:id",protect,protectAdmin, updateEmployee)
router.delete("/:id",protect,protectAdmin, deleteEmployee)

export default router;