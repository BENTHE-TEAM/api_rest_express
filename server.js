// Import modules
const express = require("express");
const cors = require("cors");

let DB = require("./db.config");

// Initialisation de l'API
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import module routage
const user_router = require("./routes/users");

//Mise en place du routing
app.get("/", (req, res) => res.send("Welcome to my site"));
app.use("/users", user_router);
app.get("*", (req, res) => res.status(501).send("Error 501"));

//Start server with DB

DB.authenticate()
  .then(() => console.log("Connected"))
  .then(() => {
    app.listen(process.env.SERVER_PORT, () => {
      console.log(
        `This server is rouning on http://localhost:${process.env.SERVER_PORT}`
      );
    });
  })
  .catch((error) => console.log(`Error ${error}`));
