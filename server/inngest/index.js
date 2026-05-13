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
  isDev: process.env.INNGEST_DEV === "1",
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
      return { success: false, message: "Attendance not found" };
    }

    if (attendance.checkOut) {
      return { success: true, message: "Already checked out" };
    }

    const now = new Date();
    const checkInTime = new Date(attendance.checkIn).getTime();

    const workingHours = Number(
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

    return { success: true };
  }
);

// ==============================
// LEAVE REMINDER FUNCTION
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

    if (!leave) {
      return { success: false, message: "Leave not found" };
    }

    if (leave.status !== "PENDING") {
      return { success: true, message: "Already processed" };
    }

    const email = leave?.employeeId?.userId?.email;

    if (email) {
      await sendEmail(
        email,
        "Leave Reminder",
        `
          <h2>Leave Pending</h2>
          <p>Your leave is still pending approval.</p>
        `
      );
    }

    return { success: true };
  }
);

// ==============================
// 🇵🇰 ABSENT CRON (FIXED)
// ==============================
const absentReminderCron = inngest.createFunction(
  {
    id: "absent-reminder-cron",
    triggers: [
      {
        cron: "0 5 * * *", // 10 AM PKT (UTC 5:00)
      },
    ],
  },
  async () => {
    // FIX: use Pakistan date properly (UTC-safe)
    const now = new Date();

    const pakistanNow = new Date(
      now.toLocaleString("en-US", { timeZone: "Asia/Karachi" })
    );

    pakistanNow.setHours(0, 0, 0, 0);

    const employees = await Employee.find({
      isDelete: false,
    }).populate("userId", "email");

    let absentCount = 0;

    for (const emp of employees) {
      const attendance = await Attendance.findOne({
        employeeId: emp._id,
        date: pakistanNow,
      });

      if (!attendance && emp?.userId?.email) {
        absentCount++;

        await sendEmail(
          emp.userId.email,
          "Absent Reminder",
          `
            <h2>Absence Alert</h2>
            <p>You have not marked attendance today.</p>
          `
        );
      }
    }

    return {
      success: true,
      totalAbsentEmployees: absentCount,
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
