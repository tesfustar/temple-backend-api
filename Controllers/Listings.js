import Listings from "../Models/Listings.js";

//create listings
export const createListing = async (req, res) => {
  const newListing = new Listings(req.body);
  try {
    const saveListing = await newListing.save();
    res.status(201).json({ success: true, data: saveListing });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get listings
export const getAllListings = async (req, res) => {
  try {
    const categories = await Listings.find().sort({ createdAt: -1 });
    res.status(200).send({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get listings for admin
export const getListings = async (req, res) => {
  try {
    const listings = await Listings.find()
      .sort({ createdAt: -1 })
      .populate("userId")
      .populate("category");
    res.status(200).send({ success: true, data: listings });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get single listing for admin
export const getSingleListingAdmin = async (req, res) => {
  try {
    const listing = await Listings.findById(req.params.id)
      .populate("userId")
      .populate("category")
      .populate("subCategory");
    res.status(200).send({ success: true, data: listing });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
