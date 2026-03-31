import * as companyService from "./company.service.js";
import { success } from "../../utils/response.js";

export const create = async (req, res, next) => {
  try {
    const company = await companyService.createCompany(req.body);
    success(res, company, "Company created");
  } catch (err) {
    next(err);
  }
};

