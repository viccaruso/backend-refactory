const { Router } = require('express');
const Order = require('../models/Order');

module.exports = Router()
  .post('/', async (req, res) => {
    res.json(await Order.insert(req.body));
  })

  .get('/:id', async (req, res) => {
    res.json(await Order.getById(req.params.id));
  })

  .get('/', async (req, res) => {
    res.json(await Order.getAll());
  })

  .patch('/:id', async (req, res, next) => {
    try {
      const result = await Order.getById(req.params.id);

      if (!result) {
        const error = new Error(`Order ${req.params.id} not found`);
        error.status = 404;
        throw error;
      }

      const product = req.body.product ?? result.product;
      const quantity = req.body.quantity ?? result.quantity;
      
      const order = await Order.updateById(req.params.id,  { product, quantity });

      res.json(order);
    } catch (error) {
      next(error);
    }
  })

  .delete('/:id', async (req, res) => {
    res.json(await Order.deleteById(req.params.id));
  });
