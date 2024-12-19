export default async function handler(req, res) {
  if (req.method === "POST") {
    const { token } = req.body;
    console.log("Received token: ", token);

    if (!token) {
      return res.status(400).json({ message: "No token provided" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      console.log("Decoded token: ", decoded);
      return res.status(200).json({ user: decoded });
    } catch (error) {
      console.error("Token verification failed:", error);
      return res.status(401).json({ message: "Token is invalid or expired" });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
