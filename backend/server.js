const express = require("express");
const fileUpload=require("express-fileupload")
const cookieParser=require("cookie-parser");
const app = express();

app.use(express.json()); // for parsing application/json
//no need of installing bodyparser separately
app.use(fileUpload());//to upload files
app.use(cookieParser());
const apiRoutes = require("./routes/apiRoutes");
const {rsvped}=require("./controllers/campaignControllers");
app.post("/rsvp",rsvped)
app.get("/", async (req, res,next) => {
  
 res.json({ message: "API running" });
})
//mongodb connection
const connect = require("./config/db.js");
connect();
app.use("/api", apiRoutes);
app.use((err,req,res,next)=>{
    res.status(500).json(
        {
            message:err.message,
            stack:err.stack
        }
    )
});
app.listen(5000, () => console.log("Server started at port 5000"));

