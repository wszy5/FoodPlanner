// controllers/recipesController.js
let recipes = require('../models/dummyData');

// Pobierz wszystkie przepisy
exports.getAll = (req, res) => {
  res.json(recipes);
};

// Dodaj nowy przepis
exports.create = (req, res) => {
  const { title, ingredients } = req.body;
  if (!title || !ingredients) {
    return res.status(400).json({ error: 'Brakuje tytułu lub składników' });
  }
  const newRecipe = { id: Date.now(), title, ingredients };
  recipes.push(newRecipe);
  res.status(201).json(newRecipe);
};

// Aktualizuj przepis
exports.update = (req, res) => {
  const { id } = req.params;
  const index = recipes.findIndex(r => r.id == id);
  if (index !== -1) {
    recipes[index] = { ...recipes[index], ...req.body };
    res.json(recipes[index]);
  } else {
    res.status(404).json({ error: 'Nie znaleziono przepisu' });
  }
};

// Usuń przepis
exports.remove = (req, res) => {
  const { id } = req.params;
  const index = recipes.findIndex(r => r.id == id);
  if (index === -1) {
    return res.status(404).json({ error: 'Nie znaleziono przepisu' });
  }
  recipes = recipes.filter(r => r.id != id);
  res.status(204).end();
};

// Generowanie listy zakupów z wybranych przepisów
exports.generateShoppingList = (req, res) => {
  const { ids } = req.body;
  if (!Array.isArray(ids)) {
    return res.status(400).json({ error: 'Musisz przesłać tablicę ID przepisów' });
  }

  const ingredientsSet = new Set();

  ids.forEach(id => {
    // Dopasowujemy zarówno string jak i number, dlatego używamy == 
    const recipe = recipes.find(r => r.id == id);
    if (recipe) {
      recipe.ingredients.forEach(ingredient => ingredientsSet.add(ingredient));
    }
  });

  res.json({ shoppingList: Array.from(ingredientsSet) });
};
