const express = require("express");
const District = require("../Models/District");
const router = express.Router();
const { validateToken } = require("../Middlewares/AuthMiddleware");
const DistrictRequest = require("../Models/DistrictRequest");
const Items = require("../Models/Items");

// GET all district requests
router.get('/', async (req, res) => {
  try {
    const districtRequests = await DistrictRequest.findAll({
      include: [
        { model: District, attributes: ['name'] },
        { model: Items, attributes: ['name'] }
      ]
    });
    res.status(200).json(districtRequests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET a specific district request by ID
router.get('/:id', async (req, res) => {
  try {
    const districtRequest = await DistrictRequest.findByPk(req.params.id, {
      include: [
        { model: District, attributes: ['name'] },
        { model: Items, attributes: ['name'] }
      ]
    });
    if (districtRequest) {
      res.status(200).json(districtRequest);
    } else {
      res.status(404).json({ message: 'District Request not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// CREATE a new district request
router.post('/', async (req, res) => {
  const { districtId, itemId, quantity, message } = req.body;
  try {
    // Create the new district request, with status defaulting to 'pending'
    const newRequest = await DistrictRequest.create({
      districtId,
      itemId,
      quantity,
      message,
      status: 'pending'  // Ensuring status is set to 'pending'
    });
    res.status(201).json(newRequest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// PUT - Update the status of a district request
router.put('/:id', async (req, res) => {
  try {
    const { status } = req.body;  // Assuming you're sending status in the body
    console.log("Updating status for request with ID:", req.params.id);  // Log the ID to verify it's being received

    // Find the district request by ID
    const districtRequest = await DistrictRequest.findByPk(req.params.id);

    if (!districtRequest) {
      return res.status(404).json({ message: 'District Request not found' });
    }

    // Update the status of the request
    districtRequest.status = status;

    // Save the updated request
    await districtRequest.save();

    // Respond with the updated district request
    res.status(200).json(districtRequest);
  } catch (error) {
    console.error("Error in PUT /district-requests/:id:", error);  // Log error for debugging
    res.status(500).json({ error: error.message });
  }
});



module.exports = router;
