const Item = require("../models/Item");

const findAll = async (req, res) => {
  res.json(await Item.find());
};

const findOne = async (req, res) => {
  res.json(await Item.findOne({ name: req.params.name }));
};

const create = async (req, res) => {
  const newItem = {
    name: req.body.name,
    url: req.body.url
  };

  try {
    let item = await Item.findOne({ name: req.body.name });
    if (!item) {
      await Item.create(newItem);
      res.status(201).send();
    } else {
      res.status(400).send();
    }
  } catch {
    res.status(500).send();
  }
};

module.exports = {
  findAll,
  findOne,
  create
};