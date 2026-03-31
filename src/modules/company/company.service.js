import Company from "./company.model.js";

const toSlug = (value = "") =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export const createCompany = async ({ name, slug }) => {
  if (!name) throw new Error("Company name is required");

  const generatedSlug = slug ? toSlug(slug) : toSlug(name);
  if (!generatedSlug) throw new Error("Invalid company name/slug");

  const existing = await Company.findOne({
    $or: [{ name: name.trim() }, { slug: generatedSlug }],
  });

  if (existing) throw new Error("Company already exists");

  return Company.create({ name: name.trim(), slug: generatedSlug });
};

