import Payslip from "../models/payslip.js";
import Employee from "../models/Employee.js";
import User from "../models/User.js";


// ======================
// CREATE PAYSLIP (ADMIN ONLY)
// POST /api/payslip
// ======================

export const createPayslip = async (req, res) => {
    try {
        const session = req.session;

        const admin = await User.findById(session.userId);

        if (!admin || admin.role !== "ADMIN") {
            return res.status(403).json({
                message: "Access denied - Admin only",
            });
        }

        const {
            employeeId,
            month,
            year,
            basicSalary,
            allowances = 0,
            deductions = 0,
        } = req.body;

        if (!employeeId || !month || !year || !basicSalary) {
            return res.status(400).json({
                message: "Employee, month, year and basic salary are required",
            });
        }

        const employee = await Employee.findById(employeeId);

        if (!employee) {
            return res.status(404).json({
                message: "Employee not found",
            });
        }

        const netSalary =
            Number(basicSalary) +
            Number(allowances) -
            Number(deductions);

        const payslip = await Payslip.create({
            employeeId,
            month,
            year,
            basicSalary,
            allowances,
            deductions,
            netSalary,
        });

        return res.status(201).json({
            success: true,
            message: "Payslip created successfully",
            payslip,
        });

    } catch (error) {
        console.error("Create payslip error:", error);
        return res.status(500).json({
            message: "Server error while creating payslip",
        });
    }
};


// ======================
// GET ALL PAYSLIPS
// GET /api/payslip
// ======================

export const getPayslips = async (req, res) => {
    try {
        const session = req.session;

        const user = await User.findById(session.userId);

        if (!user) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }

        let query = {};

        // Employee sees only their payslips
        if (user.role === "EMPLOYEE") {
            const employee = await Employee.findOne({
                userId: session.userId,
            });

            query.employeeId = employee._id;
        }

        const payslips = await Payslip.find(query)
            .populate("employeeId", "firstName lastName email position")
            .sort({ createdAt: -1 });

        return res.json({
            success: true,
            data: payslips,
        });

    } catch (error) {
        console.error("Get payslips error:", error);
        return res.status(500).json({
            message: "Server error while fetching payslips",
        });
    }
};


// ======================
// GET PAYSLIP BY ID
// GET /api/payslip/:id
// ======================

export const getPayslipById = async (req, res) => {
    try {
        const session = req.session;
        const { id } = req.params;

        const user = await User.findById(session.userId);

        if (!user) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }

        const payslip = await Payslip.findById(id)
            .populate("employeeId", "firstName lastName email position");

        if (!payslip) {
            return res.status(404).json({
                message: "Payslip not found",
            });
        }

        // Employee can only access their own payslip
        if (
            user.role === "EMPLOYEE" &&
            payslip.employeeId.userId?.toString() !== session.userId
        ) {
            return res.status(403).json({
                message: "Access denied",
            });
        }

        return res.json({
            success: true,
            payslip,
        });

    } catch (error) {
        console.error("Get payslip error:", error);
        return res.status(500).json({
            message: "Server error while fetching payslip",
        });
    }
};