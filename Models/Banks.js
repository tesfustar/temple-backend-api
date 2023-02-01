import mongoose from "mongoose";
const banksSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    nameAm: { type: String, required: true },
    number: { type: String, required: true },
    accountHolder:{ type: String, required: true },
  },
  { timestamps: true }
);

const Banks = mongoose.model("Banks", banksSchema);

export default Banks;
