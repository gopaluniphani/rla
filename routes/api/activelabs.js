const express = require("express");

const auth = require("../../middleware/auth");

const Lab = require("../../models/Lab");
const ActiveLab = require("../../models/ActiveLab");
const Labcycle = require("../../models/Labcycle");

const Instructor = require("../../models/Instructor").Instructor;
const Student = require("../../models/Student").Student;

const router = express.Router();

/**
 * @route POST api/activelabs
 * @desc add activelabs
 * @access private
 */
router.post("/", auth, async (req, res) => {
  try {
    let instructor = await Instructor.findById(req.user.id);
    if (!instructor) throw Error("Instructor Not Found");

    console.log(req.body);
    let lab = await Lab.findById(req.body.lab_id);
    if (!lab) throw Error("lab not found");
    const activeLab = new ActiveLab({
      instructor: instructor._id,
      code: lab.code,
      name: lab.name,
    });

    const newLab = await activeLab.save();
    for (let i = 0; i < lab.labcycles.length; i++) {
      const lc = await Labcycle.findById(lab.labcycles[i]);

      const nlc = await new Labcycle({
        name: lc.name,
        description: lc.description,
      });
      const slc = await nlc.save();
      if (!slc) throw Error("something went wrong while saving labcycle");

      newLab.labcycles.push(slc._id);
    }

    const savedLab = await newLab.save();
    if (!savedLab) throw Error("Something went wrong while saving active lab");

    instructor.activeLabs.push(savedLab._id);
    let savedInstructor = await instructor.save();
    if (!savedInstructor)
      throw Error("Something went wrong while updating instructor");

    res.status(200).json(savedLab);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

/**
 * @route GET api/activelabs/:id
 * @desc get activelab
 * @access private
 */
router.get("/:id", auth, async (req, res) => {
  try {
    const lab = await ActiveLab.findById(req.params.id);
    if (!lab) throw Error("lab not found");

    res.status(200).json(lab);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

/**
 * @route GET api/activelabs/labcycle/:id
 * @desc get labcycle
 * @access private
 */
router.get("/labcycle/:id", auth, async (req, res) => {
  try {
    const labcycle = await Labcycle.findById(req.params.id);
    if (!labcycle) throw Error("labcycle not found");
    res.status(200).json(labcycle);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

/**
 * @route POST api/activelabs/delete
 * @desc delete labcycles
 * @access private
 */
router.post("/delete", auth, async (req, res) => {
  try {
    const instructor = await Instructor.findById(req.user.id);
    if (!instructor) throw Error("No permission to edit labcycles");

    const lab = await ActiveLab.findById(req.body.lab_id);
    if (!lab) throw Error("lab doesn't exist");

    Labcycle.deleteOne({ _id: req.body.labcycle_id });
    lab.labcycles.remove(req.body.labcycle_id);

    lab.save();

    res.status(200).json({ deleted: "Deleted Lab Cycle Successfully" });
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

/**
 * @route POST api/activelabs/modify
 * @desc modify labcycles
 * @access private
 */
router.post("/modify", auth, async (req, res) => {
  try {
    let lab = await ActiveLab.findById(req.body.lab_id);
    if (!lab) throw Error("lab not found");

    let labcycle = await Labcycle.findById(req.body.labcycle_id);
    if (!labcycle) throw Error("lab cycle not found");

    if (req.body.name) labcycle.name = req.body.name;
    if (req.body.description) labcycle.description = req.body.description;

    const savedLabcycle = await labcycle.save();
    if (!savedLabcycle)
      throw Error("Something went wrong while updating labcycle");
    res.status(200).json({ updated: "labcycle updated successfully" });
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

/**
 * @route POST api/activelabs/add
 * @desc adding new labcycles to lab
 * @access private
 */
router.post("/add", auth, async (req, res) => {
  try {
    let lab = await ActiveLab.findById(req.body.lab_id);
    if (!lab) throw Error("lab not found");

    const { name, description } = req.body.labcycle;
    if (!name || !description) throw Error("Enter all details");

    const labcycle = new Labcycle({ name, description });
    const savedLabcycle = await labcycle.save();
    if (!savedLabcycle) throw Error("Error while saving labcycle");

    lab.labcycles.push(savedLabcycle._id);
    await lab.save();
    res.status(200).json(labcycle);
  } catch (e) {
    console.log(e);
    res.status(400).json({ msg: e.message });
  }
});

// support function to search in an array
const findInArray = (l, x) => {
  for (let i = 0; i < l.length; i++) {
    console.log(l[i], x);
    if (l[i].equals(x)) {
      console.log("found");
      return true;
    }
  }
  return false;
};

/**
 * @route POST api/activelabs/section/:id
 * @desc adding a section to active labs
 * @access private
 */
router.post("/section/:id", auth, async (req, res) => {
  try {
    let lab = await ActiveLab.findById(req.params.id);
    if (!lab) throw Error("lab not found");
    if (!req.body.department || !req.body.year || !req.body.section)
      throw Error("Enter all details");
    const { department, year, section } = req.body;
    let students = await Student.find({
      department: department,
      year: year,
      section: section,
    });
    const response = [];
    students.forEach(async (student) => {
      if (!findInArray(lab.students, student._id)) {
        lab.students.push(student._id);
        student.activeLabs.push(lab._id);
        const savedStudent = await student.save();
        response.push(savedStudent._id);
      }
    });
    const savedLab = await lab.save();
    console.log(response);
    res.status(200).json(response);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

/**
 * @route POST api/activelabs/student/:id
 * @desc adding a student to activelab
 * @access private
 */
router.post("/student/:id", auth, async (req, res) => {
  try {
    let student = await Student.findOne({ college_id: req.body.college_id });
    if (!student) throw Error("student not found");
    let lab = await ActiveLab.findById(req.params.id);
    if (!lab) throw Error("lab not found");

    if (!findInArray(student.activeLabs, lab._id)) {
      student.activeLabs.push(lab._id);
      lab.students.push(student._id);
      const savedLab = await lab.save();
      const savedStudent = await student.save();
      return res.status(200).json({ id: savedStudent._id });
    } else {
      return res
        .status(200)
        .json({ invalid: "Lab already contains the student" });
    }
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

/**
 * @route POST /api/activelabs/completed
 * @desc marking an activelab completed
 * @access private
 */
router.post("/completed", auth, async (req, res) => {
  try {
    const instructor = await Instructor.findById(req.user.id);
    const student = await Student.findById(req.user.id);
    if (instructor) {
      const lab_id = req.body.lab_id;
      if (findInArray(instructor.activeLabs, lab_id)) {
        instructor.activeLabs.remove(lab_id);
        instructor.completedLabs.push(lab_id);
        await instructor.save();
      } else {
        throw Error("lab not found");
      }

      const lab = await ActiveLab.findById(lab_id);
      if (!lab) Error("lab not found");

      res.status(200).json(lab);
    } else if (student) {
      const lab_id = req.body.lab_id;
      if (findInArray(student.activeLabs, lab_id)) {
        student.activeLabs.remove(lab_id);
        student.completedLabs.push(lab_id);
        await student.save();
      } else {
        throw Error("lab not found");
      }

      const lab = await ActiveLab.findById(lab_id);
      if (!lab) Error("lab not found");

      res.status(200).json(lab);
    }
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

module.exports = router;
