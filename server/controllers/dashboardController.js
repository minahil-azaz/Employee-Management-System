import Employee from "../models/Employee.js";
import Payslip from "../models/payslip.js";
import Attendance from "../models/attendance.js";
import User from "../models/User.js";

// ======================
// GET DASHBOARD
// GET /api/dashboard
// ======================

export const getDashboard = async (req, res) => {
    try {
        const session = req.session;

        const user = await User.findById(session.userId);

        if (!user) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }

        // ======================
        // EMPLOYEE DASHBOARD
        // ======================
        if (user.role === "EMPLOYEE") {
            const employee = await Employee.findOne({
                userId: session.userId,
            });

            if (!employee) {
                return res.status(404).json({
                    message: "Employee not found",
                });
            }

            const totalAttendance = await Attendance.countDocuments({
                employeeId: employee._id,
            });

            const presentDays = await Attendance.countDocuments({
                employeeId: employee._id,
                status: "PRESENT",
            });

            const leaveDays = await Attendance.countDocuments({
                employeeId: employee._id,
                status: "ABSENT",
            });

            const latestPayslip = await Payslip.findOne({
                employeeId: employee._id,
            }).sort({ createdAt: -1 });

            return res.json({
                success: true,
                role: "EMPLOYEE",
                data: {
                    employee,
                    stats: {
                        totalAttendance,
                        presentDays,
                        leaveDays,
                    },
                    latestPayslip: latestPayslip || null,
                },
            });
        }

        // ======================
        // ADMIN DASHBOARD
        // ======================

        const totalEmployees = await Employee.countDocuments();
        const totalUsers = await User.countDocuments();

        const totalPayslips = await Payslip.countDocuments();

        const totalAttendance = await Attendance.countDocuments();

        const recentEmployees = await Employee.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .populate("userId", "email role");

        const recentPayslips = await Payslip.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .populate("employeeId", "firstName lastName");

        const attendanceStats = {
            present: await Attendance.countDocuments({ status: "PRESENT" }),
            absent: await Attendance.countDocuments({ status: "ABSENT" }),
        };

        return res.json({
            success: true,
            role: "ADMIN",
            data: {
                stats: {
                    totalEmployees,
                    totalUsers,
                    totalPayslips,
                    totalAttendance,
                },
                attendanceStats,
                recentEmployees,
                recentPayslips,
            },
        });

    } catch (error) {
        console.error("Dashboard error:", error);
        return res.status(500).json({
            message: "Server error while fetching dashboard",
        });
    }
};