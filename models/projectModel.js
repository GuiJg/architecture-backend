const mongoose = require('mongoose');
const Scheema = mongoose.Schema;

const projectScheema = new Scheema(
    {
        name: String,
        description: String,
        category: String,
        image: String,
        url: String,
        price: Number,
    }, 
    {
        timestamps: true
    }
)

const ProjectModel = mongoose.model('projects', projectScheema);

module.exports = ProjectModel