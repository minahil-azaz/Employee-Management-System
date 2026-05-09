import mongoose from "mongoose";


const connectDB = async () =>{
    try{
        mongoose.connection.on('connected', ()=> console.log("connected to db"))
        await mongoose.connect(process.env.MONGODB_URI)
    }catch (error){
        console.error("database connection fail",error.message)

    }
}
export default connectDB