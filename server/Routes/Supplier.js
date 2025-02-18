const express = require('express');
const router = express.Router();
const Supplier = require('../Models/Supplier');

// **Krijimi i një furnitori të ri**
router.post('/', async (req, res) => {
  try {
    const { name, contact_info, payment_terms } = req.body;
    const newSupplier = await Supplier.create({ name, contact_info, payment_terms });
    res.status(201).json(newSupplier);
  } catch (error) {
    res.status(500).json({ message: 'Gabim gjatë krijimit të furnitorit', error });
  }
});

// **Leximi i të gjithë furnitorëve**
router.get('/', async (req, res) => {
  try {
    const suppliers = await Supplier.findAll();
    res.status(200).json(suppliers);
  } catch (error) {
    res.status(500).json({ message: 'Gabim gjatë marrjes së furnitorëve', error });
  }
});

// **Leximi i një furnitori specifik me ID**
router.get('/:id', async (req, res) => {
  try {
    const supplier = await Supplier.findByPk(req.params.id);
    if (supplier) {
      res.status(200).json(supplier);
    } else {
      res.status(404).json({ message: 'Furnitori nuk u gjet' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Gabim gjatë marrjes së furnitorit', error });
  }
});

// **Përditësimi i një furnitori**
router.put('/:id', async (req, res) => {
  try {
    const { name, contact_info, payment_terms } = req.body;
    const supplier = await Supplier.findByPk(req.params.id);

    if (supplier) {
      await supplier.update({ name, contact_info, payment_terms });
      res.status(200).json(supplier);
    } else {
      res.status(404).json({ message: 'Furnitori nuk u gjet' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Gabim gjatë përditësimit të furnitorit', error });
  }
});

// **Fshirja e një furnitori**
router.delete('/:id', async (req, res) => {
  try {
    const supplier = await Supplier.findByPk(req.params.id);

    if (supplier) {
      await supplier.destroy();
      res.status(200).json({ message: 'Furnitori u fshi me sukses' });
    } else {
      res.status(404).json({ message: 'Furnitori nuk u gjet' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Gabim gjatë fshirjes së furnitorit', error });
  }
});

module.exports = router;
