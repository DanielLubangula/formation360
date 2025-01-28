const express = require('express');
const router = express.Router();
const InscriptionController = require('../controllers/InscriptionController');
const Inscription = require('../models/Inscription');

router.get("/all", async (req, res) => {
    const inscriptions = await Inscription.find();
    res.json(inscriptions);
})

// Route pour la vue handlebars du fichier home
router.get('/home', (req, res) => {
    res.render('users/home');
});

// Route pour la vue handlebars du fichier about
router.get('/about', (req, res) => {
    res.render('users/about');
});

// Route pour la vue handlebars du fichier javascript
router.get('/javascript', (req, res) => {
    res.render('users/javascript');
});
 
// Route pour la vue handlebars du fichier word
router.get('/word', (req, res) => {
    res.render('users/word');
});

// Route pour la vue handlebars du fichier photoshop
router.get('/photoshop', (req, res) => {
    res.render('users/photoshop');
});

// Route pour la vue handlebars du fichier excel
router.get('/excel', (req, res) => {
    res.render('users/excel');
});

// Route pour la vue handlebars du fichier programmationWeb
router.get('/programmationWeb', (req, res) => {
    res.render('users/programmationWeb');
});

// Route pour la vue handlebars du fichier maintenaceInformatique
router.get('/maintenace', (req, res) => {
    res.render('users/maintenace');
});

router.post("/api/inscription", InscriptionController.Inscription);

module.exports = router;