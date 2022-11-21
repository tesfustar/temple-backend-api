import FeaturedListings from "../Models/FeaturedListing.js";
import Listings from "../Models/Listings.js";
import User from "../Models/User.js";
import Notification from "../Models/Notification.js";

//request featured listing
export const createFeaturedListingAd = async (req, res) => {
  const newFeaturedListingAd = new FeaturedListings({
    listingId: req.params.id,
  });
  try {
    const isBeforeInFeaturedListingAd = await FeaturedListings.findById(
      req.params.id
    );
    const notifiedUser = await User.findOne({ isAdmin: true });
    if (isBeforeInFeaturedListingAd) {
      const updateFeaturedListingAd = await FeaturedListings.findByIdAndUpdate(
        req.params.id,
        { isRejected: false, isAccepted: false },
        { new: true }
      );
      const listingRequestNotification = new Notification({
        userId: notifiedUser._id,
        title: "you have new featured listing request",
        message: `You have new listing request`,
      });
      res.status(200).json({
        success: true,
        featuredListing: updateFeaturedListingAd,
        // listing: listingRequest,
        notification: listingRequestNotification,
      });
      return;
    }
    const savedPropertyAd = await FeaturedListings.save();
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
      { isFeatured: true,isRequestedForAd: false  },
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
  