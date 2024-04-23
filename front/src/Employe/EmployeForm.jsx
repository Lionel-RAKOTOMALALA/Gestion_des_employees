import React, { useEffect } from 'react';
import axios from 'axios';
import { Modal, Form, Input, Button, message } from 'antd';

function EmployeForm({ isOpen, onClose, initialValues }) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    } else {
      form.resetFields();
    }
  }, [isOpen, initialValues, form]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    form.setFieldsValue({ [name]: value });
  };

  const onFinish = (values) => {
    axios.post('http://127.0.0.1:8000/create', values)
      .then((res) => {
        if (res.data.error) {
          message.error('Une erreur est survenue lors de la création de l\'employé');
        } else {
          message.success('Employé créé avec succès');
          onClose();
        }
      })
      .catch((error) => {
        console.error('Error creating employe:', error);
        message.error('Une erreur est survenue lors de la création de l\'employé');
      });
  };

  return (
    <Modal
      visible={isOpen}
      onCancel={onClose}
      title="Ajout d'employé"
      footer={null}
    >
      <Form
        form={form}
        onFinish={onFinish}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
      >
        <Form.Item
          label="Nom"
          name="nom"
          rules={[{ required: true, message: 'Veuillez saisir le nom' }]}
        >
          <Input onChange={handleInput} />
        </Form.Item>
        <Form.Item
          label="Nombre de jours"
          name="nbrJours"
          rules={[{ required: true, message: 'Veuillez saisir le nombre de jours' }]}
        >
          <Input type="number" onChange={handleInput} />
        </Form.Item>
        <Form.Item
          label="Taux journalier"
          name="tauxJournalier"
          rules={[{ required: true, message: 'Veuillez saisir le taux journalier' }]}
        >
          <Input type="number" onChange={handleInput} />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Ajouter
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default EmployeForm;
