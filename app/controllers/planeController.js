const db = require("../database");

const getAllPlanes = async (req, res) => {
  try {
    const [data] = await db.promise().query("SELECT * FROM PLANE");

    res.status(200).json({
      status: "success",
      results: data.length,
      data: {
        planes: data,
      },
    });
  } catch (err) {
    return res.status(500).json({
      status: "failed to get all planes",
      message: err.message,
    });
  }
};

const getPlaneById = async (req, res) => {
  try {
    const [data] = await db
      .promise()
      .query(`SELECT * FROM PLANE WHERE plane_ID = ${req.params.id}`);

    if (data.length === 0) {
      return res.status(404).json({
        status: "failed to get plane",
        message: "Plane not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        plane: data,
      },
    });
  } catch (err) {
    return res.status(500).json({
      status: "failed to get plane",
      message: err.message,
    });
  }
};

const addPlane = async (req, res) => {
  try {
    const [data] = await db
      .promise()
      .query("INSERT INTO PLANE SET ?", req.body);

    res.status(200).json({
      status: "success",
      data: {
        plane: data,
      },
    });
  } catch (err) {
    return res.status(500).json({
      status: "failed to add plane",
      message: err.message,
    });
  }
};

module.exports = {
  getAllPlanes,
  getPlaneById,
  addPlane,
};
