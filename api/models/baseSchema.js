const uuid = require("uuid")
const mongoose = require("mongoose")

const BaseSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => uuid.v4(),
  },
})

module.exports = BaseSchema