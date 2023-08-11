import { v4 as uuid } from "uuid";

var AWS = require("aws-sdk");

const uploadFile = async (file: any) => {
  const S3_BUCKET = "pawtograph";
  const REGION = "EU (Paris) eu-west-3";
  const randomId = uuid();
  const nameArr: string[] = file.name.split(".");
  const extension = nameArr[nameArr.length - 1];
  const fileName =
    nameArr.slice(0, nameArr.length - 1).join() + randomId + "." + extension;

  AWS.config.update({
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_KEY,
  });
  const s3 = new AWS.S3({
    params: { Bucket: S3_BUCKET },
    region: REGION,
  });

  const params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Body: file,
  };

  await s3.putObject(params).promise();

  return `https://pawtograph.s3.eu-west-3.amazonaws.com/${fileName}`;
};

export default uploadFile;
