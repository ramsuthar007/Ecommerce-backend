const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, index: true },
    description: { type: String, required: true, trim: true },
    mrp: { type: Number, required: true, min: 0 },
    salePrice: { type: Number, required: true, min: 0 },
    discount: { type: Number, default: 0, min: 0, max: 100 },
    category: { type: String, required: true, index: true },
    subcategory: { type: String, index: true },
    images: [{ type: String }],
    colors: [{ type: String }],
    sizes: [{ type: String }],
    material: { type: String },

    sku: { type: String, unique: true }, // Stock Keeping Unit
    stockQty: { type: Number, default: 0, min: 0 }, // Quantity for inventory
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
    tags: [{ type: String }], // for search/filter

    isFeatured: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false }, // soft delete

    ratings: {
      average: { type: Number, default: 0, min: 0, max: 5 },
      count: { type: Number, default: 0, min: 0 },
    },
  },
  { timestamps: true }
);

// ✅ Pre-save hook for SKU auto-generation
productSchema.pre('save', function (next) {
  if (!this.sku) {
    const prefix = this.title.trim().slice(0, 3).toUpperCase();
    const uniqueId = Date.now().toString().slice(-5);
    this.sku = `${prefix}-${uniqueId}`;
  }
  next();
});

module.exports = mongoose.model("Product", productSchema);