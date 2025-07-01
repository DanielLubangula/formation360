// Importation des modules nécessaires
require('dotenv').config(); // Charger les variables d'environnement
const express = require("express");
const { engine } = require("express-handlebars");
const mongoose = require("mongoose");
const path = require('path');
const bodyParser = require("body-parser");
const session = require("express-session");
const cors = require("cors");
const handlebars = require('handlebars');
const route = require('./routes/userRoutes');
const db = require("./config/db");
const app = express();

// Configuration de la session pour Express
const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET, // Récupéré depuis .env
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, // 1 jour
    httpOnly: true, // Sécurise le cookie
  },
});
app.use(sessionMiddleware);


// Initialisation de l'application
const http = require('http').createServer(app); // Création d'un serveur HTTP
const io = require("socket.io")(http); // Intégration de Socket.io avec le serveur HTTP

// Configuration du moteur de templates Handlebars
app.engine(
  "handlebars",
  engine({
    handlebars: handlebars, // Utilise l'instance Handlebars avec les helpers
  })
);
app.set("view engine", "handlebars");

// Enregistrement d'un helper Handlebars pour les objets JSON
handlebars.registerHelper("eq", (a, b) => a === b);
handlebars.registerHelper('json', (context) => JSON.stringify(context));

// Middleware global
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("uploads"));
app.use(express.static("public"));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());


// Passez la session middleware à Socket.IO
io.use((socket, next) => {
  sessionMiddleware(socket.request, {}, next);
});

app.use((req, res, next) => {
  res.locals.vendor = req.session.vendor || null;
  res.locals.admin = req.session.admin || null;
  next();
});


// Connexion à la base de données MongoDB
db.connect();

app.get("/", (req, res) => {
  res.redirect('/home')
})

// Routes principales
app.use("/", route); 

// Configuration de Socket.io
//require('./socket/socket')(io);

// initialisation de l'admin
//require("./config/initAdmin")()

const corsOrigins = process.env.CORS_ORIGIN.split(',');
app.use(cors({
  origin: corsOrigins, 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Ajouter les méthodes nécessaires
  credentials: true, // Si vous utilisez des cookies ou des sessions
})); 

// Démarrage du serveur
const PORT = process.env.PORT || 3500;
http.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));
