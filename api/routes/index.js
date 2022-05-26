const Router = require('@koa/router');

const adminRouter = require("./admin")

const router = new Router()

router.use(adminRouter.routes(), adminRouter.allowedMethods())

module.exports = router