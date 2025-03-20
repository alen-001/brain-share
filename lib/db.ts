import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) throw new Error("MONGODB_URI is missing in .env");

export const connectDB = async () => {
    try{
        if (mongoose.connection.readyState >= 1) {
            return;
          }
       await mongoose.connect(MONGODB_URI);
        const connection=mongoose.connection;
        connection.on('connected',()=>{
            console.log("Connected to the database");
        });
        connection.on('error',(err)=>{
            console.log("Error connecting to the database",err);
        });
    }catch(err){
        console.log("Could not connect to the database. Exiting now...", err);
        process.exit(1);
    }
};
