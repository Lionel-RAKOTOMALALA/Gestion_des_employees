const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();
app.use(express.json());
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
    // Première requête pour sélectionner toutes les données des employés
    const sqlEmployees = "SELECT * FROM employe;";
    
    // Deuxième requête pour calculer la somme des salaires
    const sqlTotalSalary = "SELECT SUM(nbrJours * tauxJournalier) AS totalSalary FROM employe;";
    
    // Troisième requête pour récupérer le salaire minimum
    const sqlMinSalary = "SELECT CONCAT(MIN(nbrJours * tauxJournalier), ' Ariary') AS minSalary FROM employe;";
    
    // Quatrième requête pour récupérer le salaire maximum
    const sqlMaxSalary = "SELECT CONCAT(MAX(nbrJours * tauxJournalier), ' Ariary') AS maxSalary FROM employe;";
    
    // Exécution de toutes les requêtes en parallèle
    db.query(sqlEmployees, (errEmployees, dataEmployees) => {
      if (errEmployees) return res.json({ error: "Error fetching employees data" });
  
      db.query(sqlTotalSalary, (errTotalSalary, dataTotalSalary) => {
        if (errTotalSalary) return res.json({ error: "Error fetching total salary" });
  
        db.query(sqlMinSalary, (errMinSalary, dataMinSalary) => {
          if (errMinSalary) return res.json({ error: "Error fetching minimum salary" });
  
          db.query(sqlMaxSalary, (errMaxSalary, dataMaxSalary) => {
            if (errMaxSalary) return res.json({ error: "Error fetching maximum salary" });
  
            // Renvoyer les résultats dans un objet JSON
            return res.json({
              employees: dataEmployees,
              totalSalary: dataTotalSalary[0].totalSalary,
              minSalary: dataMinSalary[0].minSalary,
              maxSalary: dataMaxSalary[0].maxSalary
            });
          });
        });
      });
    });
  });
  app.get("/", (req, res) => {
    // Première requête pour sélectionner toutes les données des employés
    const sqlEmployees = "SELECT * FROM employe;";
    
    // Deuxième requête pour calculer la somme des salaires
    const sqlTotalSalary = "SELECT SUM(nbrJours * tauxJournalier) AS totalSalary FROM employe;";
    
    // Troisième requête pour récupérer le salaire minimum
    const sqlMinSalary = "SELECT CONCAT(MIN(nbrJours * tauxJournalier), ' Ariary') AS minSalary FROM employe;";
    
    // Quatrième requête pour récupérer le salaire maximum
    const sqlMaxSalary = "SELECT CONCAT(MAX(nbrJours * tauxJournalier), ' Ariary') AS maxSalary FROM employe;";
    
    // Exécution de toutes les requêtes en parallèle
    db.query(sqlEmployees, (errEmployees, dataEmployees) => {
      if (errEmployees) return res.json({ error: "Error fetching employees data" });
  
      db.query(sqlTotalSalary, (errTotalSalary, dataTotalSalary) => {
        if (errTotalSalary) return res.json({ error: "Error fetching total salary" });
  
        db.query(sqlMinSalary, (errMinSalary, dataMinSalary) => {
          if (errMinSalary) return res.json({ error: "Error fetching minimum salary" });
  
          db.query(sqlMaxSalary, (errMaxSalary, dataMaxSalary) => {
            if (errMaxSalary) return res.json({ error: "Error fetching maximum salary" });
  
            // Renvoyer les résultats dans un objet JSON
            return res.json({
              employees: dataEmployees,
              totalSalary: dataTotalSalary[0].totalSalary,
              minSalary: dataMinSalary[0].minSalary,
              maxSalary: dataMaxSalary[0].maxSalary
            });
          });
        });
      });
    });
  });
    

 
  app.post('/create', (req, res) => {
    const sql = "INSERT INTO employe (nom, nbrJours, tauxJournalier) VALUES (?, ?, ?);";
    const values = [
        req.body.nom,
        req.body.nbrJours,
        req.body.tauxJournalier
    ];
    db.query(sql, values, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});


app.listen(8080, () => {
    console.log("Server is listening on port 8080");
});
