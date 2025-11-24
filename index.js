const express = require("express");
  const cors = require("cors");
  const app = express();
  app.use(cors());
  app.use(express.json());


  let items = []; // Simple in-memory storage


  // GET all items
  app.get("/items", (req, res) => {
    res.json(items);
  });


  // POST a new item
  app.post("/items", (req, res) => {
    const newItem = { id: Date.now(), name: req.body.name };
    items.push(newItem);
    res.status(201).json(newItem);
  });


  // UPDATE an item
  app.patch("/items/:id", (req, res) => {
    const item = items.find((i) => i.id == req.params.id);
    if (item) {
      item.name = req.body.name;
      res.json(item);
    } else {
      res.status(404).json({ message: "Item not found" });
    }
  });


  // DELETE an item
  app.delete("/items/:id", (req, res) => {
    items = items.filter((i) => i.id != req.params.id);
    res.json({ message: "Item deleted" });
  });


  // Start the server
  const PORT = 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));