const uuid = require("uuid")
const playerServices = require("../services/player")
const imageServices = require("../services/image")
const s3Services = require("../services/s3")

const addPlayer = async ctx => {
  const player = await playerServices.createPlayer(ctx.request.body)
  ctx.body = player
}

const setPlayerPicture = async ctx => {
  const playerId = ctx.params.id
  const player = await playerServices.getPlayerById(playerId)
  if (!player) {
    throw {
      status: 404,
      message: "Player not found",
    }
  }

  const file = ctx.request.file
  const resizedFile = await imageServices.resizeImage(file.buffer, 150, 200)
  const fileName = `rda/pictures/${uuid.v4()}`
  await s3Services.uploadObject(fileName, resizedFile)
  const imageUrl = `${process.env.S3_ENDPOINT}/${process.env.S3_BUCKET_NAME}/${fileName}`
  await playerServices.updatePlayer(playerId, { picture: imageUrl })

  ctx.body = { url: imageUrl }
}

module.exports = {
  addPlayer,
  setPlayerPicture,
}
