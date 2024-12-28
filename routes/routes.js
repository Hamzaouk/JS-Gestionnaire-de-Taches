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

// Afficher toutes les tâches
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch tasks', error });
  }
});

// Mettre à jour une tâche
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { completed } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { completed },
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update task', error });
  }
});

// Supprimer une tâche
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete task', error });
  }
});

module.exports = router;