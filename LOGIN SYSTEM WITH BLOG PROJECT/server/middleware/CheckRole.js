const isAdmin = (req, res, next) => {
    if (req.user.role != "admin") {
        return res.status(403).send({ message: "You don't have permission to get all notes" });
    };
    next();
};

module.exports = isAdmin;