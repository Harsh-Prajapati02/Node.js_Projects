const role = (req, res, next) => {
  if (req.user.role !== 'Admin') {
    return res.status(403).json({ message: "Forbidden: Admins only" });
  }
  next();
};

module.exports = role