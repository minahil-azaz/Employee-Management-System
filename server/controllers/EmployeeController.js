import Employee from "../models/Employee.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";

// ======================
// GET EMPLOYEES
// GET /api/employees
// ======================

export const getEmployees = async (req, res) => {
    try {
        const { department } = req.query;

        const where = {
            isDelete: false,
        };

        if (department) {
            where.department = department;
        }

        const employees = await Employee.find(where)
            .sort({ createdAt: -1 })
            .populate("userId", "email role")
            .lean();

        const result = employees.map((emp) => ({
            ...emp,
            id: emp._id.toString(),
            user: emp.userId
                ? {
                      email: emp.userId.email,
                      role: emp.userId.role,
                  }
                : null,
        }));

        return res.json(result);

    } catch (error) {
        console.error("Error fetching employees:", error);

        return res.status(500).json({
            message: "Internal server error",
        });
    }
};

// ======================
// CREATE EMPLOYEE
// POST /api/employees
// ======================

export const createEmployee = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            phone,
            position,
            basicSalary,
            allowances,
            deductions,
            join_date,
            bio,
            department,
            password,
            role,
        } = req.body;

        // Validation
        if (
            !firstName ||
            !lastName ||
            !email ||
            !phone ||
            !position ||
            !join_date ||
            !department ||
            !password
        ) {
            return res.status(400).json({
                message: "Missing required fields",
            });
        }

        // Check existing user
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "Employee with this email already exists",
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await User.create({
            email,
            password: hashedPassword,
            role: role || "EMPLOYEE",
        });

        // Create employee
        const employee = await Employee.create({
            userId: user._id,
            firstName,
            lastName,
            email,
            phone,
            position,
            department: department || "Engineering",
            basicSalary: Number(basicSalary) || 0,
            allowances: Number(allowances) || 0,
            deductions: Number(deductions) || 0,
            join_date,
            bio: bio || "",
            employeeStatus: "ACTIVE",
            isDelete: false,
        });

        return res.status(201).json({
            success: true,
            message: "Employee created successfully",
            employee: {
                ...employee.toObject(),
                user: {
                    email: user.email,
                    role: user.role,
                },
            },
        });

    } catch (error) {
        console.error("Error creating employee:", error);

        return res.status(500).json({
            message: "Internal server error",
        });
    }
};

// ======================
// UPDATE EMPLOYEE
// PUT /api/employees/:id
// ======================

export const updateEmployee = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            firstName,
            lastName,
            email,
            phone,
            position,
            basicSalary,
            allowances,
            deductions,
            join_date,
            bio,
            department,
            password,
            role,
            employeeStatus,
        } = req.body;

        // Find employee
        const employee = await Employee.findById(id);

        if (!employee) {
            return res.status(404).json({
                message: "Employee not found",
            });
        }

        // Update employee
        const updatedEmployee = await Employee.findByIdAndUpdate(
            id,
            {
                firstName,
                lastName,
                email,
                phone,
                position,
                department,
                basicSalary: Number(basicSalary) || 0,
                allowances: Number(allowances) || 0,
                deductions: Number(deductions) || 0,
                join_date,
                bio: bio || "",
                employeeStatus: employeeStatus || "ACTIVE",
            },
            { new: true }
        );

        // Update user
        const userUpdates = {};

        if (email) userUpdates.email = email;
        if (role) userUpdates.role = role;

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            userUpdates.password = hashedPassword;
        }

        await User.findByIdAndUpdate(employee.userId, userUpdates);

        return res.json({
            success: true,
            message: "Employee updated successfully",
            employee: updatedEmployee,
        });

    } catch (error) {
        console.error("Error updating employee:", error);

        if (error.code === 11000) {
            return res.status(400).json({
                message: "Employee with this email already exists",
            });
        }

        return res.status(500).json({
            message: "Internal server error",
        });
    }
};

// ======================
// DELETE EMPLOYEE
// DELETE /api/employees/:id
// ======================

export const deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params;

        const employee = await Employee.findById(id);

        if (!employee) {
            return res.status(404).json({
                message: "Employee not found",
            });
        }

        // Soft delete
        employee.isDelete = true;
        employee.employeeStatus = "INACTIVE";

        await employee.save();

        return res.json({
            success: true,
            message: "Employee deleted successfully",
            employee,
        });

    } catch (error) {
        console.error("Error deleting employee:", error);

        return res.status(500).json({
            message: "Internal server error",
        });
    }
};