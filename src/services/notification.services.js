//importing functions and packages from their roots
const db = require("../config/database");

//create notification table
const createNotificationJobs = async (body) => {
  const { user_id, job_id, type } = body;

  const { rows } = await db.query(
    "INSERT INTO user_jobs (user_id, job_id, type) VALUES ($1, $2, $3) RETURNING *",
    [user_id, job_id, type]
  );
  return rows[0];
};

//save notification jobs
const getNotificationJobs = async (matchingProfiles, job) => {
  // if (matchingProfiles.sector_id === job.sector_id) {
  const matchingProfileValues = matchingProfiles
    .filter(
      (profile) => ({ user_id: profile.user_id, job_id: profile.job_id })

      // profile.user_id === job.user_id
    )

    .map((profile) => ({
      user_id: profile.user_id,
      job_id: job.job_id,
    }));
  console.log("matchingProfileValues", matchingProfileValues);
  // }

  const { rows: profileRows } = await db.query(
    `
    SELECT *
    FROM user_jobs
    WHERE user_id = $1 AND job_id = $2 
    `,
    [
      matchingProfileValues[0].user_id,
      matchingProfileValues[0].job_id,
      // matchingProfileValues[0].type,
    ]
  );
  console.log("profileRows", profileRows);
  // return profileRows;
};

//export all notification.services functions
module.exports = {
  createNotificationJobs,
  getNotificationJobs,
};
