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

router.delete('/:bookId',async (req,res)=>{
    try{
        const {bookId}=req.params;
        const book=await Book.findOne({bookId:bookId});
        if(book){
            await Book.deleteOne({bookId:bookId});
            return res.status(200).json({msg:"Deleted Successfully"});
        }
        return res.status(500).json({msg:"Not FOund"});
    }catch(err){
        return res.status(500).json({msg:"Not FOund"});
    }
})
router.put('/:bookId',async (req,res)=>{
    try{
        const {bookId}=req.params;
        const book=await Book.findOne({bookId:bookId});
        if(book){
            const {bookName,pubName,dop,noPages,yop,cost}=req.body;
            if (!bookName||!bookId||!pubName||!dop||!noPages||!yop||!cost){
                return res.status(500).json({msg:"All Fields are Required"});
            }
            book.bookName=bookName;
            book.pubName=pubName;book.dop=dop,book.noPages=noPages,book.yop=yop,book.cost=cost;
            await book.save();
            return res.status(200).json({msg:"Updated Successfully",data:book});
        }else{
            return res.status(500).json({msg:"Not FOund"});
        }
    }catch(err){
        console.log("ERR");
    }
})
module.exports=router;