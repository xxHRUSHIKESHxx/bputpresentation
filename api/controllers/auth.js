import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
  const q = "SELECT * FROM users WHERE email = ? OR username = ?";

  db.query(q, [req.body.username, req.body.email], (err, data) => {
    if (err) {
      console.error("Error while checking existing user:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    if (data.length) {
      return res.status(409).json({ error: "User already exists!" });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    // console.log(hash);
    const insertQuery =
      "INSERT INTO users (`username`, `email`, `password`) VALUES (?, ?, ?)";
    const insertValues = [req.body.username, req.body.email, hash];

    db.query(insertQuery, insertValues, (insertErr, result) => {
      if (insertErr) {
        console.error("Error creating user:", insertErr);
        return res.status(500).json({ error: "Error creating user" });
      }

      return res.status(200).json({ message: "User has been created." });
    });
  });
};

export const login = (req, res) => {
  //CHECK USER

  const q = "SELECT * FROM users WHERE username = ?";

  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("User not found!");

    //Check password
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );

    if (!isPasswordCorrect)
      return res.status(400).json("Wrong username or password!");

    const token = jwt.sign({ id: data[0].id }, "jwtkey");
    console.log(token);

    const { ...other } = data[0];

    const responsePayload = {
      token: token,
      user: other, // Or any other user data you want to send
    };
    res.status(200).json(responsePayload);
  });

  console.log("Cookies:", res.getHeaders()["set-cookie"]);
};

export const logout = (req, res) => {
  res
    .clearCookie("access_token", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json("User has been logged out.");

  console.log("cookie has been cleared");
};
