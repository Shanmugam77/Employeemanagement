let express=require("express")
let cors=require("cors")
let bodyparser=require("body-parser")
let mongoose=require("mongoose")
let registerdata=require("./modules/schema")

mongoose.connect("mongodb://127.0.0.1:27017/Employees")
mongoose.connection
.once("open",()=>{console.log("db connected");})
.on("error",()=>{console.log("error in db connection");})

let app=express()
app.use(cors())
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))


app.post("/register",(req,res)=>{
    
    registerdata.findOne({email:req.body.email})
    .then((x)=>{
        if (x!=null) {
            res.json("alreadyemployee")
        }
        else{
            console.log(req.body);
            let details=new registerdata(req.body)
            details.save()
            .then((y)=>{res.json(y)})
            .catch(()=>{res.json("error in server while storing the data in db")})
        }
    })
    
})
app.get("/getdata",(req,res)=>{
    registerdata.find()
    .then((x)=>{res.json(x)})
    .catch((err)=>{res.json(err)})
})
app.get("/user/:id",(req,res)=>{
    let id=req.params.id
    registerdata.findOne({_id:id})
    .then((x)=>{res.json(x)})
    .catch((err)=>{res.json(err)})
})
app.get("/edit/:id",(req,res)=>{
    let id=req.params.id
    registerdata.findOne({_id:id})
    .then((x)=>{res.json(x)})
    .catch((err)=>{res.json(err)})
})
app.post("/update/:id",(req,res)=>{
    let id=req.params.id
    registerdata.updateOne({_id:id},req.body)
    .then((x)=>{res.json(x)})
    .catch((err)=>{res.json(err)})
})
app.delete("/delete/:id",(req,res)=>{
    let id=req.params.id
    registerdata.deleteOne({_id:id})
    .then((x)=>{res.json(x)})
    .catch((err)=>{res.json(err)})
})
app.get("/find/:name",(req,res)=>{
    let name=req.params.name
    registerdata.find({firstname:name})
    .then((x)=>{
        if (x[0]!=null) {
            res.json(x)  
        }
        else{
            res.json('usernotfound')
        }
    })
})


app.listen(5555,()=>{console.log("server up");})