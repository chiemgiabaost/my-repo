import { mongooseConnect } from "@/lib/mongoose";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET_KEY || "your-secret-key"; // Use a secure key for JWT

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required." });
    }

    try {
      await mongooseConnect();

      // Check if user exists by username
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({ message: "User not found." });
      }

      // Compare hashed password with bcrypt
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid password." });
      }

      // Generate JWT token
      const token = jwt.sign(
        { id: user._id, username: user.username },
        secretKey,
        { expiresIn: "1h" } // Token expires in 1 hour
      );

      // Return the token and user data
      return res.status(200).json({ token, user });

    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error." });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed." });
  }
}
