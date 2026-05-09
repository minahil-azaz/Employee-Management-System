import mongoose, { mongo } from "mongoose";
import { DEPARTMENTS } from "../constants.js/Departments.js";


const employeeSchema = new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"User", required:true, unique:true},
    firstName:{type:String,required:true},
    LastName:{type:String,required:true},
    email:{type:String,required:true},
    phone:{type:String,required:true},
    position:{type:String,required:true},
    basicSalary:{type:Number,default:0},
    allowances:{type:Number,default:0},
    deductions:{type:Number,default:0},
    employeeStatus:{type:String,enum:["ACTIVE","INACTIVE"],default:"ACTIVE"},
    join_date:{type:Date,required:true},
    isDelete:{type:Boolean,default:false},
    bio:{type:String,default:""},
    department:{type:String,enum:DEPARTMENTS}

},{timestamps:true})

const Employee = mongoose.model.Employee || mongoose.model("Employee",employeeSchema)

export default Employee;

