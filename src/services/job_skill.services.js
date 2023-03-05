//importing functions and packages from their roots
const db = require("../config/database");

// create job skills by insert job id & skills id sent from controller to match their origin db
const createJobSkill = async (body) => {
  const { job_id, skill_id } = body;
  const { rows } = await db.query(
    "INSERT INTO job_skills (job_id, skill_id) VALUES ($1, $2) RETURNING *",
    [job_id, skill_id]
  );
  return rows[0];
};

// get all created skills
const getAllJobSkills = async () => {
  const skills = await db.query(
    `SELECT 
    job_skills.*,
    json_agg(DISTINCT skills) AS skills
     FROM job_skills
     LEFT JOIN skills ON job_skills.skill_id = skills.id
     GROUP BY job_skills.id
     `
  );

  return skills.rows;
};

// delete job skills id sent from controler by confirmimg the id exist in jobskill db
const deleteJobSkill = async (id) => {
  const { rows } = await db.query("DELETE FROM job_skills WHERE id = $1", [id]);
  return rows[0];
};

// export all jobskill.service function
module.exports = {
  createJobSkill,
  getAllJobSkills,
  deleteJobSkill,
};
