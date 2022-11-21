import Favorite from "../Models/Favorite.js";
import User from "../Models/User.js";

//add to favorite

export const addToFavorite = async (req, res) => {
  const { id } = req.params;
  const { listing } = req.body;
  try {
    const userFavorite = await Favorite.findById(id);
    if (userFavorite) {
      const listingId = userFavorite.listingId?.some(
        (item) => item == listing
      );
      if (listingId)
        return res
          .status(400)
          .json({ message: "listing is already in favorite" });
      userFavorite.listingId.push(listing);
      const updatedUserFavorite = await Favorite.findByIdAndUpdate(
        id,
        userFavorite,
        { new: true }
      );
      res.status(200).json({
        success: true,
        data: updatedUserFavorite,
        message: "new listing added to favorite",
      });
    } else {
      const createUserFavorite = new Favorite({
        _id: id,
        userId: id,
        listingId: listing,
      });
      const saveUserFavorite = await createUserFavorite.save();
      res.status(200).json({
        success: true,
        data: saveUserFavorite,
        message: "favorite is created by user",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get user fevorite

export const getUserFavorite = async (req, res) => {
  try {
    const userFavorite = await Favorite.find({userId:req.params.id});
    const userFavorites = await Favorite.find({userId:req.params.id}).populate('listingId')
    if (!userFavorite)
      return res.status(400).json({ message: "you have no favorite" });
    res.status(200).json({ success: true, data: userFavorite,userFavorites:userFavorites });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//remove property user favorite  .populate('properties')

export const removeUserFavorite = async (req, res) => {
  const { id } = req.params;
  const { listing } = req.body;
  try {
    const userFavorite = await Favorite.findById(id);
    if (!userFavorite)
      return res.status(400).json({ message: "you have no favorite" });
    const propertyId = userFavorite.listingId?.some(
      (item) => item == listing
    );
    if (!propertyId)
      return res.status(400).json({ message: "property not found" });
    const indexProperty = userFavorite.listingId.indexOf(listing);
    userFavorite.listingId.splice(indexProperty, 1);
    const updatedUserFavorite = await Favorite.findByIdAndUpdate(
      id,
      userFavorite,
      { new: true }
    );
    res.status(200).json({ success: true, data: updatedUserFavorite });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
