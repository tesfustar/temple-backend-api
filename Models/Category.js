import mongoose from "mongoose";

const categorySchema=new mongoose.Schema({
     name:{type:String},
     nameAm:{type:String},
     image:{type:String},
     subCategory:[{type:mongoose.SchemaTypes.ObjectId,ref:'SubCategory'}]
     
},{timestamps:true})

const Category=mongoose.model('Category',categorySchema)

export default Category