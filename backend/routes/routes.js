const express=require('express');
const Book=require('../models/Book');

const router=express.Router();

router.post('/', async (req,res)=>{
    try{
        const {bookName,bookId,pubName,dop,noPages,yop,cost}=req.body;
        if (!bookName||!bookId||!pubName||!dop||!noPages||!yop||!cost){
            return res.status(500).json({msg:"All Fields are Required"});
        }
        const newBook=Book({bookName,bookId,pubName,dop,noPages,yop,cost})
        await newBook.save();
        return res.status(200).json({msg:"Saved Successfully",data:newBook})
    }catch(err){
        return res.status(500).json({msg:"ERROR"});
    }
});

router.get('/all',async (req,res)=>{
    try{
        const data=await Book.find({});
        console.log("Hi");
        console.log(data);
        if(data){
            return res.status(200).json({msg:"DATA FOUND",data:data});
        }else{
            return res.status(500).json({msg:"No Data Found"});
        }
    }catch(err){
        console.log("err");
        return res.status(500).json({msg:"Error"});
    }
})

router.get('/:bookId',async (req,res)=>{
    try{
        const {bookId}=req.params;
        const user =await Book.find({bookId:bookId});
        if(!user){
            return res.status(500).json({msg:"Not Found"});
        }
        console.log(user);
        return res.status(200).json({msg:"Found",data:user});
    }catch(err){
        return res.status(500).json({msg:"ERROR"});
    }
})
module.exports=router;