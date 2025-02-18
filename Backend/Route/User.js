// const express = require("express");
// const router = express.Router();
// const User = require("../Models/User");
// const { body, validationResult } = require("express-validator");
// const bcrypt = require("bcrypt"); 
// const jwt = require("jsonwebtoken");
// const JWT_SECRET = "I@mgoodgirl";

// // Create a user using: POST '/api/User/register'
// router.post(
//     "/register",
//     [
//       body("name", "Enter a valid name").isLength({ min: 3 }),
//       body("email", "Enter a valid email").isEmail(),
//       body("password", "Password must be at least 5 characters").isLength({ min: 5 }),
//       body("phoneNumber", "Enter a valid phone number").isLength({ min: 10 }),
//       body("role", "Role is required").isIn(["Admin", "Manager", "Receptionist", "Housekeeping", "Guest"]),
//     ],
//     async (req, res) => {
//       const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//       }
  
//       try {
//         const { name, email, password, phoneNumber, role, address, preferences } = req.body;
  
//         let existingUser = await User.findOne({ email });
//         if (existingUser) {
//           return res.status(400).json({ error: "User with this email already exists" });
//         }
  
//         const userId = Math.random().toString(36).substr(2, 9);
  
//         // 🟢 Save the raw password, Mongoose will hash it automatically
//         const newUser = new User({
//           userId,
//           name,
//           email,
//           phoneNumber,
//           role,
//           password, // Save plain password, pre-save hook will hash it
//           address: role === "Guest" ? address : null,
//           preferences: role === "Guest" ? preferences : null,
//         });
  
//         await newUser.save();
  
//         res.status(201).json({ message: "User registered successfully" });
//       } catch (error) {
//         console.error(error.message);
//         res.status(500).json({ error: "Internal Server Error" });
//       }
//     }
//   );
  
// // GET all users
// router.get("/getusers", async (req, res) => {
//     try {
//       const { role, email } = req.query; // Query params for filtering
  
//       let query = {};
//       if (role) query.role = role;
//       if (email) query.email = email;
  
//       const users = await User.find(query).select("-password"); // Exclude password
  
//       if (users.length === 0) {
//         return res.status(404).json({ message: "No users found" });
//       }
  
//       res.status(200).json(users);
//     } catch (error) {
//       console.error("Error fetching users:", error);
//       res.status(500).json({ error: "Internal Server Error" });
//     }
//   });
  

//   // User login API
// router.post(
//     "/login",
//     [
//       body("email", "Enter a valid email").isEmail(),
//       body("password", "Password cannot be empty").exists(),
//     ],
//     async (req, res) => {
//       // Validation errors
//       const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//       }
  
//       try {
//         const { email, password } = req.body;
  
//         // Check if user exists
//         let user = await User.findOne({ email });
//         if (!user) {
//           return res.status(400).json({ error: "Invalid Email" });
//         }
  
//         // Compare password
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//           return res.status(400).json({ error: "Invalid Credentials" });
//         }
  
//         // Create JWT payload
//         const payload = {
//           user: {
//             id: user.id,
//             role: user.role,
//           },
//         };
  
//         // Generate JWT token
//         const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
  
//         res.status(200).json({ message: "Login successful", token });
//       } catch (error) {
//         console.error("Login Error:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//       }
//     }
//   );
// module.exports = router;



const express = require("express");
const router = express.Router();
const User = require("../Models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fetchUser = require("../Middleware/authmiddleware");
const authorizeRoles = require("../Middleware/authorizeRoles");

const JWT_SECRET = "I@mgoodgirl"; // Use a strong secret key

// 🔹 Register User Route
router.post(
  "/register",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be at least 5 characters").isLength({ min: 5 }),
    body("phoneNumber", "Enter a valid phone number").isLength({ min: 10 }),
    body("role", "Role is required").isIn(["Admin", "Manager", "Receptionist", "Housekeeping", "Guest"]),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, email, password, phoneNumber, role, address, preferences } = req.body;

      let existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: "User with this email already exists" });
      }

      const userId = Math.random().toString(36).substr(2, 9);

      // 🟢 Save the raw password, Mongoose will hash it automatically
      const newUser = new User({
        userId,
        name,
        email,
        phoneNumber,
        role,
        password,
        address: role === "Guest" ? address : null,
        preferences: role === "Guest" ? preferences : null,
      });

      await newUser.save();
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

// 🔹 User Login Route
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be empty").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, password } = req.body;

      // Check if user exists
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "Invalid Email" });
      }

      // Compare password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: "Invalid Credentials" });
      }

      // Create JWT payload
      const payload = {
        user: {
          id: user.id,
          role: user.role, // Include user role in JWT
        },
      };

      // Generate JWT token
      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

      res.status(200).json({ message: "Login successful", token });
    } catch (error) {
      console.error("Login Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

// 🔹 Protected Route: Get All Users (Only Admins Can Access)
router.get("/getusers-admin", fetchUser, authorizeRoles("Admin"), async (req, res) => {
  try {
    const { role, email } = req.query; // Query params for filtering

    let query = {};
    if (role) query.role = role;
    if (email) query.email = email;

    const users = await User.find(query).select("-password"); // Exclude password

    if (users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 🔹 Example Protected Route (Only Admin & Manager Can Access)
router.get("/dashboard", fetchUser, authorizeRoles("Admin", "Manager"), (req, res) => {
  res.status(200).json({ message: `Welcome, ${req.user.role}` });
});

// GET all users
 router.get("/getusers", async (req, res) => {
    try {
      const { role, email } = req.query; // Query params for filtering
  
      let query = {};
      if (role) query.role = role;
      if (email) query.email = email;
  
      const users = await User.find(query).select("-password"); // Exclude password
  
      if (users.length === 0) {
        return res.status(404).json({ message: "No users found" });
      }
  
      res.status(200).json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  

module.exports = router;
