const mongoose = require("mongoose");
require('dotenv').config();  //.env file is used to store sensitive info like api keys
const connect=async()=>
{
    try{
        await mongoose.connect(process.env.MONGODB_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true 
        });
        console.log("Connected to MongoDB Atlas");

    }catch(err)
    {
        console.error('Error connecting to MongoDB Atlas:', err.message) 
        process.exit(1)//exits node js
    }
}
module.exports=connect;