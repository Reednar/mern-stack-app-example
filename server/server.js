const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config()

// middlewares
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");

const exampleRoute = require("./routes/exampleRoute");

const app = express();
const port = 5000;

const connect_database = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.BDD_USER}:${process.env.BDD_PASSWORD}@mern-app.rtt9hji.mongodb.net/${process.env.BDD_NAME}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Database connected");
  } catch (error) {
    console.log(error);
  }
};

// middlewares
const middlewares = async () => {
  try {
    app.use(bodyParser.json());
    app.use(cors());
    app.use(helmet());
    app.use(compression());
  } catch (error) {
    console.log(error);
  }
};

const run = async () => {
  try {
    // Connexion à la base de données au démarrage du serveur
    await connect_database();

    // middlewares
    await middlewares();

    // Lancement du serveur
    const server = app.listen(port, () => {
      console.log(`Server started on port: ${port}`);
    });

    // Routes
    exampleRoute(app);

    // Gérer la déconnexion de la base de données lors de l'arrêt du serveur
    process.on("SIGINT", async () => {
      console.log("Shutting down server...");
      try {
        // Fermeture propre du serveur Express
        server.close(async () => {
          console.log("Server closed");
          // Fermeture propre de la connexion à la base de données
          await mongoose.connection.close();
          console.log("Database disconnected cause server shutdown");
          process.exit(0);
        });
      } catch (error) {
        console.error("Error while shutting down server:", error);
        process.exit(1);
      }
    });

    app.get("/", (req, res) => {
      res.send("Hello World!");
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { run };
