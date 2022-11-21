import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";
const notificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String },
    message: { type: String },
    readAt: { type: Date, default: null },
  },
  { timestamps: true }
);
notificationSchema.plugin(paginate);
const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
