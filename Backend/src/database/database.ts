import mongoose from "mongoose";
import config from "../config/config";

(async () => {    
    await mongoose.connect(config.DATABASE)
})()