import Category from "../Models/Category.js";
import Subcategory from "../Models/SubCategory.js";
import Listings from "../Models/Listings.js";
import User from "../Models/User.js";
import Banner from '../Models/Banner.js'
//dashboard
export const getAllStatus = async (req, res) => {
  try {
    const allUsers = await User.find().count();
    const allCategory = await Category.find().count();
    const allSubCategories = await Subcategory.find().count();
    const allListings = await Listings.find().count();
    const allVehicleForSale = await Listings.find({propertyDetail:null }).count();
    const allPropertiesForSale = await Listings.find({ carDetail:null}).count();
    const featuredListings = await Listings.find({isFeatured:true}).count();
    const soldProperty = await Listings.find({isSoldOut:true}).count();
    const adBanners = await Banner.find().count();
    res.status(200).json({
      success: true,
     data:{
      users: allUsers,
      categories: allCategory,
      subCategories: allSubCategories,
      listings: allListings,
      vehicleForSell: allVehicleForSale,
      propertiesForSell: allPropertiesForSale,
      featuredListings,
      soldProperty:soldProperty,
      adBanners
     }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
