import * as authService from "./auth.service.js";
import { success } from "../../utils/response.js";

export const register = async (req, res, next) => {
  try {
    const user = await authService.registerUser(req.body);
    success(res, user, "User registered");
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { user, accessToken, refreshToken } = await authService.loginUser(
      req.body,
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
    });

    success(res, { user, accessToken }, "Login success");
  } catch (err) {
    next(err);
  }
};

export const logout = (req, res) => {
  res.clearCookie("refreshToken");
  success(res, null, "Logged out");
};
