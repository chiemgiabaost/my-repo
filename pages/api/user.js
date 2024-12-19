import { mongooseConnect } from "@/lib/mongoose";
import { User } from "@/models/User";
import bcrypt from 'bcryptjs';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handle(req, res) {
  try {
    // Connect to the database  
    await mongooseConnect();

    // Handle GET requests for fetching user data (e.g., after sign-in)
    if (req.method === 'GET') {
      const { username } = req.query;

      if (!username) {
        return res.status(400).json({ error: 'Username is required.' });
      }

      const user = await User.findOne({ username }).select('-password');
      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      }

      return res.status(200).json({ user });
    }

    // Handle PUT requests for updating user data
    else if (req.method === 'PUT' || req.method === 'PATCH') {
      const { username } = req.query;
      const { billingAddress, shippingAddress, postalCode, creditCard, cvc, password } = req.body;

      if (!username) {
        return res.status(400).json({ error: 'Username is required.' });
      }

      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      }

      if (billingAddress) user.billingAddress = billingAddress;
      if (shippingAddress) user.shippingAddress = shippingAddress;
      if (postalCode) user.postalCode = postalCode;
      if (creditCard) user.creditCard = creditCard;
      if (cvc) user.cvc = cvc;

      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
      }

      await user.save();
      return res.status(200).json({ success: true, message: 'User updated successfully', user });
    }

    return res.status(405).json({ error: 'Method not allowed.' });

  } catch (error) {
    console.error('Error handling the request:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
