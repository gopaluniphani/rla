const express = require("express");

const Lab = require("../../models/Lab");
const Labcycle = require("../../models/Labcycle");

const router = express.Router();

/**
 * @route GET api/labs/list
 * @desc get all labs
 * @access public
 */
router.get("/list", async (req, res) => {
  try {
    const labs = await Lab.find();
    if (!labs) throw Error("no labs");
    res.status(200).json(labs);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

/**
 * @route GET api/labs/:id
 * @desc get lab
 * @access public
 */
router.get("/:id", async (req, res) => {
  try {
    const lab = await Lab.findById(req.params.id);
    if (!lab) throw Error("no lab");
    res.status(200).json(lab);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

/**
 * @route POST api/labs
 * @desc create a lab
 * @access public
 */
router.post("/", async (req, res) => {
  try {
    const { code, name } = req.body;
    if (!code || !name) throw Error("Fill all details");
    const newLab = new Lab({ code, name });
    const lab = await newLab.save();
    if (!lab) throw Error("Something went wrong while saving lab");
    res.status(200).json(lab);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

/**
 * @route DELETE api/labs/:id
 * @desc delete a lab
 * @access public
 */
router.delete("/:id", async (req, res) => {
  try {
    const lab = await Lab.findById(req.params.id);
    if (!lab) throw Error("No Lab Found");

    const removed = await lab.remove();
    if (!removed) throw Error("Something went wrong while removing a lab");
    res.status(200).json({ success: true });
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

/**
 * @route POST api/labs/labcycle/:id
 * @desc adding a labcycle
 * @access public
 */
router.post("/labcycle/:id", async (req, res) => {
  try {
    const lab = await Lab.findById(req.params.id);
    if (!lab) throw Error("no lab found");

    const { name, description } = req.body;
    if (!name) throw Error("Provide name for labcycle");

    const newLabcycle = new Labcycle({
      name,
      description,
    });

    const labcycle = await newLabcycle.save();
    if (!labcycle)
      throw Error("something wrong happened while adding labcycle");

    lab.labcycles.push(labcycle._id);
    const updatedLab = await lab.save();
    if (!updatedLab)
      throw Error("Something wrong happened while adding lab cycles");
    res.status(200).json(labcycle);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

/**
 * @route GET /api/labs/labcycle/:id
 * @desc get labcycle
 * @access public
 */
router.get("/labcycle/:id", async (req, res) => {
  try {
    const labcycle = await Labcycle.findById(req.params.id);
    if (!labcycle) throw Error("labcycle not found");

    res.status(200).json(labcycle);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

module.exports = router;
