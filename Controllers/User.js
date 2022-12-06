import User from "../Models/User.js";
import bcrypt from "bcryptjs";
import _ from "lodash";
import Listings from "../Models/Listings.js";
import Favorite from "../Models/Favorite.js";
// update user

export const updateUser = async (req, res) => {
  try {
    const oldUser = await User.findById(req.params.id);
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);
      req.body.password = hashed;
    }
    if (!oldUser) return res.status(400).json({ message: "user not found" });
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    const selectedProp = _.pick(updatedUser, [
      "_id",
      "companyId",
      "firstName",
      "lastName",
      "profile",
      "email",
      "phone",
      "isAdmin",
      "hasCompany",
      "status",
      "createdAt",
      "updatedAt",
    ]);
    res.status(201).json({ success: true, data: selectedProp });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//profile for web

export const userAppProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const selectedProp = _.pick(user, [
      "_id",
      "companyId",
      "firstName",
      "lastName",
      "profile",
      "email",
      "phone",
      "isAdmin",
      "hasCompany",
      "status",
      "createdAt",
      "updatedAt",
    ]);

    res.status(200).json({ success: true, profile: selectedProp });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get single user
export const getSingleUser = async (req, res) => {
  try {
    const singleUser = await User.findById(req.params.id);
    if (!singleUser)
      return res.status(404).json({ message: "user  not found" });

    const userListings = await Listings.find({ userId: singleUser._id })
      .populate("category")
      .populate("subCategory");
    const allUserListings = await Listings.find({
      userId: singleUser._id,
    }).count();
    const soldUserListings = await Listings.find({
      userId: singleUser._id,
      isSoldOut: true,
    }).count();
    const featuredUserListings = await Listings.find({
      userId: singleUser._id,
      isFeatured: true,
    }).count();
    res.status(200).json({
      success: true,
      data: singleUser,
      listings: userListings,
      allUserListings,
      soldUserListings,
      featuredUserListings,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get all users
export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find();
    res.status(200).json({ success: true, data: allUsers });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get all users
export const deleteUser = async (req, res) => {
  try {
    const deleteSingleUser = await User.findById(req.params.id);
    if (!deleteSingleUser)
      return res.status(400).json({ message: "user not found" });
    await User.findByIdAndDelete(req.params.id);
    await Listings.deleteMany({ userId: req.params.id });
    res
      .status(200)
      .json({ success: true, message: "user deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//for all user info for web

export const getUserProfileInfo = async (req, res) => {
  try {
    const userListingsCount = await Listings.find({
      userId: req.params.id,
    }).count();
    const userFavorites = await Favorite.find({
      userId: req.params.id,
    });
    const userFavoriteCount = userFavorites[0]?.listingId?.length || 0;
    const userFeaturedAdsCount = await Listings.find({
      userId: req.params.id,
      isFeatured: true,
    }).count();
    const userListings = await Listings.find({ userId: req.params.id });
    const userFavorite = await Favorite.find({ userId: req.params.id });
    const userFeaturedAds = await Listings.find({
      userId: req.params.id,
      isFeatured: true,
    });
    res.status(200).json({
      success: true,
      userListingsCount,
      userFavoriteCount,
      userFeaturedAdsCount,
      userListings,
      userFavorite,
      userFeaturedAds,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//update user

export const userInfoData = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
