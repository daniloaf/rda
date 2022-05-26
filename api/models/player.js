const mongoose = require("mongoose")
const BaseSchema = require("./baseSchema")

const Player = new mongoose.Schema({
  ...BaseSchema.obj,
  fullName: {
    type: String,
    required: true
  },
  nickname: {
    type: String,
    required: true
  },
  preferredPosition: {
    type: String,
    enum: ["G", "D", "M", "F"]
  },
  birthdate: {
    type: Date,
    required: true
  },
  picture: {
    type: String
  }
})

module.exports = mongoose.model("player", Player)