
const express = require('express');
const UserModel = require('../models/userLoginModel')
const { body, validationResult } = require('express-validator');
const bodyParser = require('body-parser');
const routes = express.Router();
routes.use(express.json());
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const secret = "RESTAPI";
routes.post("/register",
    body('email').isEmail(),
    body('password').isLength({ min: 5, max: 12 }),
    body("name").isAlpha(),
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const { name, email, password } = req.body;
            const user = await UserModel.findOne({ email });
            if (user) {
                return res.status(409).json({
                    status: "Failed",
                    message: "User already exists"
                })
            }
            bcrypt.hash(password, 10, async function (err, hash) {
                // Store hash in your password DB.
                if (err) {
                    return res.status(500).json({
                        status: "Failed",
                        message: err.message
                    })
                }
                const data = await UserModel.create({
                    name,
                    email,
                    password: hash
                });
                return res.status(200).json({
                    status: "success",
                    data : data
                })
            });
        } catch (e) {
            return res.status(400).json({
                status: "Failed",
                message: e.message
            })
        }
    });

routes.post("/login",
    body('email').isEmail(),
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const { name, email, password } = req.body;
            const user = await UserModel.findOne({ email });
            if (!user) {
                return res.status(400).json({
                    status: "Failed",
                    message: "Unkown User"
                })
            }
            bcrypt.compare(password, user.password, function (err, result) {
                // result == true
                if (err) {
                    return res.status(400).json({
                        status: "Failed",
                        message: err.message
                    })
                }
                if (result) {
                    const token = jwt.sign({
                        exp: Math.floor(Date.now() / 1000) + (60 * 60),
                        data: user._id
                    }, secret );

                    return res.status(200).json({
                        status: "success",
                        message: "Login successfull",
                        token : token
                    })
                }
                else {
                    return res.status(400).json({
                        status: "Failed",
                        message: "Invalid password"
                    })
                }
            });
        } catch (e) {
            return res.status(400).json({
                status: "Failed",
                message: e.message
            })
        }
    });
module.exports = routes;