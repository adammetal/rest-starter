const fs = require("fs");
const path = require("path");

const kitensDb = path.join(__dirname, "kitens.json");

const init = (callback) => {
  fs.access(kitensDb, fs.constants.F_OK, (error) => {
    if (!error) {
      callback(null, false);
      return;
    }

    const content = JSON.stringify({ kittens: [] });
    fs.writeFile(kitensDb, content, (err) => {
      callback(err, true);
    });
  });
};

const readKittens = (callback) => {
  fs.readFile(kitensDb, { encoding: "utf-8" }, (err, data) => {
    if (err) {
      callback(err, null);
      return;
    }
    const db = JSON.parse(data);
    const kittens = db.kittens;
    callback(null, kittens);
  });
};

const writeKittens = (kittens, callback) => {
  const data = JSON.stringify({ kittens: kittens });
  fs.writeFile(kitensDb, data, (err) => {
    callback(err);
  });
};

const addKitten = (cat, callback) => {
  readKittens((err, kittens) => {
    if (err) {
      callback(err);
      return;
    }

    kittens.push(cat);
    writeKittens(kittens, callback);
  })
}

module.exports = {
  init,
  readKittens,
  writeKittens,
  addKitten
};
