const mongoose = require('mongoose');

const EstufaSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  localizacao: {
    type: String,
    required: true
  },
  capacidade: {
    type: Number,
    required: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Estufa', EstufaSchema);