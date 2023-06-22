const { default: mongoose } = require("mongoose")

const dbConnect = ()=>{
    try {
        const conn = mongoose.connect(process.env.DBName)
        console.log("Database connnected successfully!");
    } catch (error) {
        console.log("Database connection error!");
        //throw new Error(error)
    }
    
}