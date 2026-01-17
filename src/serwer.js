const mysql = require("mysql2");
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "sklep_motocyklowy",
});

app.use("/images", express.static("public/images"));

db.connect((err) => {
  if (err) {
    console.error("Błąd połączenia: ", err);
    return;
  }
  console.log("połączono z mysql");
});

const PORT = 3001;
app.get("/", (req, res) => {
  res.send("serwer działa");
});

app.listen(PORT, () => {
  console.log(`Serwer działa na http://localhost:${PORT}`);
});

app.get("/oferta", (req, res) => {
  const sql = "SELECT * FROM oferta";

  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Błąd bazy danych");
      return;
    }
    res.json(results);
  });
});

app.get("/oferta/:id", (req, res) => {
  const { id } = req.params;

  db.query("SELECT * FROM oferta WHERE IDoferty = ?", [id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result[0]);
  });
});

app.get("/news", (req, res) => {
  const sql = "SELECT * FROM news";

  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Błąd bazy danych");
      return;
    }
    res.json(results);
  });
});

app.get("/news/:id", (req, res) => {
  const { id } = req.params;

  db.query("SELECT * FROM news WHERE IDnews = ?", [id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result[0]);
  });
});

app.get("/czesci", (req, res) => {
  const sql = "SELECT * FROM czesci";

  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Błąd bazy danych");
      return;
    }
    res.json(results);
  });
});

app.get("/czesci/:id", (req, res) => {
  const { id } = req.params;

  db.query("SELECT * FROM czesci WHERE IDczesci = ?", [id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result[0]);
  });
});

app.post("/oferta", (req, res) => {
  const {
    marka,
    model,
    przebieg,
    pojemnosc_skokowa,
    moc,
    cena,
    image_path,
    nadwozie,
    skrzynia,
    opis,
    typ_silnika,
    naped,
    rok_produkcji,
    stan,
    negocjacja,
    rodzaj_paliwa,
  } = req.body;

  const sql = `
    INSERT INTO oferta
    (marka, model, przebieg, pojemnosc_skokowa, moc, cena, image_path, nadwozie, skrzynia, opis, typ_silnika, naped, rok_produkcji, stan, negocjacja, rodzaj_paliwa)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      marka,
      model,
      przebieg,
      pojemnosc_skokowa,
      moc,
      cena,
      image_path,
      nadwozie,
      skrzynia,
      opis,
      typ_silnika,
      naped,
      rok_produkcji,
      stan,
      negocjacja,
      rodzaj_paliwa,
    ],
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json(err);
      }
      res.json({ message: "motocykl dodany" });
    }
  );
});
