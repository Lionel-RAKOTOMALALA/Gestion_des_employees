const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();

app.use(cors()); // Utilisez cors() au lieu de cors

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "employeDb"
});

// Connectez-vous à la base de données
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to database.');
});

app.get("/", (req, res) => {
    res.send("Hello from Back"); // Utilisez send() au lieu de json() pour envoyer un simple message
});

app.listen(8080, () => {
    console.log("Server is listening on port 8081");
});
