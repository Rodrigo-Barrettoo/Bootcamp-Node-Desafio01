const express = require('express');

const server = express();

server.use(express.json());

const projects = [];

/**
 * Middleware Global
 * Count Requests
 */
server.use((req, res, next) => {
  console.count('Request');
  
  next();

});

/**
 * Middleware for Routes
 * Routes with id
 */
function checkProjectsExists(req, res, next) {
  const { id } = req.params;
  const project = projects.find(project => project.id == id);

  if (!project) {
    return res.status(400).json({ error: 'Project does not exists'});
  }
  
  next();
};

server.get('/projects', (req, res) => {
  return res.json(projects);
});

server.post('/projects', (req, res) => {
  const { id, title } = req.body;

  const project = {
    id,
    title,
    tasks: [],
  };

  projects.push(project);

  return res.status(200).json(projects);
});

server.post('/projects/:id/tasks', checkProjectsExists, (req, res) => {
  const { id } = req.params;
  const { task } = req.body;
  const project = projects.find(project => project.id == id);

  project.tasks.push(task);

  return res.json(project);
});

server.put('/projects/:id/', checkProjectsExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const project = projects.find(project => project.id == id);

  project.title = title;

  return res.json(project);
});

server.delete('/projects/:id/', checkProjectsExists, (req, res) => { 
  const { id } = req.params;
  
  const project = projects.findIndex(project => project.id == id);

  projects.splice(project, 1);

  return res.send('Deletado');
});


server.listen(3000);
