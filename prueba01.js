// IMPORTAR BIBLIOTECAS

const express = require('express');
const cors = require('cors');
const path = require('path');

const mysql = require('mysql2/promise');
require('dotenv').config();


// CREAR VARIABLES

const app = express();
const port = 4000;

// CONFIGURACIÓN

app.use(cors());
app.use(express.json({limit: '25mb'}));
app.set('view engine', 'ejs');


// CONFIGURACIÓN DE MYSQL

async function getConnection() {

  const connection = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_SCHEMA
  });

  await connection.connect();

  console.log(
    `Conexión establecida con la base de datos (identificador=${connection.threadId})`
  );

  return connection;
}


// ARRANCAR

app.listen(port, () => {
  console.log(`Servidor iniciado escuchando en http://localhost:${port}`);
});


// DEFINIR ENDPOINTS

// Crear proyectos
app.post('/api/projectCard', async (req, res) => {

  // Datos vienen req.body

  console.log('Ha llamado al POST!');
  console.log(req.body);

  // 1. Conectar a la bbdd

  const conn = await getConnection();

  // 2. Insertar los datos de la autora  Authors

  const insertAuthor = `
  INSERT authors (autor, job, image)
    VALUES (?, ?, ?)`;

  const [resultsInsertAuthor] = await conn.execute(
    insertAuthor,
    [req.body.autor, req.body.job, req.body.image]);

  // 3. Recupero el id de Authors

  console.log(resultsInsertAuthor.insertId);

  const fkAuthor = resultsInsertAuthor.insertId;

  // 4. Insertar el proyecto Projects(fkAuthors)

  const insertProject = `
  INSERT projects (name, slogan, repo, demo, technologies, \`desc\`, photo, fkAuthor)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?);`;

  const [resultsInsertProject] = await conn.execute(
    insertProject,
    [req.body.name, req.body.slogan, req.body.repo, req.body.demo, req.body.technologies, req.body.desc, req.body.photo, fkAuthor]
  );

  // 5. Recupero el id de Projects

  const idProject = resultsInsertProject.insertId

  // 6. Cierro al conexion

  conn.end();

  // 7. Devuelvo el json

  res.json({
    success: true,
    cardURL: `http://localhost:${port}/projectCard/${idProject}`
  });

});


// API listar proyectos
app.get('/api/proyectCard', (req, res) => {

  // 1. Conectar a la bbdd
  // 2. Lanzar un SELECT para recuperar todos los proy de la bbdd
  // 3. Cierro la conexión
  // 4. Devuelvo un json con los resultados.

});



// Mostrar el detalle de un proyecto (serv. dinámicos)
app.get('/projectCard/:id', async (req, res) => {

  // Recibo el id del proyecto en un URL param

  // 1. Conectar a la bbdd

  const conn = await getConnection()

  // 2. Lanzar un SELECT para recuperar 1 proyecto con el id <- req.params

  const selectProjects = `
  SELECT *
    FROM authors a
      JOIN projects p ON (a.idAuthor = p.fkAuthor)
    WHERE p.idProject = ?;
  `;

  const [results] = await conn.query(selectProjects, [req.params.id]);

  // 3. Hago un template (EJS)
  // 4. Cierro la conexión

  conn.end();

  // 5. res.render('plantilla', resultado)

  const data = results[0];

  res.render('detail', data);

});



// DEFINIR SERVIDORES ESTÁTICOS

const staticServerPathWeb = '../public'; // En esta carpeta (en la raíz del proy) ponemos los ficheros estáticos
app.use(express.static(path.join(__dirname, staticServerPathWeb)));