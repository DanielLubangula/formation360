const axios = require('axios'); // Importation du module Axios
const Inscription = require('../models/Inscription');

exports.Inscription = async (req, res) => {
    const { nom, prenom, email, telephone, dateNaissance, formation, niveau, motivation } = req.body;

    // Validation des champs obligatoires
    if (!nom || !prenom || !email || !telephone || !formation || !niveau) {
        return res.status(400).json({ error: 'Tous les champs marqués avec * sont obligatoires.' });
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Adresse email invalide.' });
    }

    // Validation du téléphone
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(telephone)) {
        return res.status(400).json({ error: 'Numéro de téléphone invalide.' });
    }

    try {
        // Création de l'inscription
        const newInscription = new Inscription({
            nom,
            prenom,
            email,
            telephone,
            dateNaissance,
            formation,
            niveau,
            motivation
        });

        await newInscription.save();

        // Envoyer un email via Formspree
        const formspreeEndpoint = 'https://formspree.io/f/xdkagzvw'; // Remplace par ton URL Formspree

        const emailBody = {
            nom,
            prenom,
            email,
            telephone,
            dateNaissance,
            formation,
            niveau,
            motivation,
            message: `Une nouvelle inscription a été effectuée par ${nom} ${prenom}. Voici les détails :
            - Nom : ${nom}
            - Prénom : ${prenom}
            - Email : ${email}
            - Téléphone : ${telephone}
            - Date de naissance : ${dateNaissance || "Non précisée"}
            - Formation : ${formation}
            - Niveau : ${niveau}
            - Motivation : ${motivation || "Non précisée"}`
        };

        await axios.post(formspreeEndpoint, emailBody, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        res.status(201).json({ message: 'Inscription enregistrée avec succès et email envoyé.' });
    } catch (error) {
        // Gestion spécifique de l'erreur de duplication
        if (error.code === 11000) {
            return res.status(409).json({ error: `L'adresse email "${email}" est déjà utilisée.` });
        }

        console.error('Erreur lors de l\'enregistrement :', error);
        res.status(500).json({ error: 'Erreur interne du serveur.' });
    }
};
