
const express = require('express')
const router = express.Router()
const User = require('../modals/Users')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchid = require('../middleware/fetchid')

const secret = 'secret'

                                              // Route: 1 Registration

// This end point is to register user: "Post"  Atuntication not require Login also
router.post('/signup',
body('name', 'Envalid Name').isLength({ min: 3 }),
body('email', 'Envalid Email').isEmail(),
  body('password', 'Password should be atleast five characters').isLength({ min: 5 }),
async (req, res) => {

    //Getting user information from request: Using destructuring
    const { name, email, password } = req.body
    
    //Checking Errors : if there are errors then return bad request.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //checking whether user with this already exists or not.
    const checkingUsers = await User.findOne({ email })
    if (checkingUsers) {
      return res.status(500).json('Please try right information')
    }

    //Registring new user: if user doesn't exists with given information.
    try {
      const salt = await bcrypt.genSalt(10)
      const hashedPassword =  await bcrypt.hash(password, salt)
      let user = await User.create({
        name: name,
        email: email,
        password: hashedPassword,
      })
      const data = {
        user: {
          id: user._id
        }
      }
      //Sending authtoken.
      const authtoken = await jwt.sign(data, secret)
      res.json({authtoken:authtoken})
      //If any internal error loging on console.
    } catch (error) {
      console.log(error)
    }
  })





                                                        // Route:2    Login

// Route:2 This end point is to login user: "Post"  Loin not require
router.post('/login',
  body('email', 'invalid email').isEmail(),
  body('password', 'invalid password').isLength({ min: 5 }),
  async (req, res) => {

    //Getting user information from request body: Using destructuring
    const { email, password } = req.body


    //Checking Errors : if there are errors then return bad request.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let user

    //Login functionality
    try {
      //check user exists or not
      user = await User.findOne({email: email })
      if (!user) {
        return res.status(401).json('Please try right information')
      }

      //checking password is correct or not.
      let checkpassword = await bcrypt.compare(password, user.password)
      if (!checkpassword) {
        return res.status(401).json('Please try right information')
      }

      //this variable is for authtoken
      const data = {
        user: {
          id: user._id
        }
      }
      //Sending authtoken.
      const authtoken = jwt.sign(data, secret)
      res.json({authtoken: authtoken})
      //If any internal error loging on console.
    } catch (error) {
      console.log('Some internal error')
    }
  })



// Route:3 Getting user information
router.post('/getuser', fetchid, async (req, res) => {
  try {
    const userr = await User.findOne({ user: req.user.id })
    if (!userr) { res.status(404).send('Not Allowed') }
    res.json(userr)
  } catch (error) {
    console.log('Some internal error')
  }
})




module.exports = router