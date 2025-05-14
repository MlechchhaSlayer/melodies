export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'POST') {
        const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        const { answer1, answer2 } = req.body;

        console.log("Received data:", { answer1, answer2, clientIP });
        res.status(200).json({ message: 'Data received successfully', answer1, answer2, clientIP });
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
