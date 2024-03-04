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
   const sql = "SELECT *, concat ((nbrJours * tauxJournalier),' ', 'Ariary') as salaire FROM employe;";
   db.query(sql, (err, data) =>{
    if(err) return res.json("Error");
    return res.json(data);
   })
});

app.get("/tot", (req, res) => {
    const sql = "SELECT concat (sum(nbrJours * tauxJournalier),' ', 'Ariary') as salaire FROM employe;";
    db.query(sql, (err, data) =>{
     if(err) return res.json("Error");
     return res.json(data);
    })
 });
 app.get("/max", (req, res) => {
     const sql = "SELECT concat (max(nbrJours * tauxJournalier),' ', 'Ariary') as salaire FROM employe;";
     db.query(sql, (err, data) =>{
      if(err) return res.json("Error");
      return res.json(data);
     })
  });
  app.get("/min", (req, res) => {
      const sql = "SELECT concat (min(nbrJours * tauxJournalier),' ', 'Ariary') as salaire FROM employe;";
      db.query(sql, (err, data) =>{
       if(err) return res.json("Error");
       return res.json(data);
      })
   });

 
app.post('/create',(req,res) =>{
    const sql = "INSERT INTO employe (nom, nbrJours, tauxJournalier) VALUES(?,?,?);"
    const values = [
        req.body.nom,
        req.body.nbrJours, 
        req.body.tauxJournalier
    ]
    db.query(sql,[values], (err, data) =>{
        if(err) return res.json("Error");
        return res.json(data);
    })    
})


app.listen(8080, () => {
    console.log("Server is listening on port 8081");
});
