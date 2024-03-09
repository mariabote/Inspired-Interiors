const cors = require("cors");
const express = require("express");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json({ limit: "25mb" }));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.get("/", function (req, res) {
  res.send("Hello World!");
});

app.get("*", function (req, res) {
  res.status(404).send("Página no encontrada");
});

const mysql = require("mysql2/promise");

async function getConnection() {
  const connection = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_SCHEMA,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
  });
  await connection.connect();

  console.log(
    `Conexión establecida con la base de datos (identificador=${connection.threadId})`
  );

  return connection;
}
