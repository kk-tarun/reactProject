// will contain the required code for connecting to the database
const mongoose = require('mongoose')

const db = process.env.MONGO_URI;

const connectDB = async ()=>{
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("MongoDb is connected");
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}

module.exports = connectDB;