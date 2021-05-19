const express = require("express");
const itemApi = express.Router();

const items = [
    {
        name: "Tollvaktboden",
        url: "bla"
    },
    {
        name: "Skipskranen",
        url: "bla2"
    }
];

// Returns all items
itemApi.get("", (req, res) => {
    res.json(items);
});

// Returns one specific item
itemApi.get("/:name", (req, res) => {
    const name = req.params.name;
    res.json(items.find((item) => item.name.toLowerCase() === name));
});

module.exports = itemApi;