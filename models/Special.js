const mongoose = require('mongoose');

const RegistrationSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String }, // Non requis et non unique
  phone: { type: String, required: true },
  timeSlot: { type: String, required: true }
});

module.exports = mongoose.model('Registration', RegistrationSchema);
