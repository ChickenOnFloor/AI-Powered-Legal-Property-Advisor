import mongoose from "mongoose"

let isConnected = false

export const connectToDB = async () => {
  if (isConnected) return

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "legaladvisor",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    isConnected = true
    console.log("✅ MongoDB connected")
  } catch (err) {
    console.error("❌ MongoDB connection error:", err)
  }
}
