const Product = require("../../models/admin/products/productCreateModal");
module.exports = async (req, res) => {
  try {
    const {
      title,
      description,
      mrp,
      salePrice,
      category,
      sku,
    } = req.body;

    // Strong field validation
    // if (!title || !description || !mrp || !salePrice || !category) {
    //   return res.status(400).json({ error: "All required fields must be provided." });
    // }

    if (salePrice > mrp) {
      return res.status(400).json({ error: "Sale price must be less than or equal to MRP." });
    }

    const existingSku = await Product.findOne({ sku });
    if (existingSku) {
      return res.status(400).json({ error: "SKU already exists." });
    }

    const product = new Product(req.body);
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};