const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root", // Correction ici
  password: "",
  database: "employeDb",
});

app.get("/", (req, res) => {
  // Première requête pour sélectionner toutes les données des employés
  const sqlEmployees = "SELECT *, nbrJours * tauxJournalier as salaire  FROM employe order by numEmp desc;";
  
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

app.get("/:id", (req, res) => {
  const sql = "SELECT * FROM employe WHERE numEmp = ?";
  db.query(sql, [req.params.id], (err, data) => {
    if (err) return res.json("Error");
    return res.json(data[0]);
  });
});

app.post("/create", (req, res) => {
  // Calculer le salaire en multipliant le nombre de jours par le taux journalier
  const salaire = req.body.nbr_jours * req.body.taux_journalier;

  // Ajouter le salaire calculé à la liste des valeurs à insérer
  const values = [
    req.body.nom,
    req.body.nbr_jours,
    req.body.taux_journalier,
  ];

  // Ajouter le champ 'salaire' à la requête SQL
  const sql =
    "INSERT INTO employe (nom, nbrJours, tauxJournalier) VALUES (?, ?, ?)";

  db.query(sql, values, (err, data) => {
    if (err) return res.json("Error");
    return res.json(data);
  });
});

app.put("/:id", (req, res) => {
  // Calculer le salaire en multipliant le nombre de jours par le taux journalier
  // const salaire = req.body.nbr_jours * req.body.taux_journalier;

  // Ajouter le salaire calculé à la liste des valeurs à insérer
  const values = [
    req.body.nom,
    req.body.nbrJours,
    req.body.tauxJournalier,
    req.params.id, // Ajouter l'ID à la liste des valeurs à insérer
  ];

  // Utiliser des backticks (`) pour les noms de colonnes et des placeholders (?) pour les valeurs à mettre à jour
  const sql =
    "UPDATE employe SET `nom` = ?, `nbrJours` = ?, `tauxJournalier` = ? WHERE numEmp = ?";
  
  db.query(sql, values, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.delete("/:id", (req, res) => {
  // Ajouter le champ 'salaire' à la requête SQL
  const sql = "DELETE FROM employe WHERE numEmp = ?";

  const id = req.params.id;

  db.query(sql, [id], (err, data) => {
    if (err) return res.json("Error");
    return res.json(data);
  });
});

app.listen(8080, () => {
  console.log("listening");
});
