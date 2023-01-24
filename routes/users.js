const express = require("express");

const bcrypt = require("bcrypt");

const User = require("../models/user");

let router = express.Router();

router.get("", (req, res) => {
  User.findAll()
    .then((users) =>
      res.json({
        data: users,
      })
    )
    .catch((err) =>
      res.status(500).json({
        message: "Dtabase Error",
        error: err,
      })
    );
});

router.get("/:id", (req, res) => {
  const userId = parseInt(req.params.id);

  if (!userId) {
    return res.json(400).json({ message: "Missing parameter" });
  }

  User.findOne({
    where: { id: userId },
    raw: true,
  })
    .then((user) => {
      if (user === null) {
        return res.status(400).json({ message: "This user does not exist" });
      }

      return res.json({ data: user });
    })
    .catch(err, {
      message: "Database error",
      error: err,
    });
});

router.put("", (req, res) => {
  const { firstName, lastName, pseudo, email, password } = req.body;

  console.log("benthe: ", req.body);

  if (!firstName || !lastName || !pseudo || !email || !password) {
    return res.status(400).json({
      message: "Missing data",
    });
  }

  User.findOne({ where: { email: email }, raw: true })
    .then((user) => {
      if (user !== null) {
        return res.status(400).json({
          message: `The user ${email} already exists !`,
        });
      }

      bcrypt
        .hash(password, parseInt(process.env.BCRYP_SALT_ROUND))
        .then((hash) => {
          req.body.password = hash;

          User.create(req.body)
            .then({ message: "User created", data: user })
            .catch(err, {
              message: "Database error",
              error: err,
            });
        })
        .catch((err) => {
          res.status(400).send({ message: "Hsh process error", error: err });
        });
    })
    .catch(err, {
      message: "Database error",
      error: err,
    });
});

router.patch("/:id", (req, res) => {
  let userId = parent(req.params.id);

  if (!userId) {
    return res.status(400).json({ message: "Missing parameter" });
  }

  User.findOne({ where: { id: userId }, raw: true })
    .then((user) => {
      if (user === null) {
        return res.status(404).json({ message: "this user is not exist !" });
      }

      User.update(req.body, { where: { id: userId } }).then((user) => {
        res
          .json({ message: "User updated" })
          .catch((err) =>
            res.status(500).json({ message: "Database error", error: err })
          );
      });
    })
    .catch((err) =>
      res.status(500).json({ message: "Database error", error: err })
    );
});

router.delete("/:id", (req, res) => {
  let userId = parent(req.params.id);

  if (!userId) {
    return res.status(400).json({ message: "Missing parameter" });
  }

  User.destroy({ where: { id: userId } })
    .then(() => res.status(204).json({}))
    .catch((err) =>
      res.status(500).json({ message: "Database error", error: err })
    );
});

module.exports = router;
