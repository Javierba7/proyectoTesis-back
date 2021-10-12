require('dotenv').config();
const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const Product = require('./models/products');

const bucketName = process.env.AWS_BUCKET_NAME;
const bucketRegion = process.env.AWS_BUCKET_REGION;
const bucketAcessId = process.env.AWS_ACCESS_KEY_ID;
const bucketAcessSecret = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new aws.S3({
  accessKeyId: bucketAcessId,
  secretAccessKey: bucketAcessSecret,
  region: bucketRegion,
});

const upload = (bucketName) =>
  multer({
    storage: multerS3({
      s3,
      bucket: bucketName,
      metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
      },
      key: function (req, file, cb) {
        cb(null, `image-${Date.now()}.png`);
      },
      contentType: multerS3.AUTO_CONTENT_TYPE,
      acl: 'public-read',
    }),
  });

  const uploadProductToDB = async (data, url) => {
    const newData = JSON.parse(data);
    const { name, quantity, price, department } = newData;
    const newProduct = new Product({
      name,
      quantity,
      price,
      department,
      imgUrl: url
    });
    const productSaved = await newProduct.save();
    return productSaved;
  };

// uploads a file to s3
function uploadFile(req, res) {
  const uploadSingle = upload("products-proyect").single(
    "image"
  );

  uploadSingle(req, res, async (err) => {
    if (err) return res.status(400).json({ success: false, message: err.message });

    const { data } = req.body;
    const url = req.file.location;

    const product = await uploadProductToDB(data, url);
    return res.send(product);
  });
}

module.exports = {
  uploadFile
}