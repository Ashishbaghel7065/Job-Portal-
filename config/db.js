import mongoose from "mongoose";

const ConnectDB = async ()=>{
    try {
        await mongoose.connect(process.env.DATABASE_URI)
        console.log("Server is Connected")

    } catch (error) {
        
        console.log(error)
    }
}

export default ConnectDB;
