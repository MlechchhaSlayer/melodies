module.exports = (req, res) => {
    if (req.method === 'POST') {
        const { answer1, answer2 } = req.body;

        // Log the data (you can replace this with your actual data handling logic)
        console.log('Received data:', { answer1, answer2 });

        res.status(200).json({ message: "Data received!" });
    } else if (req.method === 'GET') {
        res.status(200).json({ message: "API is working!" });
    } else {
        res.status(405).json({ error: "Method Not Allowed" });
    }
};
