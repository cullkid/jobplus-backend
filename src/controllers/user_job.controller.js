//importing functions and packages from their roots
const userJobServices = require("../services/user_job.services");

// create new user job & sed to service, read service for more clarification
const createUserJob = async (req, res) => {
  //sending a req to the createduserjob db sending to service indivitually, and with ..
  //this the user id will be will be provide even when used only job id & type
  const body = { ...req.body, user_id: req.user.id }; //, job_id: req.jobs.id
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

// get all created user jobs in different types, read service for more clarification
const getAllAvailableUserJobsByUserAndType = async (req, res) => {
  //sending a req to the createduserjob db sending to service indivitually, and with ..
  //this the user id will be will be provide even when used only job id & type
  //the '...req.query' contain the 'limit' & 'offset' params passed in service, and ..
  //we added it here to allow the frontend to use it on url by adding '?page=1&limit=10'
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

// delete one particuler user job, go to service for more clarification
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
  //sending a req to the createduserjob db sending to service indivitually, and with ..
  //this the user id will be will be provide even when used only job id & type
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

// export all user-job.controller functions
module.exports = {
  createUserJob,
  getAllAvailableUserJobsByUserAndType,
  deleteParticularUserJob,
  deleteAllUserJobsTypeByUserAndType,
};
