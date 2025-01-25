const express = require("express");
const fs = require("fs");
const port = 2000

const { logger } = require("./middlewares/logger.middleware");
const { addID } = require("./middlewares/addID.middleware");
const { auth } = require("./middlewares/auth.middleware");


const app = express();

app.use(express.json());
app.use(logger); // Global logger middleware

// Get all heroes
app.get("/heroes", (req, res) => {
  fs.readFile("./db.json", "utf-8", (err, data) => {
    if (err) res.status(500).send({ message: "Error reading database" });
    else res.send(JSON.parse(data));
  });
});

// Add a new hero
app.post("/add/hero", addID, (req, res) => {
  fs.readFile("./db.json", "utf-8", (err, data) => {
    if (err) return res.status(500).send({ message: "Error reading database" });

    let heroes;
    try {
      heroes = JSON.parse(data);
      if (!Array.isArray(heroes)) throw new Error("Invalid data format");
    } catch (parseError) {
      heroes = [];
    }

    heroes.push(req.body);

    fs.writeFile("./db.json", JSON.stringify(heroes, null, 2), (err) => {
      if (err) res.status(500).send({ message: "Error writing to database" });
      else res.send(heroes); // Return updated heroes
    });
  });
});

// Update a villain for a specific hero
app.patch("/update/villain/:hero_id", auth, (req, res) => {
  const { hero_id } = req.params;
  const newVillain = req.body;

  fs.readFile("./db.json", "utf-8", (err, data) => {
    if (err) return res.status(500).send({ message: "Error reading database" });

    let heroes;
    try {
      heroes = JSON.parse(data);
    } catch (parseError) {
      return res.status(500).send({ message: "Error parsing database" });
    }

    const hero = heroes.find((h) => h.id === parseInt(hero_id));
    if (!hero) return res.status(404).send({ message: "Hero not found" });

    if (!hero.villains) hero.villains = [];
    hero.villains.push(newVillain);

    fs.writeFile("./db.json", JSON.stringify(heroes, null, 2), (err) => {
      if (err) res.status(500).send({ message: "Error writing to database" });
      else res.send(hero); // Return updated hero
    });
  });
});

// Delete a hero
app.delete("/delete/hero/:hero_id", auth, (req, res) => {
  const { hero_id } = req.params;

  fs.readFile("./db.json", "utf-8", (err, data) => {
    if (err) return res.status(500).send({ message: "Error reading database" });

    let heroes;
    try {
      heroes = JSON.parse(data);
    } catch (parseError) {
      return res.status(500).send({ message: "Error parsing database" });
    }

    const updatedHeroes = heroes.filter((h) => h.id !== parseInt(hero_id));

    if (updatedHeroes.length === heroes.length) {
      return res.status(404).send({ message: "Hero not found" });
    }

    fs.writeFile("./db.json", JSON.stringify(updatedHeroes, null, 2), (err) => {
      if (err) res.status(500).send({ message: "Error writing to database" });
      else res.send(updatedHeroes); // Return remaining heroes
    });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
