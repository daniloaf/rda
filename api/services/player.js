const Player = require("../models/player")

const getPlayerById = async playerId => {
  return Player.findById(playerId)
}

const createPlayer = async ({ fullName, nickname, preferredPosition, birthdate, picture }) => {
  return Player.create({ fullName, nickname, preferredPosition, birthdate, picture })
}

const updatePlayer = async (playerId, { fullName, nickname, preferredPosition, birthdate, picture }) => {
  return Player.findByIdAndUpdate(playerId, { $set: { fullName, nickname, preferredPosition, birthdate, picture } })
}

module.exports = {
  getPlayerById,
  createPlayer,
  updatePlayer,
}
