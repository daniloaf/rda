const mongoose = require("../services/mongoose")
const Player = require("../models/player")

const createPlayers = async () => {
  const players = [
    await Player.create({
      fullName: "Danilo Araújo de Freitas",
      nickname: "Gordão",
      preferredPosition: "F",
      birthdate: "1989-05-19",
      picture: "https://i.stack.imgur.com/gMbrL.jpg",
    }),
    await Player.create({
      fullName: "Felive Vieira Falcão",
      nickname: "Vieira",
      preferredPosition: "F",
      birthdate: "1990-04-25",
      picture: "https://i.stack.imgur.com/gMbrL.jpg",
    }),
    await Player.create({
      fullName: "Matheus Brasileiro Campos",
      nickname: "Zé",
      preferredPosition: "D",
      birthdate: "1988-03-25",
      picture: "https://i.stack.imgur.com/gMbrL.jpg",
    }),
    await Player.create({
      fullName: "Paulo Victor Silva Ouriques",
      nickname: "Velho",
      preferredPosition: "M",
      birthdate: "1987-02-20",
      picture: "https://i.stack.imgur.com/gMbrL.jpg",
    }),
    await Player.create({
      fullName: "Daniel Gondim Ernesto de Melo",
      nickname: "Linguiça",
      preferredPosition: "M",
      birthdate: "1989-06-22",
      picture: "https://i.stack.imgur.com/gMbrL.jpg",
    }),
    await Player.create({
      fullName: "Arthur de Souza Ribeiro",
      nickname: "Tutu",
      preferredPosition: "D",
      birthdate: "1990-09-15",
      picture: "https://i.stack.imgur.com/gMbrL.jpg",
    }),
  ]
  return players
}

const createSeries = async (players) => {

}

const main = async () => {
  await mongoose.connection.asPromise()
  const players = await createPlayers()
  console.log(`Created ${players.length} players`)
  await mongoose.connection.close()
}

main().then(process.exit).catch((err) => {
  console.error(err)
  process.exit(1)
})