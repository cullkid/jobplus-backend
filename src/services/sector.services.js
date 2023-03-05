//importing functions and packages from their roots
const db = require("../config/database");

// create new sector(func) with arguments sen from sector.controller ...
// then enter db value needed from db inside the argument with curly bracket
const createSector = async (body) => {
  const { name, image } = body;
  //inserting the db values passed into the argument inside the sector db
  const { rows } = await db.query(
    "INSERT INTO sectors (name, image) VALUES ($1, $2) RETURNING *",
    [name, image]
  );
  return rows[0];
};

//to get all created sectors
const getAllSectors = async () => {
  const { rows } = await db.query('SELECT * FROM "sectors"');
  return rows;
};

//get all sectors with their categories
const getAllSectorsWithCategories = async () => {
  const { rows } = await db.query(`
    SELECT
      s.id,
      s.name,
      s.image,
      json_agg(
        json_build_object(
          'id', c.id,
          'name', c.name,
          'jobs_count', (
            SELECT COUNT(*) FROM "jobs" j WHERE j.category_id = c.id
          )
        )
      ) AS categories
    FROM "sectors" s
    LEFT JOIN "categories" c ON c.sector_id = s.id
    GROUP BY s.id
  `);

  return rows;
};

//get sectors job
const getJobBySector = async (id, body) => {
  const { name } = body;
  const { rows } = await db.query(
    `
    SELECT *,
    json_agg(DISTINCT jobs) AS job,
     FROM 'sectors'
     LEFT JOIN 'jobs' ON sectors.job_id = job.id
      WHERE id = $1
      GROUP BY  sectors.id
      `,
    [name, id]
  );

  return rows[0];
};

// delete sector
const deleteSector = async (id) => {
  // check if sector want to delete is in the database
  const { rows } = await db.query("SELECT * FROM sectors WHERE id = $1", [id]);
  if (!rows[0]) {
    throw new Error("Sector do not exist"); //throw this errow if not exist
  }

  //go on delete if id exist
  const { confirmedDelete } = await db.query(
    "DELETE FROM sectors WHERE id = $1",
    [id]
  );
};

// edit sector by getting the id of sector wanted to edit and the ...
// body which contain the new things you want to edit sent from controller
const editSector = async (id, body) => {
  const { name, image } = body;

  // check if sector id want to edit exist or valid inside the sectors
  const { rows } = await db.query("SELECT * FROM sectors WHERE id = $1", [id]);
  if (!rows[0]) {
    throw new Error("Sector do not exist"); //throw this message if not exist
  }

  //telling the sector id to be change to the new values that was edit and ...
  //  changed in the the sector if the id is valid, sent from controller
  const { rows: editSector } = await db.query(
    //signing the editsector to rows b/c we already have rows on top
    "UPDATE sectors SET name = $1, image = $2 WHERE id = $3 RETURNING *",
    [name, image, id]
  );
  return editSector[0];
};

//export sector.services functions
module.exports = {
  createSector,
  getAllSectors,
  getAllSectorsWithCategories,
  deleteSector,
  editSector,
  getJobBySector,
};
