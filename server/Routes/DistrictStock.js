const express = require("express");
const DistrictStock = require("../Models/DistrictStock")
const router = express.Router();
const{validateToken} = require("../Middlewares/AuthMiddleware")

const District = require("../Models/District");
const Items = require("../Models/Items")
// ✅ 1. Create or Add stock for a specific district and item
router.post("/", async (req, res) => {
  try {
    const { item_id, district_id, quantity } = req.body;

    // Validate input
    if (!item_id || !district_id || quantity == null) {
      return res.status(400).json({ message: "item_id, district_id, and quantity are required." });
    }

    // Find the item and district to ensure they exist
    const item = await Items.findByPk(item_id);
    const district = await District.findByPk(district_id);

    if (!item || !district) {
      return res.status(404).json({ message: "Item or District not found." });
    }

    // Create a new district stock entry
    const districtStock = await DistrictStock.create({ item_id, district_id, quantity });

    // Respond with the newly created stock
    res.status(201).json(districtStock);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// ✅ 5. Get all district stocks
router.get("/", async (req, res) => {
    try {
      // Fetch all district stocks
      const stocks = await DistrictStock.findAll();
  
      // Respond with all district stocks
      res.json(stocks);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  });
  
// ✅ 2. Get stock for a specific item in a district
router.get("/:district_id/:item_id", async (req, res) => {
  try {
    const { district_id, item_id } = req.params;

    // Find the stock for the given district_id and item_id
    const stock = await DistrictStock.findOne({ where: { district_id, item_id } });

    if (!stock) {
      return res.status(404).json({ message: "Stock not found." });
    }

    res.json(stock);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// ✅ 3. Update stock quantity for a specific item in a district
router.put("/:district_id/:item_id", async (req, res) => {
  try {
    const { district_id, item_id } = req.params;
    const { quantity } = req.body;

    // Validate the quantity
    if (isNaN(quantity) || quantity < 0) {
      return res.status(400).json({ message: "Invalid quantity. Quantity must be a number greater than or equal to 0." });
    }

    // Find the stock entry for the given district and item
    const stock = await DistrictStock.findOne({ where: { district_id, item_id } });

    if (!stock) {
      return res.status(404).json({ message: "Stock entry not found." });
    }

    // Update the stock quantity
    stock.quantity = quantity;
    await stock.save();

    res.json({ message: "Stock updated successfully", stock });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// ✅ 4. Delete stock for a specific item in a district
router.delete("/:district_id/:item_id", async (req, res) => {
  try {
    const { district_id, item_id } = req.params;

    // Find the stock entry for the given district and item
    const stock = await DistrictStock.findOne({ where: { district_id, item_id } });

    if (!stock) {
      return res.status(404).json({ message: "Stock entry not found." });
    }

    // Delete the stock entry
    await stock.destroy();

    res.json({ message: "Stock deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
