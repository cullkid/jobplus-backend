//importing functions and packages from their roots
const skillServices = require("../services/skill.services");

// create new skill
const createSkill = async (req, res) => {
  try {
    const skill = await skillServices.createSkill(req.body);
    res.status(201).send({
      message: "Skill created successfully",
      data: skill,
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
};

// get all created skills
const getAllSkills = async (req, res) => {
  try {
    const skills = await skillServices.getAllSkills();
    res.status(200).send({
      message: "All created skills",
      data: skills,
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
};

// skill  edit
const editSkill = async (req, res) => {
  try {
    const skill = await skillServices.editSkill(req.params.id, req.body);
    res.status(200).send({
      message: "Successfully updated",
      data: skill,
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
};

// delete skill
const deleteSkill = async (req, res) => {
  try {
    const skill = await skillServices.deleteSkill(req.params.id);
    res.status(200).send({
      message: "Successfully deleted",
      data: skill,
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
};

//export
module.exports = {
  createSkill,
  getAllSkills,
  editSkill,
  deleteSkill,
};
