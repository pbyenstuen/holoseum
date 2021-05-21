const express = require("express");
const items = require("../controllers/item-controller");

const itemApi = express.Router();

// Returns all items
itemApi.get("", items.findAll);

// Returns one specific item
itemApi.get("/:name", items.findOne);

// Create a new item
itemApi.post("/create", items.create);

module.exports = itemApi;