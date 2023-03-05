//importing functions and packages from their roots
const jobService = require("../services/job.services");

// create new job & request for body from service
const createJob = async (req, res) => {
  try {
    const job = await jobService.createJob(req.body);
    res.status(201).send({
      message: "Job created successfully",
      data: job,
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
};

// get all created jobs from service
const getAllJobs = async (req, res) => {
  try {
    const jobs = await jobService.getAllJobs();
    res.status(200).send({ data: jobs });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

//get all jobs with their companies
const getAllJobsWithCompaniesAndSkills = async (req, res) => {
  try {
    const jobs = await jobService.getAllJobsWithCompaniesAndSkills();
    return res.status(200).json({ data: jobs });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

// search jobs
const searchJobs = async (req, res) => {
  const body = { ...req.body, ...req.query, user_id: req.user.id };
  // console.log("body", body);
  try {
    const jobs = await jobService.searchJobs(body);
    res.status(200).send(jobs);
  } catch (err) {
    res
      .status(400)
      .send(err.message, "Sorry, this job is not available in the location");
  }
};

//edit created job with
const editJob = async (req, res) => {
  try {
    const job = await jobService.editJob(req.params.id, req.body);
    res.status(200).send({
      message: "Updated successfully",
      data: job,
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
};

// delete created job
const deleteJob = async (req, res) => {
  try {
    const job = await jobService.deleteJob(req.params.id);
    res.status(200).send({
      message: "Deleted successfully",
      data: job,
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
};

//get all jons in a sector
const listJobsInEachSector = async (req, res) => {
  try {
    const sectorJobs = await jobService.listJobsInEachSector(
      req.params.id,
      req.body
    );
    res.status(200).json({ data: sectorJobs });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// export all the job.controller functions
module.exports = {
  createJob,
  getAllJobs,
  getAllJobsWithCompaniesAndSkills,
  searchJobs,
  editJob,
  deleteJob,
  listJobsInEachSector,
};
