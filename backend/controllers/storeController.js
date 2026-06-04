const db = require("../config/db");

const addStore = (req, res) => {

  const {
    name,
    email,
    address,
    owner_id
  } = req.body;

  const sql = `
  INSERT INTO stores
  (name,email,address,owner_id)
  VALUES(?,?,?,?)
  `;

  db.query(
    sql,
    [name, email, address, owner_id],
    (err, result) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.status(201).json({
        message: "Store Added Successfully",
      });
    }
  );
};

// Get All Stores
const getStores = (req, res) => {

  const userId = req.user.id;

  const {
    name,
    email,
    address,
    sortBy,
    order
  } = req.query;

  let sql = `
  SELECT
    s.id,
    s.name,
    s.email,
    s.address,
    u.name AS owner_name,

    ROUND(
      AVG(r.rating),
      1
    ) AS overallRating,

    ur.rating AS userRating

  FROM stores s

  LEFT JOIN users u
  ON s.owner_id = u.id

  LEFT JOIN ratings r
  ON s.id = r.store_id

  LEFT JOIN ratings ur
  ON s.id = ur.store_id
  AND ur.user_id = ?

  WHERE 1=1
  `;

  const values = [userId];



  if (name) {
    sql += " AND s.name LIKE ?";
    values.push(`%${name}%`);
  }

  if (email) {
    sql += " AND s.email LIKE ?";
    values.push(`%${email}%`);
  }

  if (address) {
    sql += " AND s.address LIKE ?";
    values.push(`%${address}%`);
  }

  sql += `
  GROUP BY
    s.id,
    s.name,
    s.email,
    s.address,
    u.name,
    ur.rating
  `;


  const allowedSortFields = [
    "name",
    "email",
    "address",
    "overallRating"
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

module.exports = {
  addStore,
  getStores,
};