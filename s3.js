require('dotenv').config();
const S3 = require('aws-sdk/clients/s3');
const fs = require('fs');

const { Buffer } = require('buffer');

const bucketName = process.env.AWS_BUCKET_NAME;
const bucketRegion = process.env.AWS_BUCKET_REGION;
const bucketAcessId = process.env.AWS_ACCESS_KEY_ID;
const bucketAcessSecret = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new S3({
  bucketRegion,
  bucketAcessId,
  bucketAcessSecret
})

// uploads a file to s3
function uploadFile(file) {
  const fileStream = fs.createReadStream(file);

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename
  }

  return s3.upload(uploadParams).promise()
}

module.exports = {
  uploadFile
}