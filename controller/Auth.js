const User = require("../model/Auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

const generateAccessToken = (userId) => {
  return jwt.sign({ sub: userId }, process.env.JWT_SECRET, {
    expiresIn: "15m", // Expires in 15 minutes
  });
};

const generateRefreshToken = (userId) => {
  return jwt.sign({ sub: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d", // Expires in 7 days
  });
};


const Register = async (req, res) => {
  try {
    const { username, password, name, email } = req.body;

    if (!username || !password) {
      return res.status(400).json({ msg: "All fields are required." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists." });
    }

    const uuid = uuidv4();
    const newUser = new User({
      uuid,
      username,
      password: hashedPassword,
      email,
      name,
    });
    console.log(newUser)
    await newUser.save();

    res.status(200).json({ msg: "Successfully registered." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal server error." });
  }
};


const Login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ msg: "Username and password are required." });
    }

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ msg: "Invalid username or password." });
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      return res.status(400).json({ msg: "Invalid username or password." });
    }

    const accessToken = generateAccessToken(user.uuid);
    const refreshToken = generateRefreshToken(user.uuid);

    res.status(200).json({
      accessToken,
      refreshToken,
      msg: "Successfully logged in.",
      user: {
        username: user.username,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal server error." });
  }
};

module.exports = {
  Register,
  Login,
};

