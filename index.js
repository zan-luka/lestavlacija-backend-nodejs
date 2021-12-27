const express = require("express");
const db = require("./database");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
// ------------------------------------------- TESTING ROUTER -----------------------------------------------
//CREATE
app.post("/create", function (req, res) {
  const query = "INSERT INTO messages (text) VALUES ($1)";
  const values = [req.body.text];

  db.query(query, values, function (err, result) {
    if (err) throw err;
    const message = { id: result.insertId, text: values[0] };
    res.status(200).send(message);
  });
});

//READ
app.get("/test", function (req, res) {
  const query = "SELECT * FROM messages";

  console.log("ok");
  db.query(query, function (err, result) {
    try {
      if (err) throw err;
      const messages = result.rows;
      res.status(200).send(messages);
    } catch (e){
      console.log(e.toString());
    }
  });
});

app.get("/kys/:id", function (req, res) {
  const id = parseInt(req.params.id);
  const query = "SELECT * FROM messages WHERE id = $1";
  const values = [id];

  db.query(query, values, function (err, result) {
    if (err) throw err;
    const found = result.rows;

    if (found.length > 0) {
      res.status(200).send(found);
    } else {
      res.status(404).send({ msg: `No message with id ${id} found!` });
    }
  });
});

//UPDATE
app.put("ubise/:id", function (req, res) {
  const id = parseInt(req.params.id);
  const query = "UPDATE messages SET text = $1 WHERE id = $2";
  const values = [req.body.text, id];

  db.query(query, values, function (err, result) {
    if (err) throw err;
    const updated = [{ id: values[1], message: values[0] }];

    if (result.rowCount === 0)
      return res
        .status(404)
        .send({ msg: `No message with id ${values[1]} found!` });

    res.status(200).send(updated);
  });
});

//DELETE
app.delete("garbage/:id", function (req, res) {
  const id = parseInt(req.params.id);
  const query = "DELETE FROM messages WHERE id = $1";
  const values = [id];

  db.query(query, values, function (err, result) {
    if (err) throw err;
    const deleted = [{ id: values[0] }];

    if (result.rowCount === 0)
      return res
        .status(404)
        .send({ msg: `No message with id ${values[0]} found!` });

    res.status(200).send(deleted);
  });
});

// --------------------------------------------------- DEJANSKI ROUTER -----------------------------------------------
// --------------------------------------------------- RESTAURANTS ---------------------------------------------------

// /restaurants
app.get("/restaurants", function (req, res) {
  const query = "SELECT * FROM restavracija";

  db.query(query, function (err, result) {
    try {
      if (err) throw err;
      const messages = result.rows;
      res.status(200).send(messages);
    } catch (e){
      console.log(e.toString());
    }
  });
});

// /restaurant/:id
app.get("/restaurant/:id", function (req, res) {
  const id = parseInt(req.params.id);
  const query = "SELECT * FROM restavracija WHERE rid = $1";
  const values = [id];

  db.query(query, values, function (err, result) {
    if (err) throw err;
    const found = result.rows;

    if (found.length > 0) {
      res.status(200).send(found);
    } else {
      res.status(404).send({ msg: `No message with id ${id} found!` });
    }
  });
});

// add/restaurant
app.post("/add/restaurant", function (req, res) {
  const query = "INSERT INTO restavracija (naziv, naslov, telefon) VALUES ($1, $2, $3)";
  const values = [req.body.text];

  db.query(query, values, function (err, result) {
    if (err) throw err;
    const message = { id: result.insertId, text: values[0] };
    res.status(200).send(message);
  });
});

app.listen(port, () => console.log(`Running server on port ${port}`));
