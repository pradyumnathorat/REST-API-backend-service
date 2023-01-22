const express = require('express');
const UserModel = require('../models/userLoginModel')
const bodyParser = require('body-parser');
const routes = express.Router();
routes.use(express.json());
const jwt = require("jsonwebtoken");
const secret = "RESTAPI";
const blogModel = require("../models/blogs");


routes.get("/posts", async (req, res) => {
    try {
        const blogs = await blogModel.find({ user: req.user });
        res.status(200).json({
            posts: blogs
        })
    } catch (err) {
        return res.status(400).json({
            status: "Failed",
            message: err.message
        })
    }
})

routes.post("/posts", async (req, res) => {
    try {
        const blog = await blogModel.create({
            title: req.body.title,
            body: req.body.body,
            image : req.body.image,
            user: req.user
        })
        res.status(200).json({
            status: "post created",
            data : blog
        })
    } catch (err) {
        return res.status(400).json({
            status: "Failed",
            message: err.message
        })
    }
});

routes.delete("/posts/:postId", async (req, res) => {
    try {
        const blog = await blogModel.findById({ _id: req.params.postId });
        if (blog.user == req.user) {
            const blog = await blogModel.findByIdAndDelete({ _id: req.params.postId });
            res.status(200).json({
                status: "Successfully deleted",
            })
        } else {
            res.status(500).json({
                error: 'can not delete blog'
            })
        }
    } catch (err) {
        res.status(400).json({
            status: "Failed",
            message: err.message
        })
    }

})

routes.put("/posts/:postId", async (req, res) => {
    try {
        const blog = await blogModel.findById({ _id: req.params.postId });
        if (blog.user == req.user) {
            const blog = await blogModel.findByIdAndUpdate({ _id: req.params.postId } , {$set:req.body});
            res.status(200).json({
                status: "success",
            })
        } else {
            res.status(500).json({
                error: 'can not update blog'
            })
        }
    } catch (err) {
        res.status(400).json({
            status: "Failed",
            message: err.message
        })
    }

})



module.exports = routes;