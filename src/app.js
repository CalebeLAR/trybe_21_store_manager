const express = require('express');
const { procuctsModel } = require('./models');

const app = express();
app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar!
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', async (req, res) => {
  const allProducts = await procuctsModel.getAllProductsFromDatabase();
  res.status(200).json(allProducts);
});

app.get('/products/:id', async (req, res) => {
  const id = Number(req.params.id);
  const product = await procuctsModel.getProductByIdFromDatabase(id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.status(200).json(product);
});

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;