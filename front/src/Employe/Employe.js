import React, { useEffect, useState, useRef } from "react";
import { Table, Button, Space, Spin, Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const { confirm } = Modal;

const Employe = () => {
  const [employes, setEmployes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const tableRef = useRef(null);
  const navigate = useNavigate();

  const destroyDataTable = () => {
    if (tableRef.current) {
      tableRef.current = null;
    }
  };

  const refreshData = async () => {
    destroyDataTable();

    try {
      const response = await axios.get("http://localhost:8080/");
      if (response.status === 200) {
        setEmployes(response.data);
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

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
          <Button type="primary" onClick={() => navigate(`/employe/edit/${record.id}`)}>
            Modifier
          </Button>
          <Button type="danger" onClick={() => showDeleteConfirm(record.numEmp)}>
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
          onOk: refreshData,
        });
      } else if (response.status === 404) {
        Modal.error({
          title: "Erreur",
          content: response.data.message,
          onOk: () => navigate("/employe"),
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <div>
          <Button type="primary" style={{ marginTop: "3%", marginLeft : "2%"}}>
            Ajouter
          </Button>
        </div>
        <div style={{ boxShadow: "0 1px 4px rgba(0, 21, 41, 0.08)", marginBottom: "16px" }}>
          <div style={{ padding: "16px 24px", borderBottom: "1px solid #ebedf0" }}>
            <h6 className="m-0 font-weight-bold text-primary" style={{ fontSize: "24px", color: "#333" }}>Liste des employés</h6>
          </div>
          <div style={{ padding: "24px" }}>
            {isLoading ? <Spin size="large" /> : <Table columns={columns} dataSource={employes} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employe;
