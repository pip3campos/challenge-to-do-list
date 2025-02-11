import mongoose from "mongoose";
import { MONGO_URI } from "../constants/env";

const connectToDatabase = async () => {
    try {
        mongoose.connect(MONGO_URI);
        console.log("Successfully connected to DB");        
    } catch (error) {
        console.error('Could not connect to database:', error);
        process.exit(1);
    }
}

connectToDatabase();