import UserContact from "../Models/UserContact.js";

//create Category
export const createSocialContactInfo = async (req, res) => {
  const newUserContact = new UserContact(req.body);
  try {
    const oldInfo = await UserContact.findById(req.params.id);
    if (oldInfo) {
      const updateOldInfo = await UserContact.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).send({ success: true, data: updateOldInfo });
    } else {
      const savedUserContact = await newUserContact.save();
      res.status(201).send({ success: true, data: savedUserContact });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get own info
export const getOwnContactInfo = async (req, res) => {
  try {
    const myContactInfo = await UserContact.findOne({ userId: req.params.id });
    res.status(200).send({ success: true, data: myContactInfo });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
