const mongoose=require('mongoose');
  
const bookSchema=new mongoose.Schema({
    bookName:{type:String,required:true},
    bookId:{type:Number,required:true},
    pubName:{type:String,required:true},
    dop:{type:Date,required:true},
    noPages:{type:Number,required:true},
    yop:{type:Date,required:true},
    cost:{type:Number,required:true}
})

module.exports=mongoose.model('Book',bookSchema);