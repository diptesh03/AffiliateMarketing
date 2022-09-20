const express = require('express');

const routes = express.Router();
const productControllers = require('../controllers/product.controller');

routes.get('/searchItem', productControllers.searchItems);

routes.get('/categories', productControllers.categories);

module.exports = routes;