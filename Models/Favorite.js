import mongoose from 'mongoose'
const favoriteSchema=new mongoose.Schema({
    userId:{type:String,required:true},
    listingId:[{type:mongoose.SchemaTypes.ObjectId,ref:'Listings'}],
    
    
},{timestamps:true})

const Favorite = mongoose.model('Favorite',favoriteSchema)

export default Favorite