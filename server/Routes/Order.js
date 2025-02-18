const express = require('express');
const router = express.Router();
const Order = require('../Models/Order');

// **Krijimi i një porosie të re**
router.post('/', async (req, res) => {
  try {
    const { supplier, item, quantity, totalPrice, status } = req.body;
    const newOrder = await Order.create({
      supplier,
      item,
      quantity,
      totalPrice,
      status: 'Pending'
    });
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: 'Gabim gjatë krijimit të porosisë', error });
  }
});

// **Leximi i të gjitha porosive**
router.get('/', async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Gabim gjatë marrjes së porosive', error });
  }
});

// **Leximi i një porosie specifike me ID**
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404).json({ message: 'Porosia nuk u gjet' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Gabim gjatë marrjes së porosisë', error });
  }
});

// **Përditësimi i një porosie**
router.put('/:id', async (req, res) => {
  try {
    const { supplier, item, quantity, totalPrice, status } = req.body;
    const order = await Order.findByPk(req.params.id);

    if (order) {
      await order.update({ supplier, item, quantity, totalPrice, status });
      res.status(200).json(order);
    } else {
      res.status(404).json({ message: 'Porosia nuk u gjet' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Gabim gjatë përditësimit të porosisë', error });
  }
});

// **Fshirja e një porosie**
router.delete('/:id', async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);

    if (order) {
      await order.destroy();
      res.status(200).json({ message: 'Porosia u fshi me sukses' });
    } else {
      res.status(404).json({ message: 'Porosia nuk u gjet' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Gabim gjatë fshirjes së porosisë', error });
  }
});

module.exports = router; 
