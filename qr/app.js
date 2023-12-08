import QRCodeStyling from "qr-code-styling";
import fs from "fs";

const qrCode = new QRCodeStyling({
  width: 300,
  height: 300,
  data: "{ name: devdutt, age : 21 }",
  margin: 0,
  qrOptions: { typeNumber: "0", mode: "Byte", errorCorrectionLevel: "Q" },
  imageOptions: { hideBackgroundDots: true, imageSize: 0.4, margin: 0 },
  dotsOptions: { type: "square", color: "#0a0a0a", gradient: null },
  backgroundOptions: { color: "#ffffff" },
  image: fs.readFileSync("./c.png"),
  dotsOptionsHelper: {
    colorType: { single: true, gradient: false },
    gradient: {
      linear: true,
      radial: false,
      color1: "#6a1a4c",
      color2: "#6a1a4c",
      rotation: "0",
    },
  },
  cornersSquareOptions: { type: "extra-rounded", color: "#000000" },
  cornersSquareOptionsHelper: {
    colorType: { single: true, gradient: false },
    gradient: {
      linear: true,
      radial: false,
      color1: "#000000",
      color2: "#000000",
      rotation: "0",
    },
  },
  cornersDotOptions: { type: "", color: "#000000" },
  cornersDotOptionsHelper: {
    colorType: { single: true, gradient: false },
    gradient: {
      linear: true,
      radial: false,
      color1: "#000000",
      color2: "#000000",
      rotation: "0",
    },
  },
  backgroundOptionsHelper: {
    colorType: { single: true, gradient: false },
    gradient: {
      linear: true,
      radial: false,
      color1: "#ffffff",
      color2: "#ffffff",
      rotation: "0",
    },
  },
});
console.log(qrCode);
