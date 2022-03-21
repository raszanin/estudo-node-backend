const express = require("express");
const { v4, validate} = require("uuid");

const app = express();

app.use(express.json())

const projects = [];

function logRequests(request, response, next) {
  const { method, url } = request;
  
  const logLabel = `[${method.toUpperCase()}] ${url}`;

  console.log(logLabel)
  console.time(logLabel)

  next(); // proximo middleware

  console.timeEnd(logLabel);
}

function validateProjectId(request, response, next) {
  const { id } = request.params;

  if (!validate(id)) {
    return response.status(400).json({ error: "Invalid project id"})
  }

  return next();
}

app.use(logRequests);
app.use("/projects/:id", validateProjectId);

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

  const project = { id: v4(), title, owner };

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

/**
 * Middleware
 * 
 * Interceptador de requisições que pode interromper totalmente 
 * a requisição ou alterar dados da requisição
 */