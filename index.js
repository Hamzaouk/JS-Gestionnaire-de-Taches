// Point d'entrée principal de l'application

const express = require('express');//import de module express
const bodyParser = require('body-parser');//impor de middleware
const taskRoutes = require('./routes/routes');//import des routs
const connectDB = require('./config/db');//etablir la connection a la base de donneé

const app = express();//configurer l'application Express
const PORT = 5000;

app.use(bodyParser.json());//configure un middleware Express pour analyser les données JSON
connectDB();//connexion a mongodb

app.use('/tasks', taskRoutes);//configure un middleware pour gérer toutes les requêtes HTTP

// Lancement le serveur
app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
  });
