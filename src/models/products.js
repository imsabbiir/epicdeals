import mongoose from "mongoose";

const colorSchema = new mongoose.Schema({
  color: { type: String, required: true },
  sold: { type: Number, required: true },
  stock: { type: Number, required: true },
});

const variantSchema = new mongoose.Schema({
  type: { type: String, required: true },
  colors: [colorSchema],
});

const productSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    productName: { type: String, required: true },
    productCode: { type: String, required: true },
    productPrice: { type: Number, required: true },
    discountStatus: { type: Boolean, default: false },
    productDiscountAmount: { type: Number, default: 0 },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    categorySlug: { type: String, required: true },
    subCategory: { type: [String], required: true },
    subCategorySlug: { type: String, required: true },
    rating: { type: Number, default: 0 },
    variants: [variantSchema],
    keyFeatures: { type: [String], default: [] },
    images: { type: [String], default: [] },
  },
  { timestamps: true }
);

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
