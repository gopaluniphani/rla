const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const config = require("../../config");
const auth = require("../../middleware/auth");
const Student = require("../../models/Student").Student;

const { JWT_SECRET } = config;
const router = express.Router();

/**
 * @route POST api/student/login
 * @desc login student
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
    const student = await Student.findOne({ college_id });
    if (!student) throw Error("Student Does not exist");

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) throw Error("Invalid credentials");

    const token = jwt.sign({ id: student._id }, JWT_SECRET);
    if (!token) throw Error("Couldnt sign the token");

    let {
      first_name,
      last_name,
      email,
      section,
      year,
      department,
      activeLabs,
      completedLabs,
    } = student;
    res.status(200).json({
      student_token: token,
      student: {
        college_id,
        first_name,
        last_name,
        email,
        section,
        year,
        department,
        activeLabs,
        completedLabs,
      },
    });
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

/**
 * @route POST api/student/register
 * @desc register a student
 * @access public
 */
router.post("/register", async (req, res) => {
  const {
    college_id,
    first_name,
    last_name,
    email,
    section,
    year,
    department,
    password,
  } = req.body;

  // Simple validation
  if (!college_id || !section || !year || !department || !email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  try {
    const student = await Student.findOne({ college_id });
    if (student) throw Error("Student already exists");

    const salt = await bcrypt.genSalt(10);
    if (!salt) throw Error("Something went wrong with bcrypt");

    const hash = await bcrypt.hash(password, salt);
    if (!hash) throw Error("Something went wrong hashing the password");

    const newStudent = new Student({
      college_id,
      first_name,
      last_name,
      email,
      section,
      year,
      department,
      password: hash,
    });

    const savedStudent = await newStudent.save();
    if (!savedStudent) throw Error("Something went wrong saving the student");

    const token = jwt.sign({ id: savedStudent._id }, JWT_SECRET);

    res.status(200).json({
      student_token: token,
      student: {
        college_id,
        first_name,
        last_name,
        email,
        section,
        year,
        department,
        activeLabs: savedStudent.activeLabs,
        completedLabs: savedStudent.completedLabs,
      },
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

/**
 * @route GET /api/student
 * @desc get the details of a student
 * @access private
 */
router.get("/details", auth, async (req, res) => {
  try {
    const student = await Student.findById(req.user.id).select("-password");
    if (!student) throw Error("Student Doesn't Exist");
    res.json(student);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

/**
 * @route GET /api/student/:id
 * @desc retreive student with id
 * @access private
 */
router.get("/:id", auth, async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) throw Error("student not found");
    res.status(200).json(student);
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
    const student = await Student.findById(req.user.id).select("-password");
    if (!student) throw Error("student doesnt't exist");
    const {
      college_id,
      first_name,
      last_name,
      email,
      department,
      year,
      section,
    } = req.body;
    student.college_id = college_id;
    student.first_name = first_name;
    student.last_name = last_name;
    student.department = department;
    student.email = email;
    student.year = year;
    student.section = section;
    const savedStudent = await student.save();
    res.status(200).json(savedStudent);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

/**
 * @route POST api/student/password
 * @desc change the password
 * @access private
 */
router.post("/password", auth, async (req, res) => {
  try {
    const student = await Student.findById(req.user.id);
    if (!student) throw Error("student doesn't exist");
    const { oldPassword, newPassword } = req.body;

    const isMatch = await bcrypt.compare(oldPassword, student.password);
    if (!isMatch) throw Error("Invalid credentials");

    const salt = await bcrypt.genSalt(10);
    if (!salt) throw Error("Something went wrong with bcrypt");

    const hash = await bcrypt.hash(newPassword, salt);
    if (!hash) throw Error("Something went wrong while hashing the password");

    student.password = hash;
    const savedStudent = await student.save();
    res.status(200).json({ changed: "password changed successfully" });
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

module.exports = router;
