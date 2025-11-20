import dbConnect from "@/lib/mongodb";
import Category from "@/models/categories";

import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await dbConnect();
    const categories = await Category.find();

    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json(
      { message: "fetching product error" },
      { status: 500 }
    );
  }
}
