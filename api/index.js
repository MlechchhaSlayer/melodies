// api/index.js

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { answer1, answer2 } = req.body;
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

        console.log(`IP: ${ip}, Answer1: ${answer1}, Answer2: ${answer2}`);

        res.status(200).json({ message: 'Data received successfully!' });
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
