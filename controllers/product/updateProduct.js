const Product = require("../../models/admin/products/productCreateModal");

module.exports = async (req, res) => {
  try {
    if (req.body.salePrice && req.body.mrp && req.body.salePrice > req.body.mrp) {
      return res.status(400).json({ error: "Sale price cannot exceed MRP." });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found." });
    }

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
