const playerServices = require("../services/player")

const getPlayer = async ctx => {
  const player = await playerServices.getPlayerById(ctx.params.id)
  if (!player) {
    throw {
      status: 400,
      message: "Player not found"
    }
  }
  ctx.body = player
}

const getPlayers = async ctx => {
  const query = ctx.request.query
  const players = await playerServices.getPlayers(query)
  ctx.body = players
}

module.exports = {
  getPlayer,
  getPlayers
}