import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName:  { type: String, required: true },
  email:     { type: String, required: true, unique: true },
  password:  { type: String, required: true },
  userType:  { type: String, enum: ["client", "lawyer", "admin"], required: true },
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
  settings: {
    notifications: {
      email: { type: Boolean, default: true },
      push: { type: Boolean, default: true },
      booking: { type: Boolean, default: true },
      messages: { type: Boolean, default: true },
      reviews: { type: Boolean, default: true },
      system: { type: Boolean, default: false }
    },
    privacy: {
      profileVisibility: { 
        type: String, 
        enum: ["public", "lawyers", "private"], 
        default: "public" 
      },
      showEmail: { type: Boolean, default: false },
      showPhone: { type: Boolean, default: false },
      allowMessages: { type: Boolean, default: true }
    },
    preferences: {
      language: { type: String, enum: ["en", "ur"], default: "en" },
      timezone: { type: String, default: "UTC" },
      currency: { type: String, enum: ["USD", "PKR"], default: "USD" }
    }
  }
}, { timestamps: true })

export const User = mongoose.models.User || mongoose.model("User", UserSchema)
