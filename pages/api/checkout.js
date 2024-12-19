import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { Order } from "@/models/Order";

let paymentAttempts = 0;

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      paymentAttempts++;

      const isPaymentApproved = paymentAttempts % 3 !== 0;

      if (isPaymentApproved) {
        const { name, email, city, postalCode, streetAddress, country, cartProducts, products } = req.body;

        const uniqueIds = [...new Set(cartProducts)];
        const productsInfos = await Product.find({ _id: { $in: uniqueIds } });

        let line_items = [];

        for (const productId of uniqueIds) {
          const productInfo = productsInfos.find(p => p._id.toString() === productId);
          const quantity = cartProducts.filter(id => id === productId).length;
        
          if (quantity <= 0 || !productInfo) {
            continue; // Skip invalid quantity or missing product
          }
        
          line_items.push({
            quantity,
            price_data: {
              currency: 'USD',
              product_data: { name: productInfo.title },
              unit_amount: productInfo.price * 100, // Price in cents
            },
          });
        
          if (quantity <= 0) {
            return res.status(400).json({ message: "Invalid quantity to decrement." });
          }
        
          const updatedProduct = await Product.findByIdAndUpdate(productId, {
            $inc: { quantity: -quantity }
          }, { new: true });
          
          if (!updatedProduct) {
            console.error(`Product update failed for product ID: ${productId}`);
            return res.status(404).json({ message: `Product with ID ${productId} not found or could not be updated.` });
          }
          
        }
        

        const total = line_items.reduce((sum, item) => sum + item.price_data.unit_amount / 100, 0);

        const orderDoc = await Order.create({
          line_items,
          name,
          email,
          city,
          postalCode,
          streetAddress,
          country,
          paid: true,
        });

        return res.status(200).json({
          success: true,
          message: "Payment approved!",
          orderSummary: {
            customer: {
              name,
              email,
              address: `${streetAddress}, ${city}, ${country} (${postalCode})`,
            },
            total,
          },
        });
      } else {
        return res.status(200).json({
          success: false,
          message: "Credit Card Authorization Failed.",
        });
      }
    } catch (error) {
      console.error("Order creation failed:", error);
      return res.status(500).json({ message: "Server error, please try again." });
    }
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
