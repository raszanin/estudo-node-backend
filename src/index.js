const express = require("express");

const app = express();

app.use(express.json())

app.get("/", (request, response) => {
  return response.json({ message: "Hello World"})
})

app.get("/projects", (request, response) => {

  const { title, owner} = request.query;

  console.log(title);
  console.log(owner);

  return response.json([
    "Projeto 1",
    "Projeto 2"
  ])
})

app.post("/projects", (request, response) => {

  const { title, owner}  = request.body;

  return response.json({ title, owner })
})

app.put("/projects/:id", (request, response) => {

  const { id } = request.params;

  console.log(id)

  return response.json([
    "Projeto 1",
    "Projeto 2",
    "Projeto 4"
  ])
})

app.delete("/projects/:id", (request, response) => {
  return response.json([
    "Projeto 2",
    "Projeto 4"
  ])
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