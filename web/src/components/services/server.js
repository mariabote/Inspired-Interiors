// Fichero src/services/api.js
const getProjects = () => {
  // Llamamos a la API
  return fetch("http://localhost:3000/api/projectCard") // Este 5 es el id de Leia Skywalker
    .then((response) => response.json())
    .then((response) => {
      return response.projectCard;
    });
};

export default getProjects;
