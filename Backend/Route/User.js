// const express = require("express");
// const router = express.Router();
// const User = require("../Models/User");
// const { body, validationResult } = require("express-validator");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const fetchUser = require("../Middleware/authmiddleware");
// const authorizeRoles = require("../Middleware/authorizeRoles");

// const JWT_SECRET = "I@mgoodgirl"; // Use a strong secret key

// // 🔹 Register User Route
// router.post(
//   "/register",
//   [
//     body("name", "Enter a valid name").isLength({ min: 3 }),
//     body("email", "Enter a valid email").isEmail(),
//     body("password", "Password must be at least 5 characters").isLength({ min: 5 }),
//     body("phoneNumber", "Enter a valid phone number").isLength({ min: 10 }),
//     body("role", "Role is required").isIn(["Admin", "Staff", "Guest"]),
//   ],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     try {
//       const { name, email, password, phoneNumber, role, address, preferences } = req.body;

//       let existingUser = await User.findOne({ email });
//       if (existingUser) {
//         return res.status(400).json({ error: "User with this email already exists" });
//       }

//       const userId = Math.random().toString(36).substr(2, 9);

//       // 🟢 Save the raw password, Mongoose will hash it automatically
//       const newUser = new User({
//         userId,
//         name,
//         email,
//         phoneNumber,
//         role,
//         password,
//         address: role === "Guest" ? address : null,
//         preferences: role === "Guest" ? preferences : null,
//       });

//       await newUser.save();
//       res.status(201).json({ message: "User registered successfully" });
//     } catch (error) {
//       console.error(error.message);
//       res.status(500).json({ error: "Internal Server Error" });
//     }
//   }
// );

// // 🔹 User Login Route
// router.post(
//   "/login",
//   [
//     body("email", "Enter a valid email").isEmail(),
//     body("password", "Password cannot be empty").exists(),
//   ],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     try {
//       const { email, password } = req.body;

//       // Check if user exists
//       let user = await User.findOne({ email });
//       if (!user) {
//         return res.status(400).json({ error: "Invalid Email" });
//       }

//       // Compare password
//       const isMatch = await bcrypt.compare(password, user.password);
//       if (!isMatch) {
//         return res.status(400).json({ error: "Invalid Credentials" });
//       }

//       // Create JWT payload
//       const payload = {
//         user: {
//           id: user.id,
//           role: user.role, // Include user role in JWT
//         },
//       };

//       // Generate JWT token
//       const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

//       res.status(200).json({ message: "Login successful", token });
//     } catch (error) {
//       console.error("Login Error:", error);
//       res.status(500).json({ error: "Internal Server Error" });
//     }
//   }
// );

// // 🔹 Protected Route: Get All Users (Only Admins Can Access)
// router.get("/getusers-admin", fetchUser, authorizeRoles("Admin"), async (req, res) => {
//   try {
//     const { role, email } = req.query; // Query params for filtering

//     let query = {};
//     if (role) query.role = role;
//     if (email) query.email = email;

//     const users = await User.find(query).select("-password"); // Exclude password

//     if (users.length === 0) {
//       return res.status(404).json({ message: "No users found" });
//     }

//     res.status(200).json(users);
//   } catch (error) {
//     console.error("Error fetching users:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// // 🔹 Example Protected Route (Only Admin & Manager Can Access)
// router.get("/dashboard", fetchUser, authorizeRoles("Admin", "Manager"), (req, res) => {
//   res.status(200).json({ message: `Welcome, ${req.user.role}` });
// });

// // GET all users
//  router.get("/getusers", async (req, res) => {
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
// router.post(
//   "/register",
//   [
//     body("name", "Enter a valid name").isLength({ min: 3 }),
//     body("email", "Enter a valid email").isEmail(),
//     body("password", "Password must be at least 5 characters").isLength({ min: 5 }),
//     body("phoneNumber", "Enter a valid phone number").isLength({ min: 10 }),

//   ],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     try {
//       const { name, email, password, phoneNumber, role, address, preferences } = req.body;

//       let existingUser = await User.findOne({ email });
//       if (existingUser) {
//         return res.status(400).json({ error: "User with this email already exists" });
//       }

//       const userId = Math.random().toString(36).substr(2, 9);

//       // 🟢 Save the raw password, Mongoose will hash it automatically
//       const newUser = new User({
//         userId,
//         name,
//         email,
//         phoneNumber,
//         role,
//         password,
//         address: role === "Guest" ? address : null,
//         preferences: role === "Guest" ? preferences : null,
//       });

//       await newUser.save();
//       res.status(201).json({ message: "User registered successfully" });
//     } catch (error) {
//       console.error(error.message);
//       res.status(500).json({ error: "Internal Server Error" });
//     }
//   }
// );

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




// 🔹 User Login Route

// router.post(
//   "/login",
//   [
//     body("email", "Enter a valid email").isEmail(),
//     body("password", "Password cannot be empty").exists(),
//   ],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     try {
//       const { email, password } = req.body;

//       // Check if user exists
//       let user = await User.findOne({ email });
//       if (!user) {
//         return res.status(400).json({ error: "Invalid Email" });
//       }

//       // Compare password
//       const isMatch = await bcrypt.compare(password, user.password);
//       if (!isMatch) {
//         return res.status(400).json({ error: "Invalid Credentials" });
//       }

//       // Create JWT payload
//       const payload = {
//         user: {
//           id: user.id,
//           name: user.name,
//           role: user.role, // Include user role in JWT
//         },
//       };

//       // Generate JWT token
//       const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

//       // ✅ Add role in response
//       res.status(200).json({
//         message: "Login successful",
//         token,
//         userId: user.userId, // Keep userId
//         name: user.name, // Store name directly
//         email: user.email,
//         role: user.role // 👈 yeh role frontend me mil jayega
//       });

//     } catch (error) {
//       console.error("Login Error:", error);
//       res.status(500).json({ error: "Internal Server Error" });
//     }
//   }
// );
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

      // ✅ Create JWT payload with name
      const payload = {
        user: {
          id: user.id,
          name: user.name, // ✅ Now name will be available in the frontend
          role: user.role,
        },
      };

      // Generate JWT token
      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

      // ✅ Return full user data
      res.status(200).json({
        message: "Login successful",
        token,
        userId: user.userId,
        name: user.name, // ✅ Keep this for quick access
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

      // Find Admin in DB
      let admin = await User.findOne({ email, role: { $in: ["Admin", "Staff"] } });
      if (!admin) {
        return res.status(400).json({ error: "Admin not found" });
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
          role: admin.role,
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
