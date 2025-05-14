export default function handler(req, res) {
    console.log('Request Method:', req.method);  // Log the request method
    console.log('Request Body:', req.body);      // Log the request body
    
    if (req.method === 'POST') {
        const { answer1, answer2 } = req.body;
        console.log('Received answers:', answer1, answer2);  // Log received answers
        res.status(200).json({ message: 'Data received' });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
