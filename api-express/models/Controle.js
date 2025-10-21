const mongoose = require("mongoose");

const ControleSchema = new mongoose.Schema({
  tipo: {
    type: String,
    required: true
  },
  estufa: {
    type: String, // substitui a referência ao model Estufa
    required: false
  },
  sensores: [{
    type: String // substitui as referências ao model Sensor
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Controle', ControleSchema);
