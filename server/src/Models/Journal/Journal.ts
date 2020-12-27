import mongoose from "mongoose";

const journalSchema = new mongoose.Schema({
  owner: { type: String, required: true },
  journals: { type: [], default: [] },
});

export const journalModel = mongoose.model("journalModel", journalSchema);
