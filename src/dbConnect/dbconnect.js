const mongoose = require('mongoose');

const mongooseConnection = async()=>{
    try {
        const connection = await mongoose.connect("mongodb://localhost:27017/Learner", {
            useNewUrlParser:true,
            useUnifiedTopology: true,
        });
        console.log("Connected to database...");
    } catch (error) {
        console.log(error);
    }
}

mongooseConnection();