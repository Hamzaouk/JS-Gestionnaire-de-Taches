// Fichier de modèle Mongoose pour les tâches

const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title : {
        type: String,
        required: true
    },
    description : {
        type: String,
        required: false
    },
    status : {
        type: Boolean,
        default: false
    },
},   { timestamps : true}); //time that created and updated at

module.exports = mongoose.model('task', taskSchema);