//importing functions and packages from their roots
const db = require("../config/database");

// create new skill sent from controller
const createSkill = async (body) => {
  const { name } = body;

  //insert into skille db & check if the creating skill db name/value match skills db name/value
  const skill = await db.query(
    "INSERT INTO skills (name) VALUES ($1) RETURNING *",
    [name]
  );

  return skill.rows[0];
};

// get all created skills
const getAllSkills = async () => {
  const skills = await db.query("SELECT * FROM skills");

  return skills.rows;
};

// edit created skill
const editSkill = async (id, body) => {
  const { name } = body;

  // update skill
  const skill = await db.query(
    "UPDATE skills SET name = $1 WHERE id = $2 RETURNING *",
    [name, id]
  );

  return skill.rows[0];
};

// delete created skill
const deleteSkill = async (id) => {
  // check if skill wanted to delete exists
  const exists = await db.query("SELECT * FROM skills WHERE id = $1", [id]);

  if (!exists.rows[0]) {
    throw new Error("Skill does not exist");
  }

  const skill = await db.query("DELETE FROM skills WHERE id = $1 RETURNING *", [
    id,
  ]);

  return skill.rows[0];
};

//export all skill.service function
module.exports = {
  createSkill,
  getAllSkills,
  editSkill,
  deleteSkill,
};
