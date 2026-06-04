const db = require("../config/db");

const getDashboard = (req, res) => {

  const dashboardData = {};

  db.query(
    "SELECT COUNT(*) AS totalUsers FROM users",
    (err, userResult) => {

      if (err) return res.status(500).json(err);

      dashboardData.totalUsers =
        userResult[0].totalUsers;

      db.query(
        "SELECT COUNT(*) AS totalStores FROM stores",
        (err, storeResult) => {

          if (err)
            return res.status(500).json(err);

          dashboardData.totalStores =
            storeResult[0].totalStores;

          db.query(
            "SELECT COUNT(*) AS totalRatings FROM ratings",
            (err, ratingResult) => {

              if (err)
                return res.status(500).json(err);

              dashboardData.totalRatings =
                ratingResult[0].totalRatings;

              res.json(dashboardData);
            }
          );
        }
      );
    }
  );
};



const bcrypt = require("bcryptjs");

const addUser = async (req, res) => {

  const {
    name,
    email,
    password,
    address,
    role,
  } = req.body;

  const hashedPassword =
    await bcrypt.hash(password, 10);

  const sql = `
  INSERT INTO users
  (name,email,password,address,role)
  VALUES(?,?,?,?,?)
  `;

  db.query(
    sql,
    [
      name,
      email,
      hashedPassword,
      address,
      role,
    ],
    (err) => {

      if (err)
        return res.status(500).json(err);

      res.json({
        message: "User Added",
      });
    }
  );
};


const getUsers = (req, res) => {

  const {
    name,
    email,
    address,
    role,
    sortBy,
    order
  } = req.query;

  let sql = `
  SELECT
    id,
    name,
    email,
    address,
    role
  FROM users
  WHERE 1=1
  `;

  const values = [];

  // Filters

  if (name) {
    sql += " AND name LIKE ?";
    values.push(`%${name}%`);
  }

  if (email) {
    sql += " AND email LIKE ?";
    values.push(`%${email}%`);
  }

  if (address) {
    sql += " AND address LIKE ?";
    values.push(`%${address}%`);
  }

  if (role) {
    sql += " AND role = ?";
    values.push(role);
  }

  

  const allowedSortFields = [
    "name",
    "email",
    "address",
    "role"
  ];

  const sortField =
    allowedSortFields.includes(sortBy)
      ? sortBy
      : "name";

  const sortOrder =
    order === "DESC"
      ? "DESC"
      : "ASC";

  sql += ` ORDER BY ${sortField} ${sortOrder}`;

  db.query(
    sql,
    values,
    (err, result) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.json(result);

    }
  );
};

const getStores = (req, res) => {

  const allowedSortFields = [
    "name",
    "email",
    "address",
    "overallRating"
  ];

  const sortBy = allowedSortFields.includes(req.query.sortBy)
    ? req.query.sortBy
    : "name";

  const order =
    req.query.order === "DESC"
      ? "DESC"
      : "ASC";

  const sql = `
  SELECT
    s.id,
    s.name,
    s.email,
    s.address,
    ROUND(AVG(r.rating),1) AS overallRating

  FROM stores s

  LEFT JOIN ratings r
  ON s.id = r.store_id

  GROUP BY s.id

  ORDER BY ${sortBy} ${order}
  `;

  db.query(sql, (err, result) => {

    if (err)
      return res.status(500).json(err);

    res.json(result);
  });

};

const getUserById = (req, res) => {

  const { id } = req.params;

  const sql = `
  SELECT
    u.id,
    u.name,
    u.email,
    u.address,
    u.role,

    ROUND(
      AVG(r.rating),
      1
    ) AS ownerRating

  FROM users u

  LEFT JOIN stores s
  ON s.owner_id = u.id

  LEFT JOIN ratings r
  ON r.store_id = s.id

  WHERE u.id = ?

  GROUP BY u.id
  `;

  db.query(
    sql,
    [id],
    (err, result) => {

      if (err)
        return res.status(500).json(err);

      if (result.length === 0) {

        return res.status(404).json({
          message: "User not found"
        });

      }

      res.json(result[0]);

    }
  );

};

module.exports = {
  getDashboard,
  addUser,
  getUsers,
  getStores,
  getUserById
};