import jwt from "jsonwebtoken";

export const generateAccessToken = (userId, tenantId) => {
  return jwt.sign({ userId, tenantId }, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });
};

export const generateRefreshToken = (userId, tenantId) => {
  return jwt.sign({ userId, tenantId }, process.env.JWT_REFRESH, {
    expiresIn: "7d",
  });
};
