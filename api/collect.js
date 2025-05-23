const { Logtail } = require("@logtail/node");

const logtail = new Logtail(process.env.LOGTAIL_TOKEN);

module.exports = async (req, res) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.status(200).end();
    return;
  }

  // Handle POST request
  if (req.method === 'POST') {
    const { answer1, answer2, status } = req.body;
    const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    // Log to Vercel console (for debugging)
    console.log('Received:', { answer1, answer2, status });
    console.log('Client IP:', clientIP);

    // Log to Logtail
    await logtail.info("Form submission received", {
      answer1,
      answer2,
      status,
      clientIP
    });

    // Ensure logs are flushed before function exits
    await logtail.flush();

    // Set CORS headers and respond
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    res.status(200).json({
      message: 'Data received successfully',
      answer1,
      answer2,
      status,
      clientIP
    });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};
