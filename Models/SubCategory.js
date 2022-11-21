import mongoose from "mongoose";

const subCategorySchema=new mongoose.Schema({
     categoryId:{type:mongoose.SchemaTypes.ObjectId,ref:'Category',required:true},
     name:{type:String,required:true,unique:true},
     nameAm:{type:String,required:true,unique:true},
     image:{type:String,required:true,unique:true},
},{timestamps:true})

const SubCategory=mongoose.model('SubCategory',subCategorySchema)

export default SubCategory