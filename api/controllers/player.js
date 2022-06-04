const playerServices = require("../services/player")

const getPlayer = async ctx => {
  const player = playerServices.getPlayerById(ctx.params.id)
  if (!player) {
    throw {
      status: 400,
      message: "Player not found"
    }
  }
  ctx.body = player
}

module.exports = {
  getPlayer
}