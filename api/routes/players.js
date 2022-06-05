const Router = require("@koa/router")

const playersController = require("../controllers/players")

const router = new Router()

router.get("/players", playersController.getPlayers)
router.get("/players/:id", playersController.getPlayer)

module.exports = router
