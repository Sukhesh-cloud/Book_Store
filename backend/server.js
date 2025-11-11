const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');

const app=express();
app.use(cors());
app.use(express.json());

const bookRouter=require('./routes/routes');
app.use('/api/Books',bookRouter);


const URL='mongodb://localhost:27017/Books';
const PORT=5000;

mongoose.connect(URL)
.then(
    ()=>{
        console.log("MongoDb connected");
        app.listen(PORT,()=>{console.log("Running on PORT :5000")})
    }
)
.catch(err=>{
    console.log(err);
});