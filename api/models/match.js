const mongoose = require("../services/mongoose")
const BaseSchema = require("./baseSchema")

const Match = new mongoose.Schema({
  ...BaseSchema.obj,
  date: {
    type: Date,
    required: true
  },
  teamA: {
    teamId: {
      type: String,
      required: true,
      ref: "Team",
    },
    goals: {
      type: Number,
      required: true,
    },
  },
  teamB: {
    teamId: {
      type: String,
      required: true,
      ref: "Team",
    },
    goals: {
      type: Number,
      required: true,
    },
  },
})

module.exports = mongoose.model("match", Match)
