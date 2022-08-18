const { Router } = require("express");
const dataHandler = require("../dataHandler");

const api = new Router();

api.use("/:name", (req, res, next) => {
  const name = req.params.name;
  dataHandler.readKittens((err, kittens) => {
    if (err) {
      return next(err);
    }

    const cat = kittens.find((c) => c.name === name);

    if (!cat) {
      return res.status(404).end();
    }

    req.cat = cat;
    next();
  });
});

api.get("/", (req, res) => {
  dataHandler.readKittens((err, kittens) => {
    if (err) {
      return next(err);
    }
    console.log(JSON.stringify(kittens, null, 2));
    res.json(kittens);
  });
});

api.get("/:name", (req, res) => {
  res.json(req.cat);
});

api.post("/", (req, res, next) => {
  const cat = req.body;
  dataHandler.addKitten(cat, (err) => {
    if (err) {
      return next(err);
    }
    res.status(201).end();
  });
});

api.put("/:name", (req, res, next) => {
  const updatedCat = {
    ...req.cat,
    ...req.body,
  };

  dataHandler.readKittens((err, kittens) => {
    if (err) {
      return next(err);
    }

    const nextKittens = kittens.map((c) => {
      if (c.name !== req.cat.name) {
        return c;
      }

      return updatedCat;
    });

    dataHandler.writeKittens(nextKittens, (err) => {
      if (err) {
        return next(err);
      }

      return res.status(200).end();
    });
  });
});

api.delete("/:name", (req, res) => {
  dataHandler.readKittens((err, kittens) => {
    if (err) {
      return next(err);
    }

    const nextKittens = kittens.filter((c) => c.name !== req.cat.name);
    dataHandler.writeKittens(nextKittens, (err) => {
      if (err) {
        return next(err);
      }

      res.status(200).end();
    });
  });
});

module.exports = api;
