export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { answer1, answer2 } = req.body;

        // Log IP address
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        
        console.log(`Received answers: ${answer1}, ${answer2}`);
        console.log(`IP Address: ${ip}`);
        
        res.status(200).json({ message: 'Data received' });
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
