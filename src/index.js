const express = require("express");
const { uuid } = require("uuidv4");

const app = express();

app.use(express.json())

const projects = [];

app.get("/", (request, response) => {
  return response.json({ message: "Hello World"})
})

app.get("/projects", (request, response) => {

  const { title } = request.query;

  const result = title
    ? projects.filter(project => project.title.includes(title))
    : projects

  return response.json(result)
})

app.post("/projects", (request, response) => {

  const { title, owner } = request.body;

  const project = { id: uuid(), title, owner };

  projects.push(project);

  return response.json(project)
})

app.put("/projects/:id", (request, response) => {

  const { id } = request.params;
  const { title, owner } = request.body;

  const projectIndex = projects.findIndex(project => project.id === id);

  if (projectIndex < 0) {
    return response.status(400).json({ erro: "Project not found"})
  }

  const project = {
    id,
    title,
    owner
  }

  projects[projectIndex] = project;

  return response.json(project)
})

app.delete("/projects/:id", (request, response) => {
  
  const { id } = request.params;

  const projectIndex = projects.findIndex(project => project.id === id);

  if (projectIndex < 0) {
    return response.status(400).json({ erro: "Project not found"})
  }

  projects.splice(projectIndex, 1);
  
  return response.status(204).send()
})


app.listen(3333, () => {
  console.log("🚀 Back-end started!")
});

/**
 * Métodos HTTP
 * 
 * GET: Buscar informações do backend
 * POST: Criar uma informação no backend
 * PUT/PATCH: Alterar uma informação no backend
 * DELETE: Deletar uma informação no backend
 * 
 */

/**
 * Tipos de Parametros
 * 
 * Query Params: Filtros e paginação 
 * Route Params: Identificar recursos (Atualizar/Deletar)
 * Request Body: Conteudo na hora de criar ou editar um recurso (JSON)
 * 
 */