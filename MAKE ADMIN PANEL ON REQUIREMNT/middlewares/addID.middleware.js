const fs=require("fs")

const addID = (req, res, next) => {
  fs.readFile("./db.json", "utf-8", (err, data) => {
    if (err) return res.status(500).send({ message: "Error reading database" });
    const heroes = JSON.parse(data);
    const lastHero = heroes[heroes.length - 1];
    req.body.id = lastHero ? lastHero.id + 1 : 1; // Assign a new id
    next();
  });

};

module.exports = {
  addID,
};

//+1
