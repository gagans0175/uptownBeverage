const express = require("express");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

const User = require("../model/User");
const auth = require('../middleware/auth');
/**
 * @method - POST
 * @param - user/signup
 * @description - User SignUp
 */

router.post("/signup",
  [
    check("first_name", "First name is required to register.").not().isEmpty(),
    check("last_name", "Lase name is required to register.").not().isEmpty(),
    check("user_name", "User name is required to register.").not().isEmpty(),
    check("userRole", "User role is required to register.").not().isEmpty(),
    check("email", "Email is required to register.").isEmail(),
    check("phone", "Phone is required to register.").not().isEmpty(),
    check("password", "Please enter a valid password.").isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).json({
        errors: errors.array(),
        existingUser: false,
        newUser: false,
        message: "Data validation Error. Please correct the data and try again.",
        token: null
      });
    }

    const {
      first_name,
      last_name,
      user_name,
      userRole,
      email,
      phone,
      password,
    } = req.body;
    try {
      let user = await User.findOne({
        email
      });
      if (user) {
        return res.status(200).json({
          errors: null,
          existingUser: true,
          newUser: false,
          message: `User ${user_name} already exists.`,
          token: null,
          first_name,
          last_name,
          user_name
        });
      }

      user = new User({
        first_name,
        last_name,
        user_name,
        email,
        phone,
        password,
        userRole,
        createdAt: Date.now()
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        "secrettoken", {
          expiresIn: 10000
        },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({
            errors: null,
            existingUser: false,
            newUser: true,
            message: `User ${first_name} ${last_name}  has been created successfully. Please login now.`,
            first_name,
            last_name,
            user_name,
            token
          });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Error in Saving");
    }
  }
);



/**
 * @method - POST
 * @param - user/login
 * @description - User login
 */
router.post(
  "/login",
  async (req, res) => {
    
    const { user_name, email, password } = req.body;
    try {
      let user = null;
      if(user_name){
         user = await User.findOne({
          user_name
        });
      } else {
        user = await User.findOne({
          email
        });
      }

      if (!user)
        return res.status(200).json({
          message: "User does not exist."
        });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({
          message: "Incorrect Password! Please try again."
        });

      const payload = {
        loggedInuser: {
          id: user.id,
          name: `${user.first_name} ${user.last_name}`,
          email: user.email,
          phone: user.phone,
          userRole: user.userRole
        }
      };

      jwt.sign(
        payload,
        "randomString",
        {
          expiresIn: 3600
        },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({
            success: true,
            token
          });
        }
      );
    } catch (e) {
      console.error(e);
      res.status(500).json({
        message: "Server Error"
      });
    }
  }
);

/**
 * @method - GET
 * @description - Get LoggedIn User Info
 * @param - /user/me
 */
router.get("/me", auth, async (req, res) => {
  try {
    // request.user is getting fetched from Middleware after token authentication
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (e) {
    res.send({ message: "Error in Fetching user" });
  }
});
router.get('/current_user', (req, res) => {
  res.send(req.user);
});

router.get('/logoutUser', function(req, res) {
  res.status(200).json({
    success: true,
    token: null
  });
});

module.exports = router;