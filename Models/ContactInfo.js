import mongoose from "mongoose";
const contactInfoSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    telegram: { type: String },
    facebook: { type: String },
    whatsapp: { type: String },
  },
  { timestamps: true }
);

const ContactInfo = mongoose.model("ContactInfo", contactInfoSchema);

export default ContactInfo;
