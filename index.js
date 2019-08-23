var express = require("express");
var server = express();

server.use(express.json());

let requires = 0;

//Middlewares
//Check if ID exists
function checkID(req, res, next) {
  const { id } = req.params;
  const check = projects.findIndex(x => x.id === id);
  if (check === -1) {
    return res.status(400).json({ error: "ID não existente" });
  }
  return next();
}

//Count numbers of request
server.use((req, res, next) => {
  requires += 1;
  console.log(requires);
  return next();
});

//Examples
let projects = [
  {
    id: "1",
    title: "Primeiro Projeto",
    tasks: []
  },
  {
    id: "2",
    title: "Segundo Projeto",
    tasks: []
  }
];

//List all projects
server.get("/projects", (req, res) => {
  return res.json(projects);
});

//Change Project Title with ID
server.put("/projects/:id", checkID, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  let project = projects.map(project => {
    if (project.id == id) {
      project.title = title;
    }
  });
  return res.json(projects);
});

//Delete Project by ID
server.delete("/projects/:id", checkID, (req, res) => {
  const { id } = req.params;
  projects = projects.filter(project => {
    return project.id != id;
  });
  return res.json(projects);
});

// Add Project
server.post("/projects/", (req, res) => {
  const { id } = req.body;
  const { title } = req.body;

  const newProject = {
    id: id,
    title: title,
    tasks: []
  };
  projects.push(newProject);
  return res.json(projects);
});

//Add tasks
server.post("/projects/:id/task", checkID, (req, res) => {
  const { id } = req.params;
  const { task } = req.body;

  let addTask = projects.map(project => {
    if (project.id == id) {
      project.tasks.push(task);
    }
  });

  return res.json(projects);
});

//Server port: http://localhost:3000
server.listen(3000);
