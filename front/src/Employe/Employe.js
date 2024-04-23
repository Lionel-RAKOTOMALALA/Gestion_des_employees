import React, { useEffect, useState } from "react";
import { Table, Button, Space, Spin, Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import axios from "axios";
import EmployeForm from "./EmployeForm";
import {useNavigate} from "react-router-dom";

const { confirm } = Modal;

const Employe = () => {
  const [employes, setEmployes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [initialFormValues, setInitialFormValues] = useState(null);
  const [totalSalary, setTotalSalary] = useState(0);
  const [minSalary, setMinSalary] = useState(0);
  const [maxSalary, setMaxSalary] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    fetchData();
  }, []);

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
            onClick={() => navigate(`/employe/edit/${record.id}`)}
          >
            Modifier
          </Button>
          <Button
            type="danger"
            onClick={() => showDeleteConfirm(record.numEmp)}
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
      const response = await axios.delete(`URL_VOTRE_API/${id}`);
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

  const handleOpenEditModal = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleAddEmploye = () => {
    handleOpenEditModal();
  };

  return (
    <div className="App">
      <div className="container">
        <div>
          <Button
            type="primary"
            style={{ marginTop: "3%", marginLeft: "2%" }}
            onClick={handleAddEmploye}
          >
            Ajouter
          </Button>
        </div>
        <div
          style={{
            boxShadow: "0 1px 4px rgba(0, 21, 41, 0.08)",
            marginBottom: "16px",
          }}
        >
          <div
            style={{
              padding: "16px 24px",
              borderBottom: "1px solid #ebedf0",
            }}
          >
            <h6
              className="m-0 font-weight-bold text-primary"
              style={{ fontSize: "24px", color: "#333" }}
            >
              Liste des employés
            </h6>
            <div>
              <p>Total des salaires : {totalSalary}</p>
              <p>Salaire minimum : {minSalary}</p>
              <p>Salaire maximum : {maxSalary}</p>
            </div>
          </div>
          <div style={{ padding: "24px" }}>
            {isLoading ? (
              <Spin size="large" />
            ) : (
              <Table columns={columns} dataSource={employes} />
            )}
          </div>
        </div>
      </div>

      <EmployeForm
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        initialValues={initialFormValues}
      />
    </div>
  );
};

export default Employe;
