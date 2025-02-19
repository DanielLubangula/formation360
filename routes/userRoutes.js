const express = require('express');
const Registration = require('../models/Special');
const router = express.Router();
const InscriptionController = require('../controllers/InscriptionController');
const Inscription = require('../models/Inscription');

const authAdmin = (req, res, next) => {
    if (req.session && req.session.admin) {
        return next(); // Continue vers la route demandée
    }
    
    return res.redirect("/home"); // Rediriger si pas connecté
};


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

router.get("/admin",authAdmin, (req, res) => {
    res.render("admin/board")
})

router.get("/api/admin/getusers",authAdmin, InscriptionController.getAllUsers); 

router.get("/connexion/admin", (req, res) => {
    res.render("admin/connexionAdmin", {nabarBool : true, footerBoll : true})
}); 

router.post("/admin/login", InscriptionController.processConnexion); 

// router.delete("/users/delete/:id",authAdmin, async (req, res) => {
//     try {
//         const normal = await Inscription.findById(req.params.id)

//         if (normal){
//             await Inscription.findByIdAndDelete(req.params.id);
//         }else{
//             await Registration.findByIdAndDelete(req.params.id);
//         }
//         res.json({ message: "Utilisateur supprimé avec succès" });
//     } catch (error) {
//         res.status(500).json({ message: "Erreur lors de la suppression de l'utilisateur", error });
//     }
// });

router.delete("/users/delete/:id", authAdmin, async (req, res) => {
    try {
        let user = await Inscription.findById(req.params.id);
        
        if (user) {
            await Inscription.findByIdAndDelete(req.params.id);
        } else {
            user = await Registration.findById(req.params.id);
            if (user) {
                await Registration.findByIdAndDelete(req.params.id);
            } else {
                return res.status(404).json({ message: "Utilisateur introuvable" });
            }
        }

        res.json({ message: "Utilisateur supprimé avec succès" });

    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la suppression de l'utilisateur", error });
    }
});

router.post('/api/register', InscriptionController.registerUser);

router.get('/specialsession', (req, res) => {
    res.render('users/special', {nabarBool : true, footerBoll : true})
})




module.exports = router;