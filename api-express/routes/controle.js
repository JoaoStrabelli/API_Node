var express = require('express');
const Controle = require('../models/Controle');
const { default: mongoose } = require('mongoose');
var router = express.Router();

// Obter todos os controles
router.get('/', async (req, res) => {
  try {
    const controles = await Controle.find().populate('estufa').populate('sensores');
    res.json(controles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Obter controle por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ message: 'ID inválido' });

  const controle = await Controle.findById(id).populate('estufa').populate('sensores');
  return controle
    ? res.json(controle)
    : res.status(404).json({ message: 'Controle não encontrado' });
});

// Criar controle
router.post('/', async (req, res) => {
  const controle = new Controle(req.body);

  const erros = controle.validateSync();
  if (erros) return res.status(400).json(erros);

  try {
    res.status(201).json(await controle.save());
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Atualizar controle
router.put('/:id', async (req, res) => {
  try {
    const atualizado = await Controle.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!atualizado) return res.status(404).json({ message: 'Controle não encontrado' });
    res.json(atualizado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Deletar controle
router.delete('/:id', async (req, res) => {
  try {
    const deletado = await Controle.findByIdAndDelete(req.params.id);
    if (!deletado) return res.status(404).json({ message: 'Controle não encontrado' });
    res.json({ message: 'Controle removido com sucesso' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
