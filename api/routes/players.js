const Router = require("@koa/router")

const playerController = require("../controllers/player")

const router = new Router()

router.get("/players/:id", playerController.getPlayer)

module.exports = router
