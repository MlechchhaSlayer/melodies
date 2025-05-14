module.exports = (req, res) => {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    const { answer1, answer2, status } = req.body;
    console.log('Received:', { answer1, answer2, status });
    console.log('Client IP:', req.headers['x-forwarded-for'] || req.connection.remoteAddress);

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    res.status(200).json({
      message: 'Data received successfully',
      answer1,
      answer2,
      status,
      clientIP: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
    });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};
