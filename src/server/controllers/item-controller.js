const path = require("path");
const multer = require("multer");
const Item = require("../models/Item");

const storage = multer.diskStorage({
  destination: "./src/server/uploads",
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  }
})

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  }
}).single("file");

const checkFileType = (file, cb) => {
  const fileTypes = /mp4/;
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = fileTypes.test(file.mimetype)

  if (mimeType && extName) {
    return cb(null, true);
  } else {
    cb("Ulovlig");
  }
}

const findAll = async (req, res) => {
  res.json(await Item.find());
};

const findOne = async (req, res) => {
  res.json(await Item.findOne({ name: req.params.name }));
};

const create = async (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.status(500).send();
    } else {
      console.log(req.file);
    }
  })
};

module.exports = {
  findAll,
  findOne,
  create
};