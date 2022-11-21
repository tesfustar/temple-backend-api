import Listings from "../Models/Listings.js";
import Notification from "../Models/Notification.js";
import User from "../Models/User.js";
//create listings
export const createListing = async (req, res) => {
  const newListing = new Listings(req.body);
  try {
    const saveListing = await newListing.save();
    const notifiedUser = await User.findOne({ isAdmin: true });
    const listingRequestNotification = new Notification({
      userId: notifiedUser._id,
      title: "listing request",
      message: `You have new listing request for ${req.body.title}.`,
    });
    const saveListingNotification = await listingRequestNotification.save();
    res.status(201).json({
      success: true,
      data: saveListing,
      notification: saveListingNotification,
    });
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
    const listings = await Listings.find({ isApproved: true })
      .sort({ createdAt: -1 })
      .populate("userId")
      .populate("category");
    res.status(200).send({ success: true, data: listings });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get unaccepted listing request
export const getUnacceptedListings = async (req, res) => {
  try {
    const unacceptedListings = await Listings.find({ isApproved: false })
      .sort({ createdAt: -1 })
      .populate("userId")
      .populate("category");
    res.status(200).send({ success: true, data: unacceptedListings });
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
    const allUserListings = await Listings.find({
      userId: listing.userId,
    }).count();
    res.status(200).send({ success: true, data: listing, allUserListings });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get detail
export const getSingleListing = async (req, res) => {
  try {
    const listing = await Listings.findById(req.params.id)
      .populate("userId")
      .populate("category")
      .populate("subCategory");
      if(!listing)  res.status(400).json({message:"listing not found"})
    const relatedListings = await Listings.find({category:listing.category})
    const findOne = relatedListings.filter((item)=>item.title !== listing.title)
    res.status(200).send({ success: true, data: listing, related:findOne });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//delete single listing
export const deleteSingleListingAdmin = async (req, res) => {
  try {
    const singleListing = await Listings.findById(req.params.id);
    if (!singleListing)
      return res.status(404).json({ message: "listing not found" });
    await Listings.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "listing deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get featured listings for admin
export const getAllFeaturedListingsForAdmin = async (req, res) => {
  try {
    const featuredListings = await Listings.find({ isFeatured: true }).sort({
      createdAt: -1,
    });
    res.status(200).send({ success: true, data: featuredListings });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllFeaturedListings = async (req, res) => {
  try {
    const featuredListings = await Listings.find({ isFeatured: true }).sort({
      createdAt: -1,
    });
    res.status(200).send({ success: true, data: featuredListings });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//accept listing request

export const acceptListingRequest = async (req, res) => {
  try {
    const request = await Listings.findById(req.params.id);
    if (!request) return res.status(400).json({ message: "listing not found" });
    const acceptRequest = await Listings.findByIdAndUpdate(
      req.params.id,
      { isApproved: true },
      { new: true }
    );
    const listingRequestNotification = new Notification({
      userId: request.userId,
      title: "congratulation",
      message: `Your listing request for ${req.body.title} is accepted.`,
    });
    const saveListingNotification = await listingRequestNotification.save();
    res.status(200).send({
      success: true,
      data: acceptRequest,
      notification: saveListingNotification,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//reject listing rrequest
export const rejectListingRequest = async (req, res) => {
  try {
    const request = await Listings.findById(req.params.id);
    if (!request) return res.status(400).json({ message: "listing not found" });
    const rejectRequest = await Listings.findByIdAndUpdate(
      req.params.id,
      { isRejected: true },
      { new: true }
    );
    const listingRequestNotification = new Notification({
      userId: request.userId,
      title: "congratulation",
      message: `Your listing request for ${req.body.title} is rejected please meet the requirement.`,
    });
    const saveListingNotification = await listingRequestNotification.save();
    res.status(200).send({
      success: true,
      data: rejectRequest,
      notification: saveListingNotification,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get own listings

export const getOwnListingsData = async (req, res) => {
  try {
    const ownListings = await Listings.find({ userId: req.params.id });
    res.status(200).json({ success: true, data: ownListings });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get own featured data
export const getOwnFeaturedListingsData = async (req, res) => {
  try {
    const ownFeaturedListings = await Listings.find({ userId: req.params.id,isFeatured:true });
    res.status(200).json({ success: true, data: ownFeaturedListings });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};