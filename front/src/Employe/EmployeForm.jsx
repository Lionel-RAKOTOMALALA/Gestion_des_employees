import React from 'react';
import { Modal, Form, Input, Button, message } from 'antd';
import axios from 'axios';

const EmployeForm = ({ isOpen, onClose }) => {
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    try {
      // Envoyer les données du formulaire à l'API
      const response = await axios.post('http://localhost:8080/create', values);
      // Afficher un message de succès
      message.success('L\'employé a été ajouté avec succès');
      // Réinitialiser le formulaire et fermer le modal
      form.resetFields();
      onClose();
    } catch (error) {
      // En cas d'erreur, afficher un message d'erreur
      message.error('Une erreur est survenue lors de l\'ajout de l\'employé');
    }
  };

  return (
    <Modal
      title="Ajouter un employé"
      visible={isOpen}
      onCancel={onClose}
      footer={null}
    >
      <Form form={form} onFinish={handleSubmit}>
        <Form.Item
          label="Nom de l'employé"
          name="nom"
          rules={[{ required: true, message: 'Veuillez saisir le nom de l\'employé' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Nombre de jours travaillés"
          name="nbr_jours"
          rules={[{ required: true, message: 'Veuillez saisir le nombre de jours travaillés' }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          label="Taux journalier"
          name="taux_journalier"
          rules={[{ required: true, message: 'Veuillez saisir le taux journalier' }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Ajouter l'employé
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EmployeForm;
