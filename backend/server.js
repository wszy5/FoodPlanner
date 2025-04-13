const express = require('express'); 
const app = express(); 
const recipesRoutes = require('./routes/recipes');

app.use(express.json()); 
app.use('/api/recipes', recipesRoutes);

app.use((err, req, res, next) => { 
  console.error(err.stack); res.status(500).json({ error: err.message || 'Coś poszło nie tak' }); });

app.use((req, res, next) => {
    console.log(`[${req.method}] ${req.url}`);
    next();
  });
  
  

const PORT = 3000; app.listen(PORT, () => console.log(`Serwer działa na porcie ${PORT}`));