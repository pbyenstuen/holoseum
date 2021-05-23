const express = require("express");
const Grid = require('gridfs-stream');
const mongoose = require('mongoose');
const { upload } = require("../config/db");

const conn = mongoose.connection;
let gfs;

conn.once("open", () => {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection("uploads");
});

const hologramApi = express.Router();

// POST /api/holograms/upload
// Uploads file to MongoDB (accepts .mp4 and .gif)
hologramApi.post("/upload", upload.single("file"), async (req, res) => {
    console.log(req.file);
    res.json({})
});

hologramApi.get("", (req, res) => {
    gfs.files.find().toArray((err, files) => {
        if (!files || files.length === 0) {
            return res.status(404).send()
        }
        return res.json(files);
    });
});

// GET /api/holograms/:name
// Streams requested file from MongoDB
hologramApi.get("/:name", (req, res) => {
    console.log(gfs.files);
    gfs.files.findOne({ metadata: req.params.name }, (err, file) => {
        if (err) {
            return res.status(404).send;
        }
        if (!file || file.length === 0) {
            return res.status(404).send;
        }

        if (req.headers["range"]) {
            const parts = req.headers["range"].replace(/bytes=/, "").split("-");
            const partialStart = parts[0];
            const partialEnd = parts[1];

            const start = parseInt(partialStart, 10);
            const end = partialEnd ? parseInt(partialEnd, 10) : file.length - 1;
            const chunkSize = (end - start) + 1;

            res.writeHead(206, {
                "Accept-Ranges": "bytes",
                "Content-Length": chunkSize,
                "Content-Range": `bytes ${start}-${end}/${file.length}`,
                "Content-Type": file.contentType
            });

            gfs.createReadStream({
                _id: file._id,
                range: {
                    startPos: start,
                    endPos: end
                }
            }).pipe(res);
        } else {
            res.header("Content-Length", file.length);
            res.header("Content-Type", file.contentType);

            gfs.createReadStream({
                _id: file._id
            }).pipe(res);
        }
    });
});

module.exports = hologramApi;