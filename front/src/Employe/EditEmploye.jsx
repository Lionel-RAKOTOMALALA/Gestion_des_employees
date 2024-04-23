import React, { useEffect } from 'react';
import { Modal, Form, Input, Button, message } from 'antd';
import axios from 'axios';

const EditEmployeModal = ({ isOpen, onClose, initialValues, fetchData }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      // Récupérer les données de l'utilisateur sélectionné
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/${initialValues}`);
          const userData = response.data;

          // Remplir les champs du formulaire avec les données récupérées
          form.setFieldsValue(userData);
        } catch (error) {
          message.error('Une erreur est survenue lors de la récupération des données de l\'employé');
        }
      };

      fetchUserData();
    }
  }, [isOpen, initialValues, form]);

  const handleFormSubmit = async (values) => {
    try {
      // Envoyer les données du formulaire à votre API pour la mise à jour
      const response = await axios.put(`http://localhost:8080/${initialValues}`, values);
        console.log(values);
      // Afficher un message de succès
      message.success('L\'employé a été mis à jour avec succès');   

      // Réinitialiser le formulaire et fermer le modal
      form.resetFields();
      onClose();

      // Rafraîchir les données
      fetchData();
    } catch (error) {
      // En cas d'erreur, afficher un message d'erreur
      message.error('Une erreur est survenue lors de la mise à jour de l\'employé');
    }
  };

  return (
    <Modal
      title="Modifier un employé"
      visible={isOpen}
      onCancel={onClose}
      footer={null}
    >
      <Form form={form} onFinish={handleFormSubmit} initialValues={initialValues}>
        <Form.Item
          label="Nom de l'employé"
          name="nom"
          rules={[{ required: true, message: 'Veuillez saisir le nom de l\'employé' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Nombre de jours travaillés"
          name="nbrJours"
          rules={[{ required: true, message: 'Veuillez saisir le nombre de jours travaillés' }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          label="Taux journalier"
          name="tauxJournalier"
          rules={[{ required: true, message: 'Veuillez saisir le taux journalier' }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Enregistrer les modifications
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditEmployeModal;
