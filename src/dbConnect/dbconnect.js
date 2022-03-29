const mongoose = require('mongoose');

const mongooseConnection = async()=>{
    try {
        const atlasUrl = 'mongodb+srv://ayushjha:ayushjha@cluster0.kclt5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
        const connection = await mongoose.connect(atlasUrl, {
            useNewUrlParser:true,
            useUnifiedTopology: true,
            useUnifiedTopology:true,
            
        });
        console.log("Connected to database...");
    } catch (error) {
        console.log(error);
    }
}

mongooseConnection();