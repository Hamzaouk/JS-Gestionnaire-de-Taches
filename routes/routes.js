// Fichier de Routes pour les opérations CRUD

const express = require('express');
const Task = require('../models/task');

const router = express.Router();//new object

// add task
router.post('/', async (req, res) => {
  try {
    const { title } = req.body; //send  infos 
    if (!title) {
      return res.status(400).json({ message: 'Le titre et la description obligatoires.'});
    }
    const newTask = new Task({ title, description}); //creation new instance
    await newTask.save(); //save task in mongodb
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
});

module.exports = router;