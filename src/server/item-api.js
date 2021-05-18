const express = require("express");
const itemApi = express.Router();

const items = [
    {
        id: 1,
        url: "bla"
    },
    {
        id: 2,
        url: "bla2"
    }
];

// Returns all items
itemApi.get("", (req, res) => {
    res.json(items);
});

// Returns one specific item
itemApi.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    res.json(items.find((item) => item.id === id));
});

module.exports = itemApi;