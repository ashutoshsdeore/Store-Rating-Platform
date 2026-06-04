const db = require("../config/db");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {

    try {
        const { name, email, password, address } = req.body;

        const sql = "SELECT * FROM users WHERE email=?";

        db.query(sql, [email], async (err, result) => {
            if (err) return res.status(500).json(err);

            if (result.length > 0) {
                return res.status(400).json({
                    message: "Email already exists",
                });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const insertSql = `
      INSERT INTO users
      (name,email,password,address)
      VALUES(?,?,?,?)
      `;

            db.query(
                insertSql,
                [name, email, hashedPassword, address],
                (err, result) => {
                    console.log(err);
                    console.log(result);

                    if (err) {
                        return res.status(500).json(err);
                    }

                    res.status(201).json({
                        message: "User Registered Successfully",
                    });
                }
            );
        });
    } catch (error) {
        res.status(500).json(error);
    }
};



const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const sql = "SELECT * FROM users WHERE email=?";

    db.query(sql, [email], async (err, result) => {
      if (err) return res.status(500).json(err);

      if (result.length === 0) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      const user = result[0];

      const isMatch = await bcrypt.compare(
        password,
        user.password
      );

      if (!isMatch) {
        return res.status(401).json({
          message: "Invalid credentials",
        });
      }

      const token = jwt.sign(
        {
          id: user.id,
          role: user.role,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d",
        }
      );

      res.status(200).json({
        token,
        role: user.role,
        name: user.name,
      });
    });

  } catch (error) {
    res.status(500).json(error);
  }
};






const changePassword = async (req, res) => {

  try {

    const userId = req.user.id;

    const {
      currentPassword,
      newPassword
    } = req.body;

    const sql =
      "SELECT * FROM users WHERE id=?";

    db.query(
      sql,
      [userId],
      async (err, result) => {

        if (err)
          return res.status(500).json(err);

        const user = result[0];

        const isMatch =
          await bcrypt.compare(
            currentPassword,
            user.password
          );

        if (!isMatch) {

          return res.status(400).json({
            message:
              "Current Password Incorrect"
          });

        }

        const hashedPassword =
          await bcrypt.hash(
            newPassword,
            10
          );

        db.query(
          "UPDATE users SET password=? WHERE id=?",
          [hashedPassword, userId],
          (err) => {

            if (err)
              return res.status(500).json(err);

            res.json({
              message:
                "Password Updated Successfully"
            });

          }
        );

      }
    );

  } catch (error) {

    res.status(500).json(error);

  }

};



module.exports = {
  register,
  login,
  changePassword
};