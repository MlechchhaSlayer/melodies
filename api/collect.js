module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');  // Allow all domains (for testing)
  res.setHeader('Access-Control-Allow-Methods', 'POST');  // Allow only POST requests
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');  // Allow content type header

  if (req.method === 'POST') {
    // Your logic to process the data...
    res.status(200).json({
      message: 'Data received successfully',
      answer1: req.body.answer1,
      answer2: req.body.answer2,
      clientIP: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
    });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};
