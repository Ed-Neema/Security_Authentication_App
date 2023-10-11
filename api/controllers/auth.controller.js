import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res) => {
  const { name, email, password, role } = req.body;
  //   check if fields exist
  if (!name || !email || !password || !role) {
    next(errorHandler(400, "All fields required"))
  }

  //check if email adddress already exists
  const userAvailable = await User.findOne({
    email,
  });
  if (userAvailable) {
    next(errorHandler(400, "User already registered!"));
  }
  console.log("After available");
  //   create new user if email address doesn't exist

  const hashedPassword = bcryptjs.hashSync(password, 10); //number of rounds for the salt
  console.log("After hashed password")
  const newUser = await User.create({
    name,
    email,
    role,
    password: hashedPassword,
  });

  console.log(`User created ${newUser}`);
  if (newUser) {
    // res.status(201).json({ _id: newUser.id, email: newUser.email });
    res.status(201).json({ message: "User created successfully" });
  } else {
    next(errorHandler(400, "User not created"));
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    next(errorHandler(400, "All fields mandatory"));
  }

  // chech if user exists in db
  const user = await User.findOne({ email });
  if (!user) {
     return next(errorHandler(400, "Invalid Login Credentials"));
  }
  console.log(user)
  const { password: hashedPassword, ...rest } = user._doc;
  // compare passwords
  if (user && (await bcryptjs.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        // payload
        user: {
          name: user.name,
          email: user.email,
          role: user.role,
          id: user.id,
        },
      },
      //   secret
      process.env.ACCESS_TOKEN_SECRET,
      //   expiration date
      { expiresIn: "1h" }
    );
    const expiryDate = new Date(Date.now() + 3600000); // 1 hour
    res
      .cookie("access_token", accessToken, {
        httpOnly: true,
        expires: expiryDate,
      })
      .status(200)
      .json(rest);
    // res.status(200).json({ accessToken });
  } else {
    next(errorHandler(401, "Email or Password invalid"));
  }
};

export const signout = (req, res) => {
  res.clearCookie("access_token").status(200).json("Signout success!");
};