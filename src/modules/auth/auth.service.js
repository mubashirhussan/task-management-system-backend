import User from "./auth.model.js";
import Company from "../company/company.model.js";
import bcrypt from "bcryptjs";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt.js";

export const registerUser = async (data) => {
  const { name, email, password, tenantId } = data;
  if (!tenantId) throw new Error("tenantId is required");

  const tenant = await Company.findById(tenantId);
  if (!tenant) throw new Error("Invalid tenantId");

  const normalizedEmail = email?.trim().toLowerCase();

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email: normalizedEmail,
    password: hashed,
    tenantId,
  });

  const safeUser = user.toObject();
  delete safeUser.password;
  return safeUser;
};

export const loginUser = async (data) => {
  const { email, password, tenantId } = data;
  if (!tenantId) throw new Error("tenantId is required");

  const normalizedEmail = email?.trim().toLowerCase();
  const user = await User.findOne({ email: normalizedEmail, tenantId });

  if (!user) throw new Error("User not found");

  const match = await bcrypt.compare(password, user.password);

  if (!match) throw new Error("Invalid password");

  const accessToken = generateAccessToken(user._id, String(user.tenantId));
  const refreshToken = generateRefreshToken(user._id, String(user.tenantId));

  const safeUser = user.toObject();
  delete safeUser.password;
  return { user: safeUser, accessToken, refreshToken };
};
