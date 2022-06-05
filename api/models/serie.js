const mongoose = require("../services/mongoose")
const BaseSchema = require("./baseSchema")
const Match = require("./match")
const Team = require("./team")

const Serie = new mongoose.Schema({
  ...BaseSchema.obj,
  month: {
    type: Number,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  teams: [
    {
      type: Team.schema,
    },
  ],
  gameDays: [
    {
      matches: {
        type: Match.schema,
      },
      goals: [
        {
          playerId: {
            type: String,
            ref: "Player",
          },
          amount: {
            type: Number,
          },
        },
      ],
      assists: [
        {
          playerId: {
            type: String,
            ref: "Player",
          },
          amount: {
            type: Number,
          },
        },
      ],
    },
  ],
})

module.exports = mongoose.model("serie", Serie)
