const express = require("express");
const path = require("path");
const { connectDB } = require("./config/db");
const hologramApi = require("./routes/hologram-api");

connectDB();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "..", "..", "dist")));

// Routes
app.use("/api/holograms", hologramApi)

app.use((req, res, next) => {
    if (req.method === "GET" && !req.path.startsWith("/api")) {
        res.sendFile(path.resolve(__dirname, "..", "..", "dist", "index.html"));
    } else {
        next();
    }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Started server on http://localhost:${port}`);
});