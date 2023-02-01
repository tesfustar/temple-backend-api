import FeaturedListings from "../Models/FeaturedListing.js";
import Listings from "../Models/Listings.js";
import User from "../Models/User.js";
import Notification from "../Models/Notification.js";

//request featured listing
export const createFeaturedListingAd = async (req, res) => {
  const newFeaturedListingAd = new FeaturedListings(req.body);
  try {
    const isBeforeInFeaturedListingAd = await Listings.findOne({
      _id: req.body.listingId,
      isFeatured: true,
    });
    const isInRequest = await FeaturedListings.findOne({
      listingId: req.body.listingId,
      isRejected: false,
      isAccepted: false,
    });
    const notifiedUser = await User.findOne({ isAdmin: true });
    if (isBeforeInFeaturedListingAd)
      return res
        .status(400)
        .json({ message: " this listing already featured listing!" });
    if (isInRequest)
      return res.status(400).json({
        message:
          "This property is previously requested please wait until we prove your request",
      });
    const saveFeaturedListingAd = await newFeaturedListingAd.save();
    const listingRequestNotification = Notification.create({
      userId: notifiedUser._id,
      title: "you have new featured listing request",
      message: `You have new listing request`,
    });
    res.status(200).json({
      success: true,
      featuredListing: saveFeaturedListingAd,
      notification: listingRequestNotification,
    });
    return;
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//accept featured listing request
export const acceptFeaturedListingRequest = async (req, res) => {
  try {
    const request = FeaturedListings.findById(req.params.id);
    if (!request) return res.status(400).json({ message: "request not found" });
    const updatedFeaturedListingAd = await FeaturedListings.findByIdAndUpdate(
      req.params.id,
      {
        isAccepted: true,
      },
      { new: true }
    );
    const listingRequest = await Listings.findByIdAndUpdate(
      req.params.id,
      { isFeatured: true, isRequestedForAd: false },
      { new: true }
    );
    const featuredListingNotification = new Notification({
      userId: request.userId,
      title: "featured listing",
      message: `Your featured listing request accepted!`,
    });
    const saveFeaturedListingNotification =
      await featuredListingNotification.save();
    res.status(200).json({
      success: true,
      featuredListing: updatedFeaturedListingAd,
      listing: listingRequest,
      notification: saveFeaturedListingNotification,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//reject listing request
export const rejectFeaturedListingRequest = async (req, res) => {
  try {
    const request = FeaturedListings.findById(req.params.id);
    if (!request) return res.status(400).json({ message: "request not found" });
    const updatedFeaturedListingAd = await FeaturedListings.findByIdAndUpdate(
      req.params.id,
      {
        isRejected: true,
        isFeatured: true,
      },
      { new: true }
    );
    const listingRequest = await Listings.findByIdAndUpdate(
      req.params.id,
      { isRequestedForAd: false },
      { new: true }
    );
    const featuredListingNotification = new Notification({
      userId: request.userId,
      title: "featured listing",
      message: `Your featured listing request is rejected!`,
    });
    const saveFeaturedListingNotification =
      await featuredListingNotification.save();
    res.status(200).json({
      success: true,
      featuredListing: updatedFeaturedListingAd,
      listing: listingRequest,
      notification: saveFeaturedListingNotification,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get all featured lisiting request

export const getAllListingRequest = async (req, res) => {
  try {
    const getRequests = await FeaturedListings.find({
      isAccepted: false,
      isRejected: false,
    })
      .populate("listingId")
      .populate("bankId");
    res.status(200).json({ success: true, data: getRequests });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get my featured lisitings request

export const getMyListingRequest = async (req, res) => {
  try {
    const getMyRequests = await FeaturedListings.find({
      userId: req.params.id,
      isAccepted: false,
      isRejected: false,
    })
      .populate("listingId")
      .populate("bankId");
    res.status(200).json({ success: true, data: getMyRequests });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//delete my featured listing

export const deleteMyListingRequest = async (req, res) => {
  try {
    await FeaturedListings.findOneAndDelete({ listingId: req.params.id });
    await Listings.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ success: true, message: "listing  successfully deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
