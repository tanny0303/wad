
const express = require("express");
const https = require("https");
const app = express() ;
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/prac' , {useNewUrlParser: true } );

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));


const PersonSchema = new mongoose.Schema(
    {
        name : String,
        email: String,
        gender : String,
        password: String,
        age : Number
    }
);

const Person = mongoose.model("peoples" , PersonSchema);

app.get("/",function(req,res){
    res.sendFile(__dirname + '//' +'index.html');
})

app.get("/login" , function(req,res){
    res.sendFile(__dirname + '//' + 'login.html');
})

app.post("/login" , function(req,res){
    const b = req.body ;
    console.log(b);
    res.send("Logged In")
})

app.get("/signup",function(req,res){
    res.sendFile(__dirname + '//' +'signup.html')
})

app.post("/signup",function(req,res){
    const z= req.body;
    
    const a= req.body.nav ;
    const b= req.body.email ;
    const c= req.body.gender;
    const d= req.body.password;
    const e= req.body.age ;
     console.log(z);
    console.log(a ,b ,c,d ,e) ;

    const p1= new Person({
        name:a,
        email:b,
        gender:c,
        password:d,
        age:e,
    })
    p1.save();

    res.send("Good");
})


app.get("/read" , function(req,res){
    res.sendFile(__dirname + '//' +'find.html');
})

app.post("/read" ,function(req,res){
    const a= req.body.email ;

    const getDoc = async(a)=>{
        const result = await Person.findOne({email:a});
        console.log(result);
        res.send(result);
       }
       getDoc(a);

})

app.get("/delete" ,function(req,res){
    res.sendFile(__dirname + '//' +'delete.html');
})

app.post("/delete"  , function(req,res){
    const d= req.body.email ;

    // const deleteDoc = async(d)=>{
    //     try{
    //         const result = await Person.findOneAndDelete({email:d});
    //         console.log(result);
    //     }catch(err)
    //     {
    //         console.log(err);
    //     }
    // }
    // deleteDoc(d);
    console.log(d);
    const deleteDoc = async(d)=>{
        try{
            // const one = await Person.findById({email:d});
            // console.log(one);
            // const result = await Person.findByIdAndDelete(one);
            const result = await Person.deleteOne({email:d});
            console.log(result);
            res.send(result);
        }catch(err){
            console.log(err);
        }
    }

    deleteDoc(d);
} )


app.get("/update",function(req,res){
    res.sendFile(__dirname + '//' +'update.html')
})


app.post("/update" , function(req,res){
    const e = req.body.email ;

    const a= req.body.nav ;
    const c= req.body.gender;
    const d= req.body.password;
    const ge= req.body.age ;

    const updateDocument = async(k)=>{
        try{
            const result = await Person.updateOne({email:k} ,  {
                $set:{
                    name:a,
                    gender:c,
                    password:d,
                    age:ge,
                }
            },
            {
                returnOriginal:false,
                returnNewDocument: true,
                // new:true,
            });
            console.log(result) ;
        }catch(err)
        {
           console.log(err);
        }
        
    }
    updateDocument(e);

    // res.send('Updated');
})

app.listen(3000,function(){
    console.log("Port 3000");
})

