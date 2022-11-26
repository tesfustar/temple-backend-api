import mongoose from "mongoose";
const userContactSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
    facebook: { type: String },
    whatsapp: { type: String },
    telegram: { type: String },
  },
  { timestamps: true }
);

const UserContact = mongoose.model("UserContact", userContactSchema);

export default UserContact;
