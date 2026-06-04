const db = require("../config/db");

const getOwnerDashboard = (req, res) => {

  const ownerId = req.user.id;

  const avgRatingSql = `
  SELECT
    AVG(r.rating) AS averageRating
  FROM stores s
  LEFT JOIN ratings r
  ON s.id = r.store_id
  WHERE s.owner_id = ?
  `;

  db.query(
    avgRatingSql,
    [ownerId],
    (err, avgResult) => {

      if (err)
        return res.status(500).json(err);

      const usersSql = `
      SELECT
        u.id,
        u.name,
        u.email,
        r.rating,
        s.name AS storeName
      FROM ratings r
      JOIN users u
      ON r.user_id = u.id
      JOIN stores s
      ON r.store_id = s.id
      WHERE s.owner_id = ?
      `;

      db.query(
        usersSql,
        [ownerId],
        (err, usersResult) => {

          if (err)
            return res.status(500).json(err);

         res.json({
  ownerId,
  averageRating:
    avgResult[0].averageRating || 0,
  totalRatings:
    usersResult.length,
  users: usersResult
});
        }
      );
    }
  );
};

module.exports = {
  getOwnerDashboard
};