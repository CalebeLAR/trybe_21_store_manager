const getAllProductsResponse = [
  [
    {"id": 1, "name": "Martelo de Thor" },
    { "id": 2, "name": "Traje de encolhimento" },
    { "id": 3, "name": "Escudo do Capitão América" }
  ],
  [
  undefined,
  ]
]

const getProductByIdResponse = { "id": 1, "name": "Martelo de Thor" }

const insertNewProductResponse = [
  {
    fieldCount: 0,
    affectedRows: 1,
    insertId: 4,
    info: '',
    serverStatus: 2,
    warningStatus: 0
  },
  undefined
]

module.exports = {
  getAllProductsResponse,
  getProductByIdResponse,
  insertNewProductResponse,
}