const express = require('express');
const { validateSaleProduct } = require('../controllers/validations/saleProductsValidation');

const connection = require('../models/connection');

const salesRouter = express.Router();

salesRouter.post('/', async (req, res) => {
  const saleProduct = req.body;

  // validation params
  const error = validateSaleProduct(saleProduct);
  if (error) return res.status(200).json(error.message);

  return res.status(200).json('nao tem erro');
  /*
  // controller  addNewSaleProduct
          **validations
          validSingleSaleProduct()=>{
            [Será validado que não é possível realizar operações em uma venda sem o campo productId]
            [Será validado que não é possível realizar operações em uma venda sem o campo quantity] 
            [Será validado o campo quantity menor ou igual a 0 (Zero)] 
          }
          validMultiplesSaleProducts () => {
            [Será validado o campo productId inexistente, em uma requisição com um único item] 
            [Será validado o campo productId inexistente, em uma requisição com vários items] 
          }
          
      array de promisses: []
      req.forEach(
        p = await requestSaleProducts();
        )
        req.forech(
          )]
          
          **response
          return {
            "id": 3, 
            "itemsSold": [{"productId": 1,"quntity": 1},{"productId": 2,"quantity": 5}]
          }
          
          // services requestSaleProducts([req])
          recebe um array de objetos
          para cada objeto, segue uma serie de regras de negócio para injetar um novo SaleProduct;
          const {id, quant}
          cria timestamp
          chama requestProductById(id)
          chama requestAddNewProduct(quant)
          // models
          As vendas enviadas devem ser salvas nas tabelas sales e sales_products do banco de dados;
          salva id em sales => getSaleByIdFromDatabase (saleID)
          pega id de sales => insertNewSaleInTheDatabase(dateTime)
          pega id de products => insertNewSaleProductInTheDatabase(saleID, productID)
          salva id em sales_products

  Deve ser possível cadastrar a venda de vários produtos através da uma mesma requisição;
  O corpo da requisição deverá seguir o formato abaixo:
  */
});

module.exports = salesRouter;
