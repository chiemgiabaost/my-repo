import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import mongoose from "mongoose";

export default async function handle(req, res) {
  try {
    // Connect to the database
    await mongooseConnect();

    // Validate the ids (ensure they are valid ObjectId values)
    const ids = req.body.ids;
    if (!Array.isArray(ids) || !ids.every(id => mongoose.Types.ObjectId.isValid(id))) {
      return res.status(400).json({ error: "Invalid product IDs" });
    }

    // Find products by IDs
    const products = await Product.find({ _id: { $in: ids } });

    // Return the found products as JSON
    res.status(200).json(products);
  } catch (error) {
    // Handle any errors and respond with a 500 status code
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
}
