// Handle invalid routes
export const routeError = (req, res, next) => {
  res.status(404).json({ error: "Route not found" });
};