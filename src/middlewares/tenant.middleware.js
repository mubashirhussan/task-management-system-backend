const resolveTenantId = (req) => {
  return (
    req.headers["x-tenant-id"] ||
    req.body?.tenantId ||
    req.query?.tenantId ||
    null
  );
};

export const requireTenant = (req, res, next) => {
  const tenantId = resolveTenantId(req);

  if (!tenantId) {
    return res.status(400).json({
      success: false,
      message: "tenantId is required",
    });
  }

  req.tenantId = tenantId;
  next();
};

