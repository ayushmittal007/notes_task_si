const express = require("express");
const app = express();
const mongoose = require("mongoose");
const notesRouter = require("./routes/notes_route");
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({extended : true}))
app.use("/notes",notesRouter);

//connecting with Database
const {MONGODB_URI} = process.env
const dbConnect = async function (){
  await mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(()=>{
    console.log("success , database connected")
})
.catch((e)=>{
    console.log(e)
})
}
dbConnect();

app.listen(5000, () => {
  console.log(`Connection is at port 5000`);
});