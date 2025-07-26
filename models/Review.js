import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
  lawyerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String, maxlength: 1000 },
}, { timestamps: true });

ReviewSchema.index({ lawyerId: 1, clientId: 1 }, { unique: true }); // Prevent duplicate reviews

export const Review = mongoose.models.Review || mongoose.model("Review", ReviewSchema); 