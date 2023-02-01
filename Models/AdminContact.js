import mongoose from "mongoose";
const adminContactSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
    facebook: { type: String },
    whatsapp: { type: String },
    telegram: { type: String },
    phone: { type: String },
    featuredAdAmount: { type: String },
  },
  { timestamps: true }
);

const AdminContact = mongoose.model("AdminContact", adminContactSchema);

export default AdminContact;
