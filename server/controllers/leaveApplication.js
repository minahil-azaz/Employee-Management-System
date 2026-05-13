import LeaveApplication from "../models/leaveApplication.js";
import Employee from "../models/Employee.js";
import User from "../models/User.js";
import sendEmail from "../config/nodemailer.js";



// ======================
// CREATE LEAVE (EMPLOYEE)
// ======================

export const createLeaveApplication = async (req, res) => {
    try {
        const user = req.user;

        const employee = await Employee.findOne({
            userId: user.userId,
        });

        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        if (employee.isDelete) {
            return res.status(403).json({
                message: "Access denied - Employee is deleted",
            });
        }

        const { startDate, endDate, reason } = req.body;

        if (!startDate || !endDate || !reason) {
            return res.status(400).json({
                message: "Start date, end date and reason are required",
            });
        }

        const leave = await LeaveApplication.create({
            employeeId: employee._id,
            startDate,
            endDate,
            reason,
            status: "PENDING",
        });

        // ======================
        // EMAIL TO EMPLOYEE
        // ======================
        const userData = await User.findById(user.userId);

        await sendEmail(
            userData.email,
            "Leave Application Submitted",
            `
                <h2>Leave Submitted</h2>
                <p>Your leave request has been submitted successfully.</p>
                <p>Status: PENDING</p>
            `
        );

        return res.json({
            success: true,
            message: "Leave application submitted",
            leave,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};


// ======================
// GET LEAVES
// ======================

export const getLeaveApplications = async (req, res) => {
    try {
        const userRequest = req.user;

        const user = await User.findById(userRequest.userId);

        const employee = await Employee.findOne({ userId: user._id });

        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        let query = {};

        if (user.role === "EMPLOYEE") {
            query.employeeId = employee._id;
        }

        const leaves = await LeaveApplication.find(query)
            .populate("employeeId", "firstName lastName")
            .populate("approverId", "firstName lastName")
            .sort({ createdAt: -1 });

        return res.json({
            success: true,
            data: leaves,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};


// ======================
// ADMIN: UPDATE LEAVE STATUS
// ======================

export const updateLeaveStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, approverComments } = req.body;

        const user = req.user;

        const admin = await User.findById(user.userId);

        if (!admin || admin.role !== "ADMIN") {
            return res.status(403).json({
                message: "Access denied - Admin only",
            });
        }

        if (!["APPROVED", "REJECTED"].includes(status)) {
            return res.status(400).json({
                message: "Invalid status",
            });
        }

        const approver = await Employee.findOne({
            userId: user.userId,
        });

        const leave = await LeaveApplication.findById(id);

        if (!leave) {
            return res.status(404).json({
                message: "Leave not found",
            });
        }

        leave.status = status;
        leave.approverId = approver?._id;
        leave.approverComments = approverComments || "";

        await leave.save();

        // ======================
        // EMAIL TO EMPLOYEE
        // ======================
        const employee = await Employee.findById(leave.employeeId);
        const userData = await User.findById(employee.userId);

        await sendEmail(
            userData.email,
            "Leave Status Updated",
            `
                <h2>Leave Update</h2>
                <p>Your leave request has been <b>${status}</b>.</p>
                ${
                    approverComments
                        ? `<p>Comments: ${approverComments}</p>`
                        : ""
                }
            `
        );

        return res.json({
            success: true,
            message: `Leave ${status.toLowerCase()} successfully`,
            leave,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server error failed to update leave status",
        });
    }
};