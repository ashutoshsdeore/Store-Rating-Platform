const db = require("../config/db");

const submitRating = (req, res) => {

  const { store_id, rating } = req.body;
  const user_id = req.user.id;

  const checkSql = `
  SELECT * FROM ratings
  WHERE user_id=? AND store_id=?
  `;

  db.query(
    checkSql,
    [user_id, store_id],
    (err, result) => {

      if (err)
        return res.status(500).json(err);

      if (result.length > 0) {
        return res.status(400).json({
          message: "Rating already submitted"
        });
      }

      const sql = `
      INSERT INTO ratings
      (user_id,store_id,rating)
      VALUES(?,?,?)
      `;

      db.query(
        sql,
        [user_id, store_id, rating],
        (err) => {

          if (err)
            return res.status(500).json(err);

          res.json({
            message: "Rating Submitted"
          });
        }
      );
    }
  );
};


const updateRating = (req, res) => {

  const { store_id, rating } = req.body;
  const user_id = req.user.id;

  const sql = `
  UPDATE ratings
  SET rating=?
  WHERE user_id=? AND store_id=?
  `;

  db.query(
    sql,
    [rating, user_id, store_id],
    (err) => {

      if (err)
        return res.status(500).json(err);

      res.json({
        message: "Rating Updated"
      });
    }
  );
};

module.exports = {
  submitRating,
  updateRating
};