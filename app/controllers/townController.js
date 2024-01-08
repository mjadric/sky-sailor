const db = require("../database");

const getTownsByName = async (req, res) => {
  const { query } = req.query;

  try {
    const [data] = await db.promise().query(
      `SELECT town_ID, name
        FROM town 
        WHERE LOWER(name) LIKE LOWER(CONCAT(?, '%'))
        LIMIT 5`,
      [query]
    );

    res.status(200).json({
      status: "success",
      results: data.length,
      data: {
        towns: data,
      },
    });
  } catch (err) {
    return res.status(500).json({
      status: "failed to get towns",
      message: err.message,
    });
  }
};

module.exports = {
  getTownsByName,
};
