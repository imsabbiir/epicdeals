import dbConnect from "@/lib/mongodb";
import Category from "@/models/categories";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    await dbConnect();

    const { slug } = params;

    // Find product by ID
    const category = await Category.findOne(slug);

    if (!category) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(category);
  } catch (error) {
    console.error("Single Product API Error:", error);
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
