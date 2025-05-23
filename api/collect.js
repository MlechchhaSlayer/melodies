const { Logtail } = require("@logtail/node");
const logtail = new Logtail("kJJweKNzMXwjXTKHjh4WwZGy"); // 🔁 Replace with your actual token

module.exports = async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    const { answer1, answer2, status } = req.body;
    const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    const logData = {
      answer1,
      answer2,
      status,
      clientIP,
      timestamp: new Date().toISOString(),
    };

    // Log to console and Logtail
    console.log('Received:', logData);
    await logtail.info("Form submission received", logData);

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    res.status(200).json({
      message: 'Data received successfully',
      ...logData
    });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};
