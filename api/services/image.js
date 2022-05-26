const sharp = require("sharp")

const resizeImage = async (buffer, width, height) => {
  return sharp(buffer).resize({ width, height }).png().toBuffer()
}

module.exports = {
  resizeImage,
}
