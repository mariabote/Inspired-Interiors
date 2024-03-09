const cors = require("cors");
const express = require("express");
const path = require('path');


const mysql = require('mysql2/promise');
require('dotenv').config();



const app = express();
const port = 3000;

app.use(cors());
app.use(express.json({ limit: "25mb" }));
// app.set('view engine', 'ejs');


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




app.listen(port, () => {
  console.log(`Servidor iniciado escuchando en http://localhost:${port}`);
});


// DEFINIR ENDPOINTS

// Crear proyectos
app.post(`/api/projectCard`, async (req, res) => {

  //  Datos vienen req.body

//   console.log('Ha llamado al POST!');
//   console.log(req.body);

//   // 1. Conectar a la bbdd

   const conn = await getConnection();

//   // 2. Insertar los datos de la autora  Authors

   const insertAuthor = `
   INSERT authors (autor, job, image)
     VALUES (?, ?, ?)`;

  const [resultsInsertAuthor] = await conn.execute(
    insertAuthor,
     [req.body.autor, req.body.job, req.body.image]);

//   // 3. Recupero el id de Authors

//   console.log(resultsInsertAuthor.insertId);

  const fkAuthor = resultsInsertAuthor.insertId;

//   // 4. Insertar el proyecto Projects(fkAuthors)

  const insertProject = `
   INSERT projects (name, slogan, repo, demo, technologies, \`desc\`, photo, fkAuthor)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?);`;

  const [resultsInsertProject] = await conn.execute(
     insertProject,
    [req.body.name, req.body.slogan, req.body.repo, req.body.demo, req.body.technologies, req.body.desc, req.body.photo, fkAuthor]
   );

//   // 5. Recupero el id de Projects

   const idProject = resultsInsertProject.insertId

//   // 6. Cierro al conexion

   conn.end();

//   // 7. Devuelvo el json

   res.json({
     success: true,
     cardURL: `http://localhost:${port}/projectCard/${idProject}`
   });

 });


app.get("/", function (req, res) {
  res.send("Hello World!");
});

app.get("*", function (req, res) {
  res.status(404).send("Página no encontrada");
});




