const SHEET_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbxIy6oCN-miOO1zP5pegfVrPHjlaZvHpVuG8CFUVRn7vwFIJ_nXUMKscYAP0cOPbFcC/exec';

module.exports = async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    const { answer1, answer2, status } = req.body;
    const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    // Send data to Google Sheets
    try {
      await fetch(SHEET_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answer1, answer2, status, clientIP }),
      });
    } catch (error) {
      console.error('Error sending to Google Sheets:', error.message);
    }

    return res.status(200).json({
      message: 'Data received successfully',
      answer1,
      answer2,
      status,
      clientIP,
    });
  }

  return res.status(405).json({ message: 'Method Not Allowed' });
};
