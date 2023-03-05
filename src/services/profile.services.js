//importing functions and packages from their roots
const db = require("../config/database");

// create new user profile by assigning all the db profile name we are creating ...
//into the body(func) that is sent from controller
const createProfile = async (body) => {
  const { job_title, min_salary, job_type, experience, sector_id, user_id } =
    body;

  //insert profile into bd & check if user id already has profile
  const { rows } = await db.query("SELECT * FROM profiles WHERE user_id = $1", [
    user_id,
  ]);
  if (rows.length > 0) {
    //if the user id already have, then return error
    throw new Error("User already has a profile");
  }

  //insert db and create new profile if the user id don't have profile yet
  const profile = await db.query(
    "INSERT INTO profiles (job_title, min_salary, job_type, experience, sector_id, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
    [job_title, min_salary, job_type, experience, sector_id, user_id]
  );

  return profile.rows[0]; //return profile that is created
};

//edit profile by finding id of profile want to edit and the body we want ..
//to edit, sent from controller
const editProfile = async (id, body) => {
  //sign in profile db name wanted to edit into body
  const { job_title, min_salary, job_type, experience, sector_id } = body;

  // check if profile id exists in profile db
  const { rows } = await db.query("SELECT * FROM profiles WHERE id = $1", [id]);
  if (!rows[0]) {
    throw new Error("Invalid id"); //return error if not exist
  }

  //insert the profile db name wanted to edit to replace the profile ...
  //we already have
  const { rows: editProfile } = await db.query(
    'UPDATE "profiles" SET job_title = $1, min_salary = $2, job_type = $3, experience = $4, sector_id = $5 WHERE id = $6 RETURNING *',
    [job_title, min_salary, job_type, experience, sector_id, id]
  );
  return editProfile[0]; //return the edited profile
};

// export all the functions inside profile.service
module.exports = {
  createProfile,
  editProfile,
};
