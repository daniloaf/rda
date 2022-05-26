const dotenv = require("dotenv")
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3")

dotenv.config()

const s3Client = new S3Client({
  endpoint: process.env.S3_ENDPOINT,
  region: process.env.S3_REGION,
  credentials: {
    accessKeyId: process.env.S3_KEY,
    secretAccessKey: process.env.S3_SECRET,
  },
})

const uploadObject = async (name, data) => {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: name,
    Body: data,
    ACL: "public-read"
  }
  const result = await s3Client.send(new PutObjectCommand(params))
  return result
}

module.exports = {
  uploadObject
}