const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();

const signUp = async (req, res) => {

    const { name, email, password } = req.body;

    if (req.body.role) {
        // User can not send the role from req.body
        return res
            .status(400)
            .send({ message: "Role can not be sent from req.body" });
    }

    if (!name || !email || !password) {
        return res.status(400).send({ message: "Please fill in all fields" });
    }

    try {
        const isUserExist = await userModel.findOne({ email });

        if (isUserExist) {
            return res.status(400).send({ message: "Email already exists" });
        }

        bcrypt.hash(password, 5, async (err, hash) => {
            // Store hash in your password DB.
            if (err) {
                return res.status(500).send({ message: "Error hashing password" });
            }

            await userModel.create({ name, email, password: hash });
            res.status(200).json({ message: "User created successfully" });
        });
    } catch (error) {
        res.status(400).send({ message: error });
    }
};

const signIn = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send({ message: "Please fill in all fields" });
    };

    const isExistUser = await userModel.findOne({ email });

    if (!isExistUser) {
        return res.status(400).send({ message: "Email does not exist" });
    }

    bcrypt.compare(password, isExistUser.password, function (err, result) {
        if (err) {
            return res.status(500).send({ message: "Error comparing password" });
        };

        if (result) {
            // rest is UserData without password
            const { password, ...rest } = isExistUser._doc;

            jwt.sign({ user: rest }, process.env.PRIVATEKEY, function (err, token) {
                if (err) {
                    return res.status(500).send({ message: "Error generating token" });
                };

                res
                    .cookie("verificationToken", token)
                    .status(200)
                    .send({ message: "User logged in successfully", user: rest });
            });
        } else {
            res.status(400).send({ message: "Password is incorrect" });
        }
    });
};

module.exports = { signUp, signIn };