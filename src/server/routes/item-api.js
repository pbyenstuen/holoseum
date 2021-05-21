const express = require("express");
const items = require("../controllers/item-controller");
const Grid = require('gridfs-stream');
const mongoose = require('mongoose');
const { upload } = require("../config/db");
const connection = mongoose.connection;

let gfs;

connection.once("open", () => {
    gfs = Grid(connection.db, mongoose.mongo);
    gfs.collection("uploads");
});

const itemApi = express.Router();

// Returns all items
itemApi.get("", items.findAll);

// Returns one specific item
itemApi.get("/:name", (req, res) => {

    gfs.files.findOne({ metadata: req.params.name }, (err, file) => {
        // Check if file
        if (!file || file.length === 0) {
            res.status(404).send();
        }

        if (file.contentType === 'image/jpeg' || file.contentType === 'image/png' || file.contentType === 'video/mp4') {
            // Read output to browser
            const readstream = gfs.createReadStream(file.filename);
            readstream.pipe(res);
        } else {
            res.status(404).send();
        }
    });
});

// Create a new item
itemApi.post("/create", upload.single("file"), (req, res) => {
    console.log(req.file);
    res.status(201).send();
});

module.exports = itemApi;