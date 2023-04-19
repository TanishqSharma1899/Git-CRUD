const mongoose = require('mongoose');

const connectDB = async ()=>{
    
        //mongo DB connection string
        await mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true,useUnifiedTopology:true})

        .then(()=>{
            console.log("Db connceted suffuly")
            }).catch((err)=>{console.log("err",err.message)});
           
       


    
}



module.exports= connectDB