const cors = require('cors');
const express = require('express');
const path = require('path');

const mysql = require('mysql2/promise');
require('dotenv').config();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json({ limit: '25mb' }));
app.set('view engine', 'ejs');

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

// Listar proyectos (GET)

app.get(`/api/projectCard`, async (req, res) => {
  const conn = await getConnection();

  const selectProjects = `
SELECT *
FROM autor a
JOIN proyecto p 
ON (a.idautor = p.fkautor)`;

  // const selectProjects = `
  // SELECT *
  //   FROM autor a
  //     JOIN proyecto p ON (a.idautor = p.fkautor)
  //   WHERE p.idproyecto != null;
  //   `;

  const [results] = await conn.query(selectProjects, [req.params.id]);

  conn.end();

  // SELECT listar todos los proyectos  <- JOIN

  res.json({
    success: true,
    cardURL: `http://localhost:${port}/projectCard`,
    projectCard: results,
  }); // -> dataResponse en React (fetch cd carga la pagina del listado)
});

// Crear proyectos (POST)

app.post(`/api/projectCard`, async (req, res) => {
  if (req.body.autor === '' || req.body.job === '' || req.body.photo === '') {
    res.json({
      success: false,
      error: 'Todos los campos de la autora son obligatorios',
    });

    return;
  }
  if (
    req.body.name === '' ||
    req.body.slogan === '' ||
    req.body.technologies === '' ||
    req.body.image === '' ||
    req.body.demo === '' ||
    req.body.repo === ''
  ) {
    res.json({
      success: false,
      error: 'Todos los campos del proyecto son obligatorios',
    });
    return;
  }

  const conn = await getConnection();

  const insertAutor = `
  INSERT autor (autor, job, photo)
    VALUES (?, ?, ?)`;

  const [resultsInsertAutor] = await conn.execute(insertAutor, [
    req.body.autor,
    req.body.job,
    req.body.photo,
  ]);

  // INSERT -> autor  <- req.body.autor, req.body.job,

  // result.insertId

  console.log(resultsInsertAutor.insertId);

  const fkAutor = resultsInsertAutor.insertId;

  const insertProject = `
  INSERT proyecto (name, slogan, repo, demo, technologies, \`desc\`, image, fkAutor)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?);`;

  const [resultsInsertProject] = await conn.execute(insertProject, [
    req.body.name,
    req.body.slogan,
    req.body.repo,
    req.body.demo,
    req.body.technologies,
    req.body.desc,
    req.body.image,
    fkAutor,
  ]);

  const idProject = resultsInsertProject.insertId;

  // INSERT -> project (name, slogan.... result.insertId)

  // result.insertId -> idProject

  conn.end();

  res.json({
    success: true,
    cardURL: `http://localhost${port}/projectCard/${idProject}`,
  }); // -> dataResponse en React (fetch que lanza cd hacemos click en el botn de form)
});

// Mostar HTML de una tarjeta

app.get('/projectCard/:id', async (req, res) => {
  const conn = await getConnection();
  const selectProjects = `
  SELECT *
    FROM autor a
      JOIN proyecto p ON (a.idautor = p.fkautor)
    WHERE p.idproyecto = ?;
    `;

  const [results] = await conn.query(selectProjects, [req.params.id]);

  conn.end();

  const data = results[0];

  res.render('detail', data);
});

app.get('*', function (req, res) {
  res.status(404).send('Página no encontrada');
});
