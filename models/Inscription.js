const mongoose = require('mongoose');

const InscriptionSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    email: { type: String },
    telephone: { type: String, required: true },
    dateNaissance: { type: Date },
    formation: { type: String, required: true },
    niveau: { type: String, required: true },
    motivation: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Inscription3', InscriptionSchema);
