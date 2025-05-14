module.exports = async (req, res) => {
    if (req.method === 'POST') {
        try {
            const data = await req.body;
            console.log('Received data:', data); // Log the data received
            res.status(200).json({ message: 'Data received', data });
        } catch (err) {
            console.error('Error processing request:', err);
            res.status(500).json({ error: 'Server error' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
};
