const express = require("express");
const { User } = require("../models/user");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const sign_up =  async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res
        .status(400)
        .json({ msg: "User with this username already exists" });
    }
    const hashedPass = await bcryptjs.hash(password, 6);
    let user = new User({
      username,
      password: hashedPass,
    });
    user = await user.save();
    res.json(user);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const sign_in =  async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).json({ msg: "No user found with this username " });
  }
  const isMatch = await bcryptjs.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ msg: "Wrong Password!" });
  }
  const token = jwt.sign({ id: user._id }, "passwordKey");

  res.json({ ...user._doc , token });
};

const auth = async (req, res, next) => {
    try {
      const token = req.header("auth-token");
      if (!token) {
        return res.status(400).json({ msg: "No Token" });
      }
      const verified = jwt.verify(token, "passwordKey");
      if (!verified) {
        return res.status(400).json({ msg: "No auth token,access not given" });
      }
      req.user = verified.id;
      req.token = token;
      next();
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  };

const get_user =  async (req, res) => {
  const user = await User.findById(req.user);
  res.json({ ...user._doc, token: req.token });
};

module.exports = {
    sign_up,
    sign_in,
    auth,
    get_user
};