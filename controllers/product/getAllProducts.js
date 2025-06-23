const Product = require("../../models/admin/products/productCreateModal");
module.exports = async (req, res) => {
  try {
    const filters = { isDeleted: false };

    if (req.query.category) filters.category = req.query.category;
    if (req.query.subcategory) filters.subcategory = req.query.subcategory;
    if (req.query.title)
      filters.title = { $regex: req.query.title, $options: "i" };

    const products = await Product.find(filters);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};