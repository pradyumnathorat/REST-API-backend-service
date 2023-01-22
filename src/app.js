const express = require('express');
const app = express();
const loginRoutes = require('./routes/login');
const postRoutes = require('./routes/posts');
const e = require('express');
const jwt = require("jsonwebtoken");
const secret = "RESTAPI";

app.use("/posts", (req, res, next) => {
    const token = req.headers.authorization.split("Bearer ")[1];
    if (token) {
        jwt.verify(token, secret, function (err, decoded) {
            if (err) {
                return res.status(403).json({
                    status: "Failed",
                    message: err.message
                });
            }
            req.user = decoded.data
            next();
        });
    } else {
        res.status(403).json({
            status: "Failed",
            message: "User is not authorized"
        })
    }
})



app.use(loginRoutes);
app.use(postRoutes);




module.exports = app;