import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  const token = req.headers.token;

  if (!token) {
    return res.status(401).json({ success: false, message: "Not authorized. Login again." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // make sure your .env key is JWT_SECRET
    req.userId = decoded.id; // set userId for downstream controllers
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ success: false, message: "Invalid token" });
  }
};

export default authMiddleware;
