let mongoose=require("mongoose")

let dataschema=new mongoose.Schema({
    firstname:String,
    lastname:String,
    email:String,
    role:String,
    gender:String,
    dob:String,
    phone:Number,
    address:String,
    company:String,
    salary:Number
})

let registerdata=mongoose.model("empdetails",dataschema)

module.exports=registerdata