const { SESClient } = require("@aws-sdk/client-ses");

const REGION = "ap-south-1";

console.log("--- AWS DEBUG ---");
console.log("Region:", REGION);
console.log("Access Key Found:", process.env.DEV_MATCH_AWS_ACCESS_KEY ? "YES" : "NO");
console.log("Key Length:", process.env.DEV_MATCH_AWS_ACCESS_KEY?.length);
console.log("Secret Length:", process.env.DEV_MATCH_AWS_SECRET_KEY?.length);
console.log("-----------------");

const sesClient = new SESClient({
  region: REGION,
  credentials: {
    accessKeyId: process.env.DEV_MATCH_AWS_ACCESS_KEY,
    secretAccessKey: process.env.DEV_MATCH_AWS_SECRET_KEY,
  },
});
module.exports = { sesClient };
