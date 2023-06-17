//importing functions and packages from their roots
const userJobServices = require("../services/user_job.services");

// create new user jobs
const createUserJob = async (req, res) => {
  const body = { ...req.body, user_id: req.user.id };
  console.log("body", body);
  try {
    const userJob = await userJobServices.createUserJob(body);
    res.status(201).send({
      message: "SUccessful",
      data: userJob,
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
};

// get all created user jobs
const getAllAvailableUserJobsByUserAndType = async (req, res) => {
  const body = { ...req.body, user_id: req.user.id, ...req.query };
  try {
    const userJobs = await userJobServices.getAllAvailableUserJobsByUserAndType(
      body
    );
    res.status(200).send({
      message: "Successful",
      data: userJobs,
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
};

// delete one particuler user job
const deleteParticularUserJob = async (req, res) => {
  try {
    const userJob = await userJobServices.deleteParticularUserJob(
      req.params.id
    );
    res.status(200).send({
      message: "Successful",
      data: userJob,
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
};

// delete all user jobs by user_id and type
const deleteAllUserJobsTypeByUserAndType = async (req, res) => {
  const body = { ...req.body, user_id: req.user.id };
  try {
    const userJobs = await userJobServices.deleteAllUserJobsTypeByUserAndType(
      body
    );
    res.status(200).send({
      message: "Successful",
      data: userJobs,
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
};

// export
module.exports = {
  createUserJob,
  getAllAvailableUserJobsByUserAndType,
  deleteParticularUserJob,
  deleteAllUserJobsTypeByUserAndType,
};
