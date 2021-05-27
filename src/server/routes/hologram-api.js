const express = require("express");
const Grid = require('gridfs-stream');
const mongoose = require('mongoose');
const { upload } = require("../config/db-config");

const conn = mongoose.connection;
let gfs;

conn.once("open", () => {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection("uploads");

    // gfs = new mongoose.mongo.GridFSBucket(conn.db, {
    //     bucketName: "uploads"
    // })
});

const hologramApi = express.Router();

// POST /api/holograms/upload
// Uploads file to MongoDB (accepts .mp4 only)
hologramApi.post("/upload", upload.single("file"), async (req, res) => {
    if (!req.user) return res.status(401).send();
    console.log(req.file);
    res.json({})
});

// GET /api/holograms
// Returns metadata for all files stored in MongoDB
hologramApi.get("", (req, res) => {
    if (!req.user) return res.status(401).send();
    gfs.files.find().toArray((err, files) => {
        if (!files || files.length === 0) {
            return res.status(404).send()
        }
        res.json(files);
    });
});

// DELETE /api/holograms/:name
// Deletes selected file from MongoDB
hologramApi.delete("/:name", (req, res) => {
    if (!req.user) return res.status(401).send();
    const name = req.body.name.toLowerCase();

    gfs.remove({ _id: "60acd64e7c67aa0cf088a84f" }, (err, file) => {
        if (err) {
            return res.status(404).send();
        }
        res.status(200).send();
    });
});

// GET /api/holograms/:name
// Streams selected file from MongoDB
hologramApi.get("/:name", (req, res) => {
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

// hologramApi.get("/:name", async (req, res) => {
//     gfs.find({ metadata: req.params.name }).toArray((err, files) => {
//         console.log(files[0])
//         if (err) {
//             return res.status(404).send;
//         }
//         if (!files[0] || files[0].length === 0) {
//             return res.status(404).send;
//         }

//         if (req.headers["range"]) {
//             console.log(req.headers.range)
//             const parts = req.headers["range"].replace(/bytes=/, "").split("-");
//             const partialStart = parts[0];
//             const partialEnd = parts[1];

//             const start = parseInt(partialStart, 10);
//             const end = partialEnd ? parseInt(partialEnd, 10) : files[0].length - 1;
//             const chunkSize = (end - start) + 1;

//             res.writeHead(206, {
//                 "Accept-Ranges": "bytes",
//                 "Content-Length": chunkSize,
//                 "Content-Range": `bytes ${start}-${end}/${files[0].length}`,
//                 "Content-Type": files[0].contentType
//             });

//             gfs.openDownloadStream(files[0]._id, {start, end }).pipe(res);

//         } else {
//             console.log("hei")
//             res.header("Content-Length", files[0].length);
//             res.header("Content-Type", files[0].contentType);

//             gfs.openDownloadStream({
//                 _id: files[0]._id
//             }).pipe(res);

//             gfs.openDownloadStream(files[0]._id).pipe(res);
//         }
//     });
// });

module.exports = hologramApi;