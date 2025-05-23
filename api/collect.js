const { Logtail } = require("@logtail/node");

const logtail = new Logtail(process.env.LOGTAIL_TOKEN);

module.exports = async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    const { answer1, answer2, status } = req.body;
    const clientIP = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Log to console
    console.log("Logging to Logtail...");
    console.log("Token:", process.env.LOGTAIL_TOKEN);

    try {
      await logtail.info("Received entry", { answer1, answer2, status, clientIP });
    } catch (error) {
      console.error("Logtail logging failed:", error.message);
    }

    return res.status(200).json({ message: "Data received", answer1, answer2, status, clientIP });
  }

  return res.status(405).json({ message: "Method Not Allowed" });
};
