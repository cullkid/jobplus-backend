//importing functions and packages from their roots
const db = require("../config/database");

//create notification table
const createNotificationJobs = async (body) => {
  console.log("rows", body);
  const { rows } = await db.query(
    "INSERT INTO user_jobs (user_id, job_id, type) VALUES ($1, $2, $3) RETURNING *",
    [user_id, job_id, type]
  );
  return rows[0];
};

//export all notification.services functions
module.exports = {
  createNotificationJobs,
};
