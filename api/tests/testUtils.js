const Player = require("../models/player");

export const createPlayer = async (data) => {
  return Player.create(data)
}
