require('dotenv').config(); // Make sure to install dotenv
const { Logtail } = require("@logtail/node");
const logtail = new Logtail(process.env.LOGTAIL_TOKEN);


console.log("Logtail token:", process.env.LOGTAIL_TOKEN);

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method === "POST") {
    const { answer1, answer2, status } = req.body;
    const clientIP = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

    // Log entry
    logtail.info("Data received", {
      answer1,
      answer2,
      clientIP: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
      status
    });


    res.status(200).json({
      message: "Data received successfully",
      answer1,
      answer2,
      status,
      clientIP,
    });
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
};
  