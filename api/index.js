module.exports = async (req, res) => {
    if (req.method === 'POST') {
        try {
            const data = req.body;
            console.log("API hit");
            console.log("Received data:", data);
            res.status(200).json({ message: "Data received" });
        } catch (error) {
            console.error("Error processing data:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    } else {
        res.status(405).json({ error: "Method Not Allowed" });
    }
};
