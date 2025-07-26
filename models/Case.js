import mongoose from "mongoose"

const CaseSchema = new mongoose.Schema({
  title: String,
  status: { type: String, default: "Pending" },
  lawyer: String,
  date: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
})

const Case = mongoose.models.Case || mongoose.model("Case", CaseSchema)

export { Case }
export default Case
