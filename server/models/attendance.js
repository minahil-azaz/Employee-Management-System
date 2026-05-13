import mongoose, { mongo } from "mongoose";

const attendanceSchema = new mongoose.Schema({
    employeeId:{type:mongoose.Schema.Types.ObjectId,ref:"Employee", required:true},
    date:{type:Date,required:true},
    checkIn:{type:Date},
    checkOut:{type:Date},
    status:{type:String,enum:["PRESENT","ABSENT","LEAVE"],required:true},
    workingHours:{type:Number,default:0},
    daytype:{type:String,enum:["WEEKDAY","WEEKEND","HOLIDAY"],default:"WEEKDAY"}


},{timestamps:true})

attendanceSchema.index({ employeeId: 1, date: 1 }, { unique: true });

const Attendance = mongoose.models.Attendance || mongoose.model("Attendance",attendanceSchema)

export default Attendance;
