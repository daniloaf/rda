import {
  S3Client,
  PutObjectCommand,
  PutObjectRequest,
} from "@aws-sdk/client-s3";

const s3config = {
  endpoint: process.env.S3_ENDPOINT,
  region: process.env.S3_REGION,
  credentials: {
    accessKeyId: process.env.S3_KEY,
    secretAccessKey: process.env.S3_SECRET,
  },
}

// const s3Client = new S3Client(s3config);

export const uploadObject = async (name: string, data: PutObjectRequest["Body"]) => {
  // const params = {
  //   Bucket: process.env.S3_BUCKET_NAME,
  //   Key: name,
  //   Body: data,
  //   ACL: "public-read",
  // };
  // const result = await s3Client.send(new PutObjectCommand(params));
  // return result;
};
