const Koa = require("koa")
const cors = require('@koa/cors');
const koaBody = require("koa-body")
const dotenv = require('dotenv');
const router = require("./routes");

dotenv.config();

const app = new Koa()

app.use(cors())
app.use(koaBody())

app.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    console.warn(err)
    ctx.body = { message: err.message, status: err.status || 500 }
  }
})

app.use(router.routes())

module.exports = app