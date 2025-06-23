const express = require("express");
const router = express.Router();
const productController = require("../../controllers/product/index");

// @route   POST /api/products
// @desc    Create new product
router.post("/", productController.createProduct);

// @route   GET /api/products
// @desc    Get all products (with optional filters)
router.get("/", productController.getAllProducts);

// @route   GET /api/products/:id
// @desc    Get a product by ID
router.get("/:id", productController.getProductById);

// @route   PUT /api/products/:id
// @desc    Update a product
router.put("/:id", productController.updateProduct);

// @route   DELETE /api/products/:id
// @desc    Soft delete a product
router.delete("/:id", productController.deleteProduct);

module.exports = router;
