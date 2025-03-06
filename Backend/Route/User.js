
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

// Register User Route
router.post( 
  "/register",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be at least 5 characters").isLength({ min: 5 }),
    body("phoneNumber", "Enter a valid phone number").isLength({ min: 10 }),
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

      let newUser = new User({
        userId,
        name,
        email,
        phoneNumber,
        role,
        password,
        address,
        preferences,
        accountStatus: role === "Staff" ? "Inactive" : "Active", // 🔹 Staff ke liye Inactive, baki Active
      });

      // 🔹 Staff users ke liye address aur preferences hatao
      if (role === "Staff") {
        delete newUser.address;
        delete newUser.preferences;
      }

      await newUser.save();
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);


// Login Route
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

      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "Invalid Email" });
      }

      // ✅ Staff users ka account agar inactive ho, toh login deny kare
      if (user.role === "Staff" && user.accountStatus === "Inactive") {
        return res.status(403).json({ error: "Waiting for admin to respond." });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: "Invalid Credentials" });
      }

      const payload = {
        user: {
          id: user.id,
          name: user.name, // ✅ Frontend ke liye name bhejna
          role: user.role,
        },
      };

      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

      res.status(200).json({
        message: "Login successful",
        token,
        userId: user.userId,
        name: user.name,
        email: user.email,
        role: user.role,
      });

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
router.get("/dashboard", fetchUser, authorizeRoles("Admin", "Staff"), (req, res) => {
  res.status(200).json({ message: `Welcome, ${req.user.role}` });
});

// 🔹 Add Staff or Admin (Only Admin Can Access)
router.post(
  "/add-user",
  fetchUser,
  authorizeRoles("Admin"),
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be at least 5 characters").isLength({ min: 5 }),
    body("phoneNumber", "Enter a valid phone number").isLength({ min: 10 }),
    body("role", "Role must be either Staff or Admin").isIn(["Staff", "Admin"]),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, email, password, phoneNumber, role } = req.body;

      let existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: "User with this email already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const userId = Math.random().toString(36).substr(2, 9);

      let newUser = new User({
        userId,
        name,
        email,
        phoneNumber,
        role,
        password: hashedPassword,
        accountStatus: role === "Staff" ? "Inactive" : "Active", 
      });

      await newUser.save();
      res.status(201).json({ message: `${role} added successfully` });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

// 🔹 Delete User (Only Admin Can Access)
router.delete(
  "/delete-user/:id",
  fetchUser,
  authorizeRoles("Admin"),
  async (req, res) => {
    try {
      const userId = req.params.id;

      let user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      await User.findByIdAndDelete(userId);
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);
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


// 🔹 Admin Login Route (Hidden)

router.post(
  "/admin/login",
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

      // Find Admin or Staff in DB
      let admin = await User.findOne({ email, role: { $in: ["Admin", "Staff"] } });

      if (!admin) {
        return res.status(400).json({ error: "Admin not found" });
      }

      // ✅ Staff users ka account agar inactive ho, toh login deny kare
      if (admin.role === "Staff" && admin.accountStatus === "Inactive") {
        return res.status(403).json({ error: "Waiting for admin to respond." });
      }

      // Compare password
      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) {
        return res.status(400).json({ error: "Invalid Credentials" });
      }

      // Generate Token with Admin Role
      const payload = {
        user: {
          id: admin.id,
          email: admin.email,
          name: admin.name,
          role: admin.role,
          accountStatus: admin.accountStatus
        },
      };

      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

      res.status(200).json({ message: "Admin login successful", token });
    } catch (error) {
      console.error("Admin Login Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

router.get("/inactive-staff", async (req, res) => {
  try {
    const inactiveStaff = await User.find({ role: "Staff", accountStatus: "Inactive" });

    res.status(200).json({ inactiveStaff });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.put("/update-staff-status", async (req, res) => {
  try {
    const { userId, accountStatus } = req.body;

    if (!["Active", "Inactive"].includes(accountStatus)) {
      return res.status(400).json({ error: "Invalid account status" });
    }

    const staffMember = await User.findOne({ userId, role: "Staff" });

    if (!staffMember) {
      return res.status(404).json({ error: "Staff member not found" });
    }

    staffMember.accountStatus = accountStatus;
    await staffMember.save();

    res.status(200).json({ message: `Staff status updated to ${accountStatus}` });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



module.exports = router;
