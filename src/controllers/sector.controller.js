//importing functions and packages from their roots
const sectorServices = require("../services/sector.services");
const multer = require("multer");
const path = require("path");

// create new sector
const createSector = async (req, res) => {
  const body = {
    name: req.body.name,
    image: req.file.path,
  };

  try {
    const sector = await sectorServices.createSector(body); //req.body
    return res.status(201).json({
      message: "Sector successfully created",
      data: sector,
    });
  } catch (error) {
    //else return this if has error
    return res.status(400).json({
      message: error.message,
    });
  }
};

//upload image
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limit: { filSize: "1000000" },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimetype = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb("Give proper file format to upload");
  },
}).single("image");

// get all created sectors
const getAllSectors = async (req, res) => {
  try {
    const sectors = await sectorServices.getAllSectors();
    return res.status(200).json({
      message: "Sectors retrieved successfully",
      data: sectors,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

//getsectorsjob
const getJobBySector = async (req, res) => {
  try {
    const { id } = req.params;
    const jobs = await sectorServices.getJobBySector(req.params.id, req.body);
    res.status(200).send({
      message: "successfully",
      data: jobs,
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
};

//get all sector with their categories
const getAllSectorsWithCategories = async (req, res) => {
  try {
    const sectors = await sectorServices.getAllSectorsWithCategories();
    return res.status(200).json({ data: sectors });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

// delete a chosed id sector
const deleteSector = async (req, res) => {
  try {
    const { id } = req.params;
    const sector = await sectorServices.deleteSector(id);
    return res
      .status(200)
      .json({ message: "Sector deleted successfully", sector });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

// edit sector
const editSector = async (req, res) => {
  try {
    const { id } = req.params;
    const body = { name: req.body.name, image: req.file.filename }; //request for the db to be edit which is 'name' and 'image'
    const sector = await sectorServices.editSector(id, body); //send 'id' and 'body' to service in ohter to fetch the data from db
    return res.status(200).json({
      message: "Sector updated successfully",
      data: sector,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

//export sector.services functions
module.exports = {
  createSector,
  getAllSectors,
  getAllSectorsWithCategories,
  deleteSector,
  editSector,
  getJobBySector,
  upload,
};
