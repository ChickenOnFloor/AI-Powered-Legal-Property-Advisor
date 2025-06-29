import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName:  { type: String, required: true },
  email:     { type: String, required: true, unique: true },
  password:  { type: String, required: true },
  userType:  { type: String, enum: ["client", "lawyer"], required: true },
  specialization: { type: String, default: "property" },
  image:     { type: String },
  location:  { type: String },
  bio:       { type: String },
  verified:  { type: Boolean, default: false },
  sessionRate: { type: Number, default: 50 },
  availableSlots: {
    type: Map,
    of: [String],
    default: {},
  },
}, { timestamps: true })

export const User = mongoose.models.User || mongoose.model("User", UserSchema)
