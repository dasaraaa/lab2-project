const express = require("express");
const Items = require("../Models/Items")
const router = express.Router();
const{validateToken} = require("../Middlewares/AuthMiddleware")
const {Category} = require("./Category")



router.get('/', async (req, res) => {
  try {
    const items = await Items.findAll({
        include: Category,
    });
    res.status(200).json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching items' });
  }
});

// GET: Get a single item by ID
router.get('/:id', async (req, res) => {
  try {
    const item = await Items.findByPk(req.params.id, {
        include: [{
            model: Category,
            as: 'category',   // This should match the alias defined in the association
            attributes: ['name']
          }]// I
      // Include category details for the item
    });
    if (item) {
      res.status(200).json(item);
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching item' });
  }
});

// POST: Create a new item
router.post('/', async (req, res) => {
    const { name, description, quantity, minimumStock, maximumStock, categoryId } = req.body;
    try {
      const newItem = await Items.create({
        name, 
        description, 
        quantity, 
        minimumStock, 
        maximumStock, 
        categoryId
      });
      res.status(201).json(newItem);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating item' });
    }
  });
  

// PUT: Update an existing item
router.put('/:id', async (req, res) => {
  const { name, description, quantity, minimumStock, maximumStock, categoryId } = req.body;
  try {
    const item = await Items.findByPk(req.params.id);
    if (item) {
      item.name = name || item.name;
      item.description = description || item.description;
      item.quantity = quantity || item.quantity;
      item.minimumStock = minimumStock || item.minimumStock;
      item.maximumStock = maximumStock || item.maximumStock;
      item.categoryId = categoryId || item.categoryId;
      await item.save();
      res.status(200).json(item);
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating item' });
  }
});


// DELETE: Delete an item
router.delete('/:id', async (req, res) => {
  try {
    const item = await Items.findByPk(req.params.id);
    if (item) {
      await item.destroy();
      res.status(200).json({ message: 'Item deleted successfully' });
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting item' });
  }
});

module.exports=router;