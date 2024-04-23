import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateEmploye() {
    const [nom, setNom] = useState("");
    const [nbr_jours, setJours] = useState("");
    const [taux_journalier, setJournalier] = useState("");
    const navigate = useNavigate();

    function handleSubmit(event) {
      event.preventDefault();
      axios
        .post("http://localhost:8080/create", {
          nom,
          nbr_jours: parseInt(nbr_jours, 10),
          taux_journalier: parseFloat(taux_journalier),
        })
        .then((res) => {
          console.log(res);
          navigate("/");
        })
        .catch((err) => console.log(err));
    }

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={handleSubmit}>
          <h2>Ajouter Employer</h2>
          <div className="mb-2">
            <label htmlFor="">Nom:</label>
            <input
              type="text"
              placeholder="Entrer un nom"
              className="form-control"
              onChange={(e) => setNom(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Nombre de jours:</label>
            <input
              type="number"
              placeholder="Entrer un nombre de jours"
              className="form-control"
              onChange={(e) => setJours(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Taux journalier:</label>
            <input
              type="number"
              placeholder="Entrer un taux journalier"
              className="form-control"
              onChange={(e) => setJournalier(e.target.value)}
            />
          </div>
          <button className="btn btn-success">Ajouter</button>
        </form>
      </div>
    </div>
  );
}

export default CreateEmploye;
