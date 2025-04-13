const express = require('express');
const router = express.Router();
const recipesController = require('../controllers/recipesController');

// Pobierz wszystkie przepisy
router.get('/', recipesController.getAll);

// Dodaj nowy przepis
router.post('/', recipesController.create);

// Aktualizuj przepis
router.put('/:id', recipesController.update);

// Usuń przepis
router.delete('/:id', recipesController.remove);

// Generowanie listy zakupów z wybranych przepisów
router.post('/shopping-list', recipesController.generateShoppingList);

module.exports = router;
