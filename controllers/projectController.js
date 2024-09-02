const asyncHandler = require('express-async-handler');
const ProjectModel = require('../models/projectModel');

const getAllProjects = asyncHandler(async (req, res) => {
    try {
        const projects = await ProjectModel.find();
        res.status(200).json(projects);
    } catch (error) {
        res.status(400)
        throw new Error(error)
    }
})

const getProjectsById = asyncHandler(async (req, res) => {
    try {
        const project = await ProjectModel.findById(req.params.id);
        res.status(200).json(project);
    } catch (error) {
        res.status(400)
        throw new Error(error)
    }
})

const createProject = asyncHandler(async (req, res) => {
    try {
        const project = await ProjectModel.create(req.body);
        res.status(200).json(project);
    } catch (error) {
        res.status(400)
        throw new Error(error)
    }
})

const updateProject = asyncHandler(async (req, res) => {
    try {
        const project = await ProjectModel.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(200).json(project);
    } catch (error) {
        res.status(400)
        throw new Error(error)
    }
})

const deleteProject = asyncHandler(async (req, res) => {
    try {
        const project = await ProjectModel.findByIdAndDelete(req.params.id);
        res.status(200).json(project);
    } catch (error) {
        res.status(400)
        throw new Error(error)
    }
})

module.exports = {
    getAllProjects,
    getProjectsById,
    createProject,
    updateProject,
    deleteProject
}