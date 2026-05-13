import Attendance from "../models/attendance.js";
import Employee from "../models/Employee.js";

// ======================
// CLOCK IN / CLOCK OUT
// POST /attendance
// ======================

export const clockInOut = async (req, res) => {
    try {
        const user = req.user;

        const { type } = req.body; // "IN" or "OUT"
        const now = new Date();

        const employee = await Employee.findOne({
            userId: user.userId,
        });

        if (!employee) {
            return res.status(404).json({
                message: "Employee not found",
            });
        }

        if (employee.isDelete) {
            return res.status(403).json({
                message: "Access denied - Employee is deleted",
            });
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const existing = await Attendance.findOne({
            employeeId: employee._id,
            date: today,
        });

        // ======================
        // CLOCK IN
        // ======================
        if (!existing && type === "IN") {
            const isLate =
                now.getHours() > 9 ||
                (now.getHours() === 9 && now.getMinutes() > 0);

            const attendance = await Attendance.create({
                employeeId: employee._id,
                date: today,
                checkIn: now,
                status: isLate ? "LATE" : "PRESENT",
            });

            return res.json({
                success: true,
                message: "Clock-in successful",
                attendance,
            });
        }

        // ======================
        // CLOCK OUT
        // ======================
        if (existing && type === "OUT" && !existing.checkOut) {
            const checkInTime = new Date(existing.checkIn).getTime();
            const diffTime = now.getTime() - checkInTime;

            const diffHours = diffTime / (1000 * 60 * 60);

            existing.checkOut = now;

            const workingHours = parseFloat(diffHours.toFixed(2));

            let dayType = "Short Day";

            if (workingHours >= 8) {
                dayType = "Full Day";
            } else if (workingHours >= 4) {
                dayType = "Half Day";
            }

            existing.workingHours = workingHours;
            existing.daytype = "WEEKDAY"; // Matches model enum
            existing.status = "PRESENT";

            await existing.save();

            return res.json({
                success: true,
                message: "Clock-out successful",
                attendance: existing,
            });
        }

        return res.status(400).json({
            message: "Invalid clock-in/out request",
        });

    } catch (error) {
        console.error("Clock-in/out error:", error);
        return res.status(500).json({
            message: "Server error during clock-in/out",
        });
    }
};

// ======================
// GET ATTENDANCE
// GET /api/attendance
// ======================

export const getAttendance = async (req, res) => {
    try {
        const user = req.user;

        const employee = await Employee.findOne({
            userId: user.userId,
        });

        if (!employee) {
            return res.status(404).json({
                message: "Employee not found",
            });
        }

        const limit = parseInt(req.query.limit) || 30;
        const page = parseInt(req.query.page) || 1;
        const skip = (page - 1) * limit;

        const attendance = await Attendance.find({
            employeeId: employee._id,
        })
            .sort({ date: -1 })
            .skip(skip)
            .limit(limit)
            .lean();

        const total = await Attendance.countDocuments({
            employeeId: employee._id,
        });

        return res.json({
            success: true,
            total,
            page,
            limit,
            data: attendance,
        });

    } catch (error) {
        console.error("Get attendance error:", error);
        return res.status(500).json({
            message: "Server error while fetching attendance",
        });
    }
};