module.exports = async (req, res) => {
    try {
        if (req.method === 'POST') {
            let data = "";
            req.on("data", chunk => {
                data += chunk;
            });
            req.on("end", () => {
                try {
                    const parsedData = JSON.parse(data);
                    console.log("API hit");
                    console.log("Received data:", parsedData);
                    res.status(200).json({ message: "Data received", data: parsedData });
                } catch (parseError) {
                    console.error("Parsing error:", parseError.message);
                    res.status(400).json({ error: "Invalid JSON" });
                }
            });
        } else {
            res.status(405).json({ error: "Method Not Allowed" });
        }
    } catch (error) {
        console.error("Server error:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
