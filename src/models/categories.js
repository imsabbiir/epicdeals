import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: false },
  image: { type: String, required: true },
  punchline: { type: String, required: true },
});

const categorySchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    tagline: { type: String, required: true },
    image: { type: String, required: true },
    subcategories: { type: [subCategorySchema], default: [] },
  },
  { timestamps: true }
);

const Category = mongoose.models.Category || mongoose.model("Category", categorySchema);

export default Category;
