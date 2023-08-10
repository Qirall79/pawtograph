var AWS = require("aws-sdk");

const uploadFile = async (file: any) => {
  const S3_BUCKET = "pawtograph";
  const REGION = "EU (Paris) eu-west-3";

  AWS.config.update({
    accessKeyId: "AKIAY5ZBAVUPIRQTQXR4",
    secretAccessKey: "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",
  });
  const s3 = new AWS.S3({
    params: { Bucket: S3_BUCKET },
    region: REGION,
  });

  const params = {
    Bucket: S3_BUCKET,
    Key: file.name,
    Body: file,
  };

  await s3.putObject(params).promise();

  return `https://pawtograph.s3.eu-west-3.amazonaws.com/${file.name}`;
};

export default uploadFile;
