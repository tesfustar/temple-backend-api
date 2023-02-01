import AdminContact from "../Models/AdminContact.js";
import Category from "../Models/Category.js";
import Subcategory from "../Models/SubCategory.js";
import Listings from "../Models/Listings.js";
import User from "../Models/User.js";
import Banner from "../Models/Banner.js";
//dashboard
export const getAllStatus = async (req, res) => {
  try {
    const allUsers = await User.find().count();
    const allCategory = await Category.find().count();
    const allSubCategories = await Subcategory.find().count();
    const allListings = await Listings.find().count();
    const allVehicleForSale = await Listings.find({
      propertyDetail: null,
    }).count();
    const allPropertiesForSale = await Listings.find({
      carDetail: null,
    }).count();
    const featuredListings = await Listings.find({ isFeatured: true }).count();
    const soldProperty = await Listings.find({ isSoldOut: true }).count();
    const adBanners = await Banner.find().count();
    res.status(200).json({
      success: true,
      data: {
        users: allUsers,
        categories: allCategory,
        subCategories: allSubCategories,
        listings: allListings,
        vehicleForSell: allVehicleForSale,
        propertiesForSell: allPropertiesForSale,
        featuredListings,
        soldProperty: soldProperty,
        adBanners,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get category detail

export const getCategoryDetail = async (req, res) => {
  try {
    const subCategories = await Subcategory.find({
      categoryId: req.params.id,
    }).count();
    const categoryListingsCount = await Listings.find({
      category: req.params.id,
    }).count();
    const categoryListings = await Listings.find({
      category: req.params.id,
    }).populate("subCategory");
    res.status(200).json({
      message: "success",
      subCategories,
      categoryListingsCount,
      categoryListings,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSubCategoryDetail = async (req, res) => {
  try {
    const subcategoryListingsCount = await Listings.find({
      subCategory: req.params.id,
    }).count();
    const subCategoryListings = await Listings.find({
      category: req.params.id,
    }).populate("subCategory");
    res.status(200).json({
      message: "success",
      subcategoryListingsCount,
      subCategoryListings,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//social contact info
export const createSocialContactInfo = async (req, res) => {
  const newContact = new AdminContact(req.body);
  try {
    const oldInfo = await AdminContact.findOne({ userId: req.body.userId });
    if (oldInfo) {
      const updateOldInfo = await AdminContact.findByIdAndUpdate(
        oldInfo._id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).send({ success: true, data: updateOldInfo });
    } else {
      const savedContact = await newContact.save();
      res.status(201).send({ success: true, data: savedContact });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get own infoo
export const getOwnContactInfo = async (req, res) => {
  try {
    const myContactInfo = await AdminContact.findOne({ userId: req.params.id });
    res.status(200).send({ success: true, data: myContactInfo });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
