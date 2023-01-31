import * as sharp from "sharp"

export const resizeImage = async (buffer: Buffer, width: number, height: number) => {
  return sharp(buffer).resize({ width, height }).png().toBuffer()
}
