const express = require("express");
const Invoice = require("../Models/Invoice");
const { validateToken } = require("../Middlewares/AuthMiddleware");

const router = express.Router();



// Get all invoices
router.get("/", async (req, res) => {
  try {
    const invoices = await Invoice.findAll();
    return res.json(invoices);
  } catch (error) {
    console.error("Error fetching invoices:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Create a new invoice (protected route)
router.post("/", validateToken, async (req, res) => {
  try {
    const { supplier_id, order_id, total_amount, status } = req.body;

    if (!supplier_id || !total_amount || !status) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newInvoice = await Invoice.create({
      supplier_id,
      order_id: order_id || null, // Ensure order_id is optional
      total_amount,
      status, // Add status here
    });

    return res.status(201).json(newInvoice);
  } catch (error) {
    console.error("Error creating invoice:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update an existing invoice
router.put("/:id", validateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { supplier_id, order_id, total_amount, status } = req.body;

    const invoice = await Invoice.findByPk(id);
    if (!invoice) {
      return res.status(404).json({ error: "Invoice not found" });
    }

    // Only update fields if they are provided in the request body
    if (supplier_id !== undefined) invoice.supplier_id = supplier_id;
    if (order_id !== undefined) invoice.order_id = order_id;
    if (total_amount !== undefined) invoice.total_amount = total_amount;
    if (status !== undefined) invoice.status = status;

    await invoice.save();
    return res.json(invoice);
  } catch (error) {
    console.error("Error updating invoice:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete an invoice
router.delete("/:id", validateToken, async (req, res) => {
    try {
      const { id } = req.params;
      const invoice = await Invoice.findByPk(id);
      if (!invoice) {
        return res.status(404).json({ error: "Invoice not found" });
      }
      await invoice.destroy();
      return res.status(204).send(); // No content response
    } catch (error) {
      console.error("Error deleting invoice:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  });
  

module.exports = router;
