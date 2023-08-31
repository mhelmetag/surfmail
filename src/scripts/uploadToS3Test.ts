import * as fs from "node:fs";

import * as dotenv from "dotenv";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

dotenv.config();

const filename = process.argv[2];

if (!filename) {
  console.error("No filename provided");
  process.exit(1);
}

const data = fs.readFileSync(`./recordings/${filename}`);

const client = new S3Client({
  region: process.env.AWS_DEFAULT_REGION,
});
const command = new PutObjectCommand({
  Bucket: process.env.AWS_S3_BUCKET_NAME,
  Key: `${process.env.NODE_ENV}/${filename}`,
  Body: data.toString(),
});
client.send(command).then(() => {
  console.log("Success");
});
