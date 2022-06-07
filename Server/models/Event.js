const mongoose = require("mongoose");
const validator = require("validator");

const Schema = mongoose.Schema;

const eventSchema = new Schema({
  ownerId: {
    type: Schema.ObjectId,
    required: [true, "MissingOwnerId"],
    ref: "User",
  },
  categoryId: {
    type: Schema.ObjectId,
    required: [true, "MissingCategoryId"],
    ref: "Category",
  },
  title: {
    type: String,
    required: [true, "MissingTitle"],
  },
  description: {
    type: String,
    required: [true, "MissingDescription"],
  },
  date: {
    type: Date,
    required: [true, "MissingDate"],
  },
  location: {
    type: String,
    required: [true, "MissingLocation"],
  },
  limit: {
    type: String,
  },
  participants: [
    {
      userId: { type: Schema.ObjectId, ref: "User" },
      status: {
        type: String,
        enum: ["accepted", "rejected", "pending"],
        default: "pending",
      },
    },
  ],
  color: {
    type: String,
  },
});

const Event = mongoose.model("event", eventSchema);
module.exports = Event;
