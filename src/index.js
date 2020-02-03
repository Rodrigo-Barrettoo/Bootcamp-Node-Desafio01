const express = require('express');

const server = express();

server.use(express.json());

const projects = []

server.get('/projects', (req, res) => {
  return res.json(projects);
});

server.post('/projects', (req, res) => {
  const { id, title } = req.body;

  const project = {
    id,
    title,
    tasks: []
  }

  projects.push(project)

  return res.status(200).json(projects)
});

server.post('/projects/:id/tasks', (req, res) => {
  const { id } = req.params
  const { task } = req.body;


  const project = projects.find(project => project.id == id);

  project.tasks.push(task);

  return res.json(project);
});


server.listen(3000);
