import User from "./auth.model.js";
import bcrypt from "bcryptjs";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt.js";

export const registerUser = async (data) => {
  const { name, email, password } = data;

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashed,
  });

  return user;
};

export const loginUser = async (data) => {
  const { email, password } = data;

  const user = await User.findOne({ email });

  if (!user) throw new Error("User not found");

  const match = await bcrypt.compare(password, user.password);

  if (!match) throw new Error("Invalid password");

  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  return { user, accessToken, refreshToken };
};
