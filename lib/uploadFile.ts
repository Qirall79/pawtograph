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
    accessKeyId: "AKIAY5ZBAVUPEZ7TEYGE",
    secretAccessKey: "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",
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
