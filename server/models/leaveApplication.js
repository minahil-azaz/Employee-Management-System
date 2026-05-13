import mongoose from "mongoose";

const leaveApplicationSchema = new mongoose.Schema(
    {
        employeeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Employee",
            required: true,
        },

        type: {
            type: String,
            enum: ["SICK", "VACATION", "PERSONAL", "OTHER"],
            required: true,
        },

        startDate: {
            type: Date,
            required: true,
        },

        endDate: {
            type: Date,
            required: true,
        },

        reason: {
            type: String,
            required: true,
        },

        status: {
            type: String,
            enum: ["PENDING", "APPROVED", "REJECTED"],
            default: "PENDING",
        },

        approverId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Employee",
        },

        approverComments: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

// safer model initialization
const LeaveApplication =
    mongoose.models.LeaveApplication ||
    mongoose.model("LeaveApplication", leaveApplicationSchema);

export default LeaveApplication;