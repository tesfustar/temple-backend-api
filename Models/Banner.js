import mongoose from 'mongoose'
const bannerSchema=new mongoose.Schema({
    image:{type:String,required:true},
    name:{type:String,default:null},
},{timestamps:true})

const Banner = mongoose.model('AdBanner',bannerSchema)

export default Banner