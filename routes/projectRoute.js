const express = require('express');
const Route = express.Router();
const ProjectController = require('../controllers/projectController');
const { getAllProjects, getProjectsById, createProject, updateProject, deleteProject } = ProjectController;

// Ler todos os projetos 
Route.get('/', getAllProjects);

// Ler um projeto pelo ID                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
Route.get('/:id', getProjectsById);

// Criar um novo projeto
Route.post('/', createProject);

// Atualizar um projeto
Route.put('/:id', updateProject);

// Deletar um projeto
Route.delete('/:id', deleteProject);

module.exports = Route