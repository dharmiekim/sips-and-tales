const sharp = require("sharp");

const input = "public/images/logo/logo.png";
const output = "public/images/logo/logo-upscaled.png";

sharp(input)
  .resize({
    width: 2000,
    height: 2000,
    fit: "inside",
    withoutEnlargement: false,
  })
  .png({
    compressionLevel: 6,
    quality: 100,
  })
  .toFile(output)
  .then((info) => {
    console.log("Logo upscaled successfully!");
    console.log(info);
  })
  .catch((error) => {
    console.error("Failed to upscale logo:", error);
  });