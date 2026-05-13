import { Inngest } from "inngest";

import Attendance from "../models/attendance.js";
import LeaveApplication from "../models/leaveApplication.js";
import Employee from "../models/Employee.js";
import sendEmail from "../config/nodemailer.js";

// ==============================
// INNGEST CLIENT
// ==============================

export const inngest = new Inngest({
    id: "employee-management-system",
});

// ==============================
// AUTO CHECKOUT FUNCTION
// ==============================

const autoCheckoutFunction = inngest.createFunction(
    {
        id: "auto-checkout",
        triggers: [{ event: "employee/checkin" }],
    },

    async ({ event, step }) => {
        const { attendanceId } = event.data;

        await step.sleep("wait-9-hours", "9h");

        const attendance = await Attendance.findById(attendanceId);

        if (!attendance) {
            throw new Error("Attendance record not found");
        }

        if (attendance.checkOut) {
            return { success: false, message: "Already checked out" };
        }

        const now = new Date();
        const checkInTime = new Date(attendance.checkIn).getTime();

        const workingHours = parseFloat(
            ((now - checkInTime) / (1000 * 60 * 60)).toFixed(2)
        );

        let dayType = "SHORT_DAY";
        if (workingHours >= 8) dayType = "FULL_DAY";
        else if (workingHours >= 4) dayType = "HALF_DAY";

        attendance.checkOut = now;
        attendance.workingHours = workingHours;
        attendance.dayType = dayType;
        attendance.status = "PRESENT";
        attendance.autoCheckedOut = true;

        await attendance.save();

        return {
            success: true,
            message: "Auto checkout completed",
        };
    }
);

// ==============================
// LEAVE REMINDER FUNCTION (EMAIL ADDED)
// ==============================

const leaveReminderFunction = inngest.createFunction(
    {
        id: "leave-reminder",
        triggers: [{ event: "leave/application.created" }],
    },

    async ({ event, step }) => {
        const { leaveId } = event.data;

        await step.sleep("wait-24-hours", "24h");

        const leave = await LeaveApplication.findById(leaveId).populate({
            path: "employeeId",
            populate: { path: "userId", select: "email" },
        });

        if (!leave) throw new Error("Leave not found");

        if (leave.status !== "PENDING") {
            return { success: false, message: "Already processed" };
        }

        const email = leave.employeeId.userId.email;

        await sendEmail(
            email,
            "Leave Reminder",
            `
                <h2>Leave Application Pending</h2>
                <p>Your leave request is still pending approval.</p>
                <p>Please contact HR if needed.</p>
            `
        );

        return {
            success: true,
            message: "Leave reminder email sent",
        };
    }
);

// ==============================
// ABSENT REMINDER CRON (EMAIL ADDED)
// ==============================

const absentReminderCron = inngest.createFunction(
    {
        id: "absent-reminder-cron",
        triggers: [{ cron: "0 10 * * *" }],
    },

    async () => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const employees = await Employee.find({
            isDelete: false,
        }).populate("userId", "email");

        const absentEmployees = [];

        for (const emp of employees) {
            const attendance = await Attendance.findOne({
                employeeId: emp._id,
                date: today,
            });

            if (!attendance) {
                absentEmployees.push(emp);

                await sendEmail(
                    emp.userId.email,
                    "Absent Reminder",
                    `
                        <h2>Absence Alert</h2>
                        <p>You have not marked attendance today.</p>
                        <p>Please ensure timely check-in tomorrow.</p>
                    `
                );
            }
        }

        return {
            success: true,
            totalAbsentEmployees: absentEmployees.length,
        };
    }
);

// ==============================
// EXPORT
// ==============================

export const functions = [
    autoCheckoutFunction,
    leaveReminderFunction,
    absentReminderCron,
];