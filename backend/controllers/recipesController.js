let recipes = require('../models/dummyData');

exports.getAll = (req, res) => {
  res.json(recipes);
};

exports.create = (req, res) => {
  const { title, ingredients } = req.body;
  if (!title || !ingredients) {
    return res.status(400).json({ error: 'Brakuje tytułu lub składników' });
  }
  const newRecipe = { id: Date.now(), title, ingredients };
  recipes.push(newRecipe);
  res.status(201).json(newRecipe);
};

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

exports.remove = (req, res) => {
  const { id } = req.params;
  const index = recipes.findIndex(r => r.id == id);
  if (index === -1) {
    return res.status(404).json({ error: 'Nie znaleziono przepisu' });
  }
  recipes = recipes.filter(r => r.id != id);
  res.status(204).end();
};

exports.generateShoppingList = (req, res) => {
  const { ids } = req.body;
  if (!Array.isArray(ids)) {
    return res.status(400).json({ error: 'Musisz przesłać tablicę ID przepisów' });
  }

  const ingredientsSet = new Set();

  ids.forEach(id => {
    const recipe = recipes.find(r => r.id == id);
    if (recipe) {
      recipe.ingredients.forEach(ingredient => ingredientsSet.add(ingredient));
    }
  });

  res.json({ shoppingList: Array.from(ingredientsSet) });
};
