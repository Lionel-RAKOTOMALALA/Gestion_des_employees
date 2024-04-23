import React, { useEffect, useState } from "react";
import { Table, Button, Space, Spin, Modal, Typography } from "antd";
import { ExclamationCircleOutlined, PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons"; // Importation des icônes
import axios from "axios";
import EmployeForm from "./EmployeForm";
import EditEmploye from './EditEmploye'; // Importez le composant de modal d'édition
import { useNavigate } from "react-router-dom";

const { confirm } = Modal;
const { Title } = Typography;

const Employe = () => {
  const [employes, setEmployes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedEmploye, setSelectedEmploye] = useState(null);
  const [totalSalary, setTotalSalary] = useState(0);
  const [minSalary, setMinSalary] = useState(0);
  const [maxSalary, setMaxSalary] = useState(0);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // Ajout de l'état pour la fenêtre modale d'ajout
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!isEditModalOpen) {
      setSelectedEmploye(null);
    }
  }, [isEditModalOpen]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/");
      if (response.status === 200) {
        const { employees, totalSalary, minSalary, maxSalary } = response.data;
        setEmployes(employees);
        setTotalSalary(totalSalary);
        setMinSalary(minSalary);
        setMaxSalary(maxSalary);
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const columns = [
    {
      title: "Numero des employés",
      dataIndex: "numEmp",
      key: "numEmp",
      style: { backgroundColor: "#fafafa", borderBottom: "1px solid #ddd" },
    },
    {
      title: "Nom",
      dataIndex: "nom",
      key: "nom",
    },
    {
      title: "Nombre de jours",
      dataIndex: "nbrJours",
      key: "nbrJours",
    },
    {
      title: "Taux journalier",
      dataIndex: "tauxJournalier",
      key: "tauxJournalier",
    },
    {
      title: "Salaire",
      dataIndex: "salaire",
      key: "salaire",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record.numEmp)}
            style={{ backgroundColor: "#1890ff", borderColor: "#1890ff", marginBottom: "8px" }}
          >
            Modifier
          </Button>
          <Button
            type="danger"
            icon={<DeleteOutlined />}
            onClick={() => showDeleteConfirm(record.numEmp)}
            style={{ backgroundColor: "#ff4d4f", borderColor: "#ff4d4f", marginBottom: "8px" }}
          >
            Supprimer
          </Button>
        </Space>
      ),
    },
  ];

  const showDeleteConfirm = (id) => {
    confirm({
      title: "Confirmer la suppression",
      icon: <ExclamationCircleOutlined />,
      content: "Êtes-vous sûr de vouloir supprimer cet employé ?",
      okText: "Oui",
      okType: "danger",
      cancelText: "Non",
      onOk() {
        deleteEmploye(id);
      },
      onCancel() {
        console.log("Annulation");
      },
    });
  };

  const deleteEmploye = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8080/${id}`);
      if (response.status === 200) {
        Modal.success({
          title: "Success",
          content: response.data.message,
          onOk: fetchData,
        });
      } else if (response.status === 404) {
        Modal.error({
          title: "Erreur",
          content: response.data.message,
          onOk: fetchData,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (numEmp) => {
    const selected = employes.find(emp => emp.numEmp === numEmp);
    setSelectedEmploye(selected.numEmp);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedEmploye(null);
  };

  const handleAddEmploye = () => {
    setIsAddModalOpen(true); // Ouvrir la fenêtre modale d'ajout
  };

  const handleFormSubmit = () => {
    setIsAddModalOpen(false); // Fermer la fenêtre modale d'ajout après soumission du formulaire
    fetchData();
  };

  return (
    <div className="App">
      <div className="container">
        <Title level={1} style={{ textAlign: "center"}}>Gestion des employés</Title>

        <div>
          <Button
            type="primary"
            style={{ marginTop: "1%", marginLeft: "2%", backgroundColor: "#52c41a", borderColor: "#52c41a" }}
            onClick={handleAddEmploye}
            icon={<PlusOutlined />}
          >
            Ajouter
          </Button>
        </div>
        <div
          style={{
            boxShadow: "0 1px 4px rgba(0, 21, 41, 0.08)",
          }}
        >
          <div
            style={{
              padding: "16px 24px",
              borderBottom: "1px solid #ebedf0",
            }}
          >
            <div>
              <p style={{ marginBottom: "4px" }}>Total des salaires : {totalSalary} Ariary</p>
              <p style={{ marginBottom: "4px" }}>Salaire minimum : {minSalary}</p>
              <p style={{ marginBottom: "4px" }}>Salaire maximum : {maxSalary}</p>
            </div>
          </div>
          <div style={{ padding: "16px" }}>
            {isLoading ? (
              <Spin size="large" />
            ) : (
              <Table
                columns={columns}
                dataSource={employes}
                style={{ backgroundColor: "#f7f7f7", border: "1px solid #ddd" }}
                size="small" // Réduire la taille du tableau
                pagination={{ pageSize: 5 }} // Limiter à 5 éléments par page
              />
            )}
          </div>
        </div>
      </div>

      {/* Fenêtre modale pour l'ajout d'un employé */}
      <EmployeForm
        isOpen={isAddModalOpen}
        onClose={() => {setIsAddModalOpen(false); fetchData()}} // Fermer la fenêtre modale d'ajout
        onSubmit={handleFormSubmit}
      />

      {/* Fenêtre modale d'édition d'un employé */}
      <EditEmploye
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        initialValues={selectedEmploye}
        fetchData={fetchData}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
};

export default Employe;
