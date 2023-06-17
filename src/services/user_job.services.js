//importing functions and packages from their roots
const db = require("../config/database");
const { jobReuseQuery } = require("../job reuseable query/job.queries");

const createUserJob = async (body) => {
  const { user_id, job_id, type } = body;

  // check if user already applied and saved for this job
  const checkUserJob = await db.query(
    "SELECT * FROM user_jobs WHERE user_id = $1 AND job_id = $2 AND type = $3",
    [user_id, job_id, type]
  );

  //if the user has applied and saved the job, then return
  if (checkUserJob.rows.length > 0) {
    throw new Error("User already applied and saved this job");
  }

  //if not, go on and create  new user-job
  const { rows } = await db.query(
    "INSERT INTO user_jobs (user_id, job_id, type) VALUES ($1, $2, $3) RETURNING *",
    [user_id, job_id, type]
  );
  return rows[0];
};

const getAllAvailableUserJobsByUserAndType = async (params) => {
  const { type, user_id } = params;

  const addedQuery = `
    WHERE jobs.id IN (
      SELECT job_id FROM "user_jobs" WHERE user_id = $4 AND type = $5
    )
  `;

  //merging the imported jobreuseable query, added params, & added query to work together
  const result = jobReuseQuery(params, addedQuery, [user_id, type]);

  return result;
};

//delete one particuler user-job by its id
const deleteParticularUserJob = async (id) => {
  const { rows } = await db.query(
    "DELETE FROM user_jobs WHERE id = $1 RETURNING *",
    [id]
  );
  return rows[0];
};

// delete all user jobs in one particlar chosed type, including user id
const deleteAllUserJobsTypeByUserAndType = async (body) => {
  const { user_id, type } = body;
  const { rows } = await db.query(
    "DELETE FROM user_jobs WHERE user_id = $1 AND type = $2 RETURNING *",
    [user_id, type]
  );
  return rows;
};

// export all user-job.service functions
module.exports = {
  createUserJob,
  getAllAvailableUserJobsByUserAndType,
  deleteParticularUserJob,
  deleteAllUserJobsTypeByUserAndType,
};
