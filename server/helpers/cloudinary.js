const cloudinary = require("cloudinary").v2;
const multer = require("multer");

cloudinary.config({
  cloud_name: "desb7lfqo",
  api_key: "795813166666289",
  api_secret: "wfYL7X96rJiLi72W5Cn98KdsauE",
});

const storage = new multer.memoryStorage();

async function imageUploadUtil(file) {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });

  return result;
}

const upload = multer({ storage });

module.exports = { upload, imageUploadUtil };
