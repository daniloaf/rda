const Router = require('@koa/router');

const adminRouter = require("./admin")
const playersRouter = require("./players")

const router = new Router()

router.use(adminRouter.routes(), adminRouter.allowedMethods())
router.use(playersRouter.routes(), playersRouter.allowedMethods())

module.exports = router