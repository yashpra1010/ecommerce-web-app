const { default: mongoose } = require("mongoose")

const dbConnect = ()=>{
    try {
        const conn = mongoose.connect(process.env.MONGODB_URI)
        console.log("Database connnected successfully!");
    } catch (error) {
        console.log("Database connection error!");
        //throw new Error(error)
    }
    
}

module.exports = dbConnect;