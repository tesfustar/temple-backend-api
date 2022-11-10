import mongoose from 'mongoose'
const favoriteSchema=new mongoose.Schema({
    userId:{type:String,required:true},
    productId:[{type:mongoose.SchemaTypes.ObjectId,ref:'Products'}],
    
    
},{timestamps:true})

const Favorite = mongoose.model('Favorite',favoriteSchema)

export default Favorite