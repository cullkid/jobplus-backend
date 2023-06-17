//importing functions and packages from their roots
const db = require("../config/database");
const notificationServices = require("./notification.services");
const { jobReuseQuery } = require("../job reuseable query/job.queries");

// create a new job with the job db values sent from controler
const createJob = async (body) => {
  const {
    title,
    salary_type,
    salary,
    job_types,
    description,
    company_id,
    sector_id,
    category_id,
  } = body;

  const { rows } = await db.query(
    `INSERT INTO jobs (title, salary_type, salary, job_types, description, company_id, sector_id, category_id) 
VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
    [
      title,
      salary_type,
      salary,
      job_types,
      description,
      company_id,
      sector_id,
      category_id,
    ]
  );

  return rows[0];
  //  return job.rows[0];
};

// get all created jobs by insert into job db and select all created job & send to controller
const getAllJobs = async () => {
  const { rows } = await db.query('SELECT * FROM "jobs"');

  return rows;
};

//get all jobs with companies
const getAllJobsWithCompaniesAndSkills = async () => {
  const { rows } = await db.query(
    `
    SELECT
     jobs.*,
    json_agg(DISTINCT companies) AS company,
    json_agg(DISTINCT job_skills) AS jobskills,
     json_agg(DISTINCT skills) AS skills
    FROM jobs
     LEFT JOIN companies ON jobs.company_id = company_id
     LEFT JOIN job_skills ON jobs.id = job_skills.job_id
      LEFT JOIN skills ON job_skills.skill_id = skills.id
     GROUP BY jobs.id
    `
  );

  return rows;
};

const searchJobs = async (params) => {
  const { what, where } = params;

  // addedquery coming from reusable job service
  const addedQuery = `
    WHERE 
    (
      jobS.title ILIKE $4
      OR companies.name ILIKE $4
      OR jobs.id IN (
        SELECT job_id FROM job_skills WHERE skill_id IN (
          SELECT id FROM skills WHERE name ILIKE $4
        )
      )
    )
    AND
    (
      companies.city ILIKE $5
      OR companies.district ILIKE $5
    )
  `;

  //merging the imported jobreuseable query, added params, & added query
  const rows = jobReuseQuery(params, addedQuery, [`%${what}%`, `%${where}%`]);

  return rows;
};

//edit a created job id and new job db values sent from controller
const editJob = async (id, body) => {
  const {
    title,
    salary_type,
    salary,
    job_types,
    description,
    company_id,
    sector_id,
    category_id,
  } = body;

  //check if the editing job id match the job id from db, and also check thesame in the body
  const { rows } = await db.query(
    `UPDATE jobs SET title = $1, salary_type = $2, salary = $3, job_types = $4, description = $5, company_id = $6, 
sector_id = $7, category_id = $8 WHERE id = $9 RETURNING *`,
    [
      title,
      salary_type,
      salary,
      job_types,
      description,
      company_id,
      sector_id,
      category_id,
      id,
    ]
  );

  return rows[0];
};

// delete a created job if the job id sent from controler exist inside jobs db
const deleteJob = async (id) => {
  const { rows } = await db.query(
    "DELETE FROM jobs WHERE id = $1 RETURNING *",
    [id]
  );

  return rows[0];
};

//select jobs in each sectors
const listJobsInEachSector = async (id) => {
  const { rows } = await db.query(
    `SELECT
      sectors.*,
      json_agg(DISTINCT jobs) AS jobs
    FROM sectors
    LEFT JOIN jobs ON jobs.sector_id = sectors.id
    WHERE sectors.id = $1
    GROUP BY sectors.id`,
    [id]
  );
  return rows;
};

// export all job.service functions
module.exports = {
  createJob,
  getAllJobs,
  getAllJobsWithCompaniesAndSkills,
  searchJobs,
  editJob,
  deleteJob,
  listJobsInEachSector,
};
