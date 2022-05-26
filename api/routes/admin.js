const Router = require("@koa/router")
const multer = require("@koa/multer")

const adminController = require("../controllers/admin")

const upload = multer()

const router = new Router()

router.post("/admin/players", adminController.addPlayer)
router.put("/admin/players/:id/picture", upload.single("image"), adminController.setPlayerPicture)

module.exports = router
