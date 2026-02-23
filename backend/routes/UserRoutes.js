import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js"; // Note the .js extension
import { body, validationResult } from "express-validator";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// REGISTER
router.post(
  "/register",
  [
    // 1. Validation Rules
    body("username")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Username must be 3+ chars"),
    body("email")
      .isEmail()
      .withMessage("Invalid email format")
      .normalizeEmail(),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long")
      .matches(/\d/)
      .withMessage("Password must contain at least one number")
      .matches(/[A-Z]/)
      .withMessage("Password must contain at least one uppercase letter")
      .matches(/[!@#$%^&*]/)
      .withMessage("Password must contain a special character (!@#$%^&*)"),
  ],
  async (req, res) => {
    // 2. Catch Validation Errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Return the first error message to the user
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    try {
      const { username, email, password } = req.body;

      // 3. Check for Existing User
      const userExists = await User.findOne({ $or: [{ email }, { username }] });
      if (userExists) {
        return res.status(400).json({ message: "User already exists" });
      }

      // 4. Secure Hashing
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = new User({ username, email, password: hashedPassword });
      await newUser.save();

      res.status(201).json({ message: "Account created successfully!" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error, try again later" });
    }
  },
);

// LOGIN
router.post(
  "/login",
  [
    // 1. Sanitize and validate inputs
    body("email")
      .isEmail()
      .withMessage("Please provide a valid email")
      .normalizeEmail(),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  async (req, res) => {
    // 2. Check for basic validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    try {
      // 3. Find user
      const user = await User.findOne({ email: req.body.email });

      // SECURITY: Use the same generic error for "user not found" and "wrong password"
      // This prevents "Account Enumeration" (hackers finding valid emails)
      const invalidMessage = "Invalid email or password";

      if (!user) {
        return res.status(401).json({ message: invalidMessage });
      }

      // 4. Compare passwords
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password,
      );
      if (!validPassword) {
        return res.status(401).json({ message: invalidMessage });
      }

      // 5. Generate JWT
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      // 6. Return non-sensitive user data + token
      res.status(200).json({
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
        },
      });
    } catch (err) {
      console.error("Login Error:", err);
      res.status(500).json({ message: "An internal server error occurred" });
    }
  },
);

// Get current user data
router.get("/profile", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Update user profile
router.put("/profile/update", verifyToken, async (req, res) => {
  try {
    const { username, bio } = req.body;

    // Check if new username is already taken by someone else
    if (username) {
      const existingUser = await User.findOne({ username });
      if (existingUser && existingUser._id.toString() !== req.user.id) {
        return res.status(400).json({ message: "Username already taken" });
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { $set: { username, bio } },
      { new: true }, // returns the updated document
    ).select("-password");

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
});

export default router;
