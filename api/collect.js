module.exports = (req, res) => {
  console.log('Received request:', req.method);
  console.log('Request body:', req.body);
  console.log('Request headers:', req.headers);

  if (req.method === 'OPTIONS') {
    console.log('Handling OPTIONS request...');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.status(200).end();  // Respond with status 200
    return;
  }

  if (req.method === 'POST') {
    console.log('Processing POST request...');
    console.log('Received answer1:', req.body.answer1);
    console.log('Received answer2:', req.body.answer2);
    console.log('Client IP:', req.headers['x-forwarded-for'] || req.connection.remoteAddress);
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Respond with the captured data for logging and confirmation
    res.status(200).json({
      message: 'Data received successfully',
      answer1: req.body.answer1,
      answer2: req.body.answer2,
      clientIP: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
    });
  } else {
    console.log('Unsupported request method:', req.method);
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};
