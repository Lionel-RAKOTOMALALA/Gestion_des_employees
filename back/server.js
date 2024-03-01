const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();

app.use(cors()); // Utilisez cors() au lieu de cors

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "employeDb"
});

// Connectez-vous à la base de données
db.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to database.');
});

app.get("/", (req, res) => {
   const sql = "SELECT * FROM employe";
   db.query(sql, (err, data) =>{
    if(err) return res.json("Error");
    return res.json(data);
   })
});

app.listen(8080, () => {
    console.log("Server is listening on port 8081");
});
