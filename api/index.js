const app = require("./app")
require("./services/mongoose")

const port = process.env.PORT

app.listen(port)
console.info(`Server running on port ${port}`)