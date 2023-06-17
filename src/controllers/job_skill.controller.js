//importing functions and packages from their roots
const jobSkillServices = require("../services/job_skill.services");

// create job skills
const createJobSkill = async (req, res) => {
  try {
    const body = req.body;
    const jobSkill = await jobSkillServices.createJobSkill(body);
    res.status(201).send({
      message: "Job-skill created successfully",
      data: jobSkill,
    });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// get all created skills
const getAllJobSkills = async (req, res) => {
  try {
    const skills = await jobSkillServices.getAllJobSkills();
    res.status(200).send({
      message: "All created job-skills",
      data: skills,
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
};

// delete job skills
const deleteJobSkill = async (req, res) => {
  try {
    const id = req.params.id;
    const jobSkill = await jobSkillServices.deleteJobSkill(id);
    res.status(200).send({
      message: "Deleted successfully",
      data: jobSkill,
    });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// export
module.exports = {
  createJobSkill,
  getAllJobSkills,
  deleteJobSkill,
};
