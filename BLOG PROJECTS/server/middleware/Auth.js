var jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const isAuth = (req, res, next) => {
    const { verificationToken } = req.cookies;

    if (!verificationToken) {
        return res.status(401).json({ message: "You are not authorized to access this page" });
    };

    jwt.verify(verificationToken, process.env.PRIVATEKEY, function (err, decoded) {
        if (err) {
            return res.status(401).json({ message: err });
        };

        req.user = decoded.user;
        next();
    });
};

module.exports = isAuth;