const mongoose = require("mongoose")
const BaseSchema = require("./baseSchema")

const Team = new mongoose.Schema({
  ...BaseSchema.obj,
  color: {
    type: String,
    required: true
  },
  players: [
    {
      type: String,
      ref: "Player"
    }
  ]
})

module.exports = mongoose.model("team", Team)
