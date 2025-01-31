const express = require("express");
const Category = require("../Models/Category")
const router = express.Router();
const{validateToken} = require("../Middlewares/AuthMiddleware")




router.get("/", async (req, res) => {
   const listOfCategory = await Category.findAll();
   res.json(listOfCategory);
});

router.post("/", validateToken, async (req, res) => {
    try {
        const category = req.body;
        const newCategory = await Category.create({ name: category.name });
        res.status(201).json(newCategory);
    } catch (error) {
        console.error("Error creating category:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
// Update an existing category
router.put('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { name } = req.body;
      if (!name) {
        return res.status(400).json({ error: 'Category name is required' });
      }
      const category = await Category.findByPk(id);
      if (!category) {
        return res.status(404).json({ error: 'Category not found' });
      }
      category.name = name;
      await category.save();
      res.json(category);
    } catch (error) {
      console.error('Error updating category:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // Delete a category
  router.delete('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const category = await Category.findByPk(id);
      if (!category) {
        return res.status(404).json({ error: 'Category not found' });
      }
      await category.destroy();
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting category:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
module.exports = router;
