const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const config = require("../../config");
const auth = require("../../middleware/auth");
const Instructor = require("../../models/Instructor").Instructor;

const { JWT_SECRET } = config;
const router = express.Router();

/**
 * @route POST api/instructor/login
 * @desc login instructor
 * @access public
 */
router.post("/login", async (req, res) => {
  const { college_id, password } = req.body;

  // Simple validation
  if (!college_id || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  try {
    // Check for existing user
    const instructor = await Instructor.findOne({ college_id });
    if (!instructor) throw Error("Instructor doesn't exist");

    const isMatch = await bcrypt.compare(password, instructor.password);
    if (!isMatch) throw Error("Invalid credentials");

    const token = jwt.sign({ id: instructor._id }, JWT_SECRET);
    if (!token) throw Error("Couldnt sign the token");

    let {
      first_name,
      last_name,
      email,
      department,
      activeLabs,
      completedLabs,
    } = instructor;
    res.status(200).json({
      instructor_token: token,
      instructor: {
        college_id,
        first_name,
        last_name,
        email,
        department,
        activeLabs,
        completedLabs,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({ msg: e.message });
  }
});

/**
 * @route POST api/instructor/register
 * @desc register a instructor
 * @access public
 */
router.post("/register", async (req, res) => {
  const {
    college_id,
    first_name,
    last_name,
    email,
    department,
    password,
  } = req.body;

  // Simple validation
  if (!college_id || !department || !email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  try {
    const instructor = await Instructor.findOne({ college_id });
    if (instructor) throw Error("Instructor already exists");

    const salt = await bcrypt.genSalt(10);
    if (!salt) throw Error("Something went wrong with bcrypt");

    const hash = await bcrypt.hash(password, salt);
    if (!hash) throw Error("Something went wrong while hashing the password");

    const newInstructor = new Instructor({
      college_id,
      first_name,
      last_name,
      email,
      department,
      password: hash,
    });

    const savedInstructor = await newInstructor.save();
    if (!savedInstructor)
      throw Error("Something went wrong saving the instructor");

    const token = jwt.sign({ id: savedInstructor._id }, JWT_SECRET);

    res.status(200).json({
      instructor_token: token,
      instructor: {
        college_id,
        first_name,
        last_name,
        email,
        department,
        activeLabs: savedInstructor.activeLabs,
        completedLabs: savedInstructor.completedLabs,
      },
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

/**
 * @route GET /api/instructor/details
 * @desc get the details of a instructor
 * @access private
 */
router.get("/details", auth, async (req, res) => {
  try {
    const instructor = await Instructor.findById(req.user.id).select(
      "-password"
    );
    if (!instructor) throw Error("instructor Doesn't Exist");
    res.json(instructor);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

/**
 * @route POST api/instructor/profile
 * @desc update the profile
 * @access private
 */
router.post("/profile", auth, async (req, res) => {
  try {
    const instructor = await Instructor.findById(req.user.id).select(
      "-password"
    );
    if (!instructor) throw Error("instructor doesnt't exist");
    const { college_id, first_name, last_name, email, department } = req.body;
    instructor.college_id = college_id;
    instructor.first_name = first_name;
    instructor.last_name = last_name;
    instructor.department = department;
    instructor.email = email;
    const savedInstructor = await instructor.save();
    res.status(200).json(savedInstructor);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

/**
 * @route POST api/instructor/password
 * @desc change the password
 * @access private
 */
router.post("/password", auth, async (req, res) => {
  try {
    const instructor = await Instructor.findById(req.user.id);
    if (!instructor) throw Error("instructor doesn't exist");
    const { oldPassword, newPassword } = req.body;

    const isMatch = await bcrypt.compare(oldPassword, instructor.password);
    if (!isMatch) throw Error("Invalid credentials");

    const salt = await bcrypt.genSalt(10);
    if (!salt) throw Error("Something went wrong with bcrypt");

    const hash = await bcrypt.hash(newPassword, salt);
    if (!hash) throw Error("Something went wrong while hashing the password");

    instructor.password = hash;
    const savedInstructor = await instructor.save();
    res.status(200).json({ changed: "password changed successfully" });
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

module.exports = router;
