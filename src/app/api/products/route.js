import dbConnect from "@/lib/mongodb";
import Product from "@/models/products";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const categorySlug = searchParams.get("categorySlug") || "all";
    const subCategorySlug = searchParams.get("subCategorySlug") || "all";
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 9;
    const minPrice = parseFloat(searchParams.get("minPrice")) || 0;
    const maxPrice = parseFloat(searchParams.get("maxPrice")) || Number.MAX_SAFE_INTEGER;
    const skip = (page - 1) * limit;
    const filter = {};
    if (categorySlug !== "all") filter.categorySlug = categorySlug;
    if (subCategorySlug !== "all") filter.subCategorySlug = subCategorySlug;
    filter.productPrice = { $gte: minPrice, $lte: maxPrice };
    const totalProducts = await Product.countDocuments(filter);
    const totalPages = Math.ceil(totalProducts / limit);

    const products = await Product.find(filter)
      .skip(skip)
      .limit(limit);

    return NextResponse.json({
      products,
      pagination: {
        totalProducts,
        totalPages,
        currentPage: page,
        limit,
      },
    });
  } catch (error) {
    console.error("Fetching product error:", error);
    return NextResponse.json(
      { message: "Fetching product error", error: error.message },
      { status: 500 }
    );
  }
}
