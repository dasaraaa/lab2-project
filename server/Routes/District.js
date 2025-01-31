const express = require("express");
const District = require("../Models/District")
const router = express.Router();
const{validateToken} = require("../Middlewares/AuthMiddleware")




router.get("/", async (req, res) => {
   const listOfDistrict = await District.findAll();
   res.json(listOfDistrict);
});

router.post("/", validateToken, async (req, res) => {
    try {
        const district = req.body;
        const newDistrict = await District.create({ name: district.name });
        res.status(201).json(newDistrict);
    } catch (error) {
        console.error("Error creating district:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
// Update an existing category
router.put('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { name } = req.body;
      if (!name) {
        return res.status(400).json({ error: 'District name is required' });
      }
      const district = await District.findByPk(id);
      if (!district) {
        return res.status(404).json({ error: 'District not found' });
      }
      district.name = name;
      await district.save();
      res.json(district);
    } catch (error) {
      console.error('Error updating district:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // Delete a category
  router.delete('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const district= await District.findByPk(id);
      if (!district) {
        return res.status(404).json({ error: 'District not found' });
      }
      await district.destroy();
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting district:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
module.exports = router;
