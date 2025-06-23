// ✅ getProductById.js
const Product = require("../../models/admin/products/productCreateModal");

module.exports = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product || product.isDeleted) {
      return res.status(404).json({ error: "Product not found." });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
