module.exports = async (req, res) => {
    console.log('API hit');
    if (req.method === 'POST') {
        try {
            const data = await req.body;
            console.log('Received data:', data); // Log the data
            res.status(200).json({ message: 'Data received' });
        } catch (err) {
            console.error('Error:', err);
            res.status(500).json({ error: 'Server error' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
};
