const express = require("express");
const bodyParser = require("body-parser");
const db = require("./database");
const app = express();
const port = process.env.PORT || 3000;

//app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.use(function(req, res, next){
  if (req.is('text/*')) {
    req.text = '';
    req.setEncoding('utf8');
    req.on('data', function(chunk){ req.text += chunk });
    req.on('end', next);
  } else {
    next();
  }
});
app.use(express.text());
// ------------------------------------------- TESTING ROUTER -----------------------------------------------
//CREATE
app.post("/create", function (req, res) {
  const query = "INSERT INTO messages (text) VALUES ($1)";
  const values = [req.body.text];
  console.log(values[0]);

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
// -------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------- DEJANSKI ROUTER -----------------------------------------------
// -------------------------------------------------------------------------------------------------------------------

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
  const values = [req.body.naziv, req.body.naslov, req.body.telefon];
  console.log(values);

  
  db.query(query, values, function (err, result) {
    if (err) throw err;
    const message = { id: result.insertId, text: values[0] };
    res.status(200).send(message);
  });
  
});

// delete/restaurant/:id
app.delete("/delete/restaurant/:id", function (req, res) {
  const id = parseInt(req.params.id);
  const query = "DELETE FROM restavracija WHERE rid = $1";
  const values = [id];
  console.log(values);

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

// --------------------------------------------------- USERS ---------------------------------------------------

// /users
app.get("/users", function (req, res) {
  const query = "SELECT * FROM uporabnik";

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

// /user/:id
app.get("/user/:id", function (req, res) {
  const id = parseInt(req.params.id);
  const query = "SELECT * FROM uporabnik WHERE uid = $1";
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

// add/user
app.post("/add/user", function (req, res) {
  const query = "INSERT INTO uporabnik (ime, priimek, telefon, mail) VALUES ($1, $2, $3, $4)";
  const values = [req.body.ime, req.body.priimek, req.body.telefon, req.body.mail];
  console.log(values);

  
  db.query(query, values, function (err, result) {
    if (err) throw err;
    const message = { id: result.insertId, text: values[0] };
    res.status(200).send(message);
  });
});

// /update/user/:id
app.put("/update/user/:id", function (req, res) {
  const id = parseInt(req.params.id);
  const query = "UPDATE uporabnik SET mail = $1 WHERE uid = $2";
  const values = [req.body.mail, id];

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

// delete/user/:id
app.delete("/delete/user/:id", function (req, res) {
  const id = parseInt(req.params.id);
  const query = "DELETE FROM uporabnik WHERE uid = $1";
  const values = [id];
  console.log(values);

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


// --------------------------------------------------- TABLES ---------------------------------------------------

// /tables
app.get("/tables", function (req, res) {
  const query = "SELECT * FROM miza";

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

// /table/:id
app.get("/table/:id", function (req, res) {
  const id = parseInt(req.params.id);
  const query = "SELECT * FROM miza WHERE mid = $1";
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

// add/table
app.post("/add/table", function (req, res) {
  const query = "INSERT INTO miza (rid, st_mize, st_stolov) VALUES ($1, $2, $3)";
  const values = [req.body.rid, req.body.st_mize, req.body.st_stolov];
  console.log(values);

  
  db.query(query, values, function (err, result) {
    if (err) throw err;
    const message = { id: result.insertId, text: values[0] };
    res.status(200).send(message);
  });
  
});

// delete/table/:id
app.delete("/delete/table/:id", function (req, res) {
  const id = parseInt(req.params.id);
  const query = "DELETE FROM miza WHERE mid = $1";
  const values = [id];
  console.log(values);

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

// --------------------------------------------------- RESERVATION ---------------------------------------------------
// /reservations
app.get("/reservations", function (req, res) {
  const query = "SELECT * FROM rezervacija";

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

// /reservation/:id
app.get("/reservation/:id", function (req, res) {
  const id = parseInt(req.params.id);
  const query = "SELECT * FROM rezervacija WHERE uid = $1";
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

// add/reservation
app.post("/add/reservation", function (req, res) {
  const query = "INSERT INTO rezervacija (datum, status, uid, mid) VALUES ($1, $2, $3, $4)";
  const values = [req.body.datum, req.body.status, req.body.uid, req.body.mid];
  console.log(values);

  
  db.query(query, values, function (err, result) {
    if (err) throw err;
    const message = { id: result.insertId, text: values[0] };
    res.status(200).send(message);
  });
});

// /update/reservation/:id
app.put("/update/reservation/:id", function (req, res) {
  const id = parseInt(req.params.id);
  const query = "UPDATE rezervacija SET status = $1 WHERE uid = $2";
  const values = [req.body.status, id];

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

// delete/reservation/:id
app.delete("/delete/reservation/:id", function (req, res) {
  const id = parseInt(req.params.id);
  const query = "DELETE FROM rezervacija WHERE uid = $1";
  const values = [id];
  console.log(values);

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

app.listen(port, () => console.log(`Running server on port ${port}`));
