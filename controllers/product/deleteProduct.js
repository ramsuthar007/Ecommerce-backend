const Product = require("../../models/admin/products/productCreateModal");

module.exports = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true },
      { new: true }
    );

    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found." });
    }

    res.json({ message: "Product soft deleted.", deletedProduct });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};