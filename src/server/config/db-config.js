// GridFS boilerplate code taken from the YouTube channel Traversy Media (https://www.youtube.com/watch?v=3f5Q9wDePzY&t=1519s)

require("dotenv").config();
const crypto = require("crypto");
const path = require("path");
const mongoose = require("mongoose");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (e) {
        console.log(e);
        process.exit(1);
    }
}

const storage = new GridFsStorage({
    url: process.env.MONGO_URI,
    options: {
        useNewUrlParser: true
    },
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = buf.toString("hex") + path.extname(file.originalname);

                const fileInfo = {
                    filename: filename,
                    bucketName: "uploads",
                    metadata: req.body.name.toLowerCase()
                };
                resolve(fileInfo);
            });
        });
    }
});

const checkFileType = (file, cb) => {
    const fileTypes = /mp4/;
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimetype)

    if (mimeType && extName) {
        return cb(null, true);
    } else {
        cb("Not allowed");
    }
}

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    }
});

module.exports = {
    connectDB,
    upload
};
