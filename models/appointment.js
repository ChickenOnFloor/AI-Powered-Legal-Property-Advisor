import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema({
  lawyerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  clientName: String,
  clientEmail: String,
  type: String, // "Video", "Chat", etc.
  date: String,
  time: String,
  paid: { type: Boolean, default: false },
});

export const Appointment = mongoose.models.Appointment || mongoose.model("Appointment", AppointmentSchema);
