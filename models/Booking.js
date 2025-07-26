// models/booking.js
import mongoose from "mongoose"

const BookingSchema = new mongoose.Schema({
  lawyerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  accessStatus: {
    type: String,
    enum: ["enabled", "disabled"],
    default: "enabled",
  },
  expiresAt: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "completed", "cancelled"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const Booking = mongoose.models.Booking || mongoose.model("Booking", BookingSchema)

export { Booking }
export default Booking
