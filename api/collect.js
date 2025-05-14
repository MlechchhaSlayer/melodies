module.exports = (req, res) => {
  // Handle CORS preflight request (OPTIONS)
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');  // Allow both POST and OPTIONS methods
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.status(200).end();  // Respond with status 200 to acknowledge the preflight
    return;
  }

  // Handle the POST request
  if (req.method === 'POST') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    // Process POST request
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
