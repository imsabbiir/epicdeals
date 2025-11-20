import dbConnect from "@/lib/mongodb";
import Products from "@/models/products";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();

    const topSellProducts = await Products.aggregate([
      { $unwind: "$variants" },
      { $unwind: "$variants.colors" },
      {
        $group: {
          _id: "$_id",
          productName: { $first: "$productName" },
          categorySlug: { $first: "$categorySlug" },
          images: { $first: "$images" },
          brand: { $first: "$brand" },
          price: { $first: "$productPrice" },
          totalSold: { $sum: "$variants.colors.sold" },
        },
      },
      // ✅ Sort first by totalSold descending, then by _id ascending (for stability)
      { $sort: { totalSold: -1, _id: -1 } },
      { $limit: 5 },
    ]);

    return NextResponse.json(topSellProducts);
  } catch (error) {
    console.error("Fetching top sold products error:", error);
    return NextResponse.json(
      { message: "Error fetching top sold products", error: error.message },
      { status: 500 }
    );
  }
}
