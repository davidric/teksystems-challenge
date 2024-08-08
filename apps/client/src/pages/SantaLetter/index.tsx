import React, { useState } from 'react';
import { Formik, Field, Form, FormikHelpers } from 'formik';
import styles from './styles.module.css';
import useRequest from '../../hooks/useRequest';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import { FormValues, SubmitResponse } from '../../types';

const SantaLetter: React.FC = () => {
  const initialModalContent = { title: '', message: '' };
  const initialValues: FormValues = { username: '', request: '' };
  const [modalContent, setModalContent] = useState(initialModalContent);

  const { loading, sendRequest } = useRequest<SubmitResponse>();

  const handleSubmitForm = (
    { username, request }: FormValues,
    formik: FormikHelpers<FormValues>,
  ) => {
    sendRequest({
      url: '/api/submit',
      method: 'POST',
      body: { username, request },
      onSuccess: ({ title, message }) => {
        setModalContent({ title, message });
        formik.resetForm();
      },
      onError: error => {
        setModalContent({ title: 'Request failed!', message: error.message });
      },
    });
  };

  const handleClose = () => {
    setModalContent(initialModalContent);
  };

  const disableSubmit = ({ username, request }: FormValues) =>
    !username || !request;

  return (
    <div className={styles.minHScreen}>
      <header className={styles.header}>
        <h1 className={styles.headerTitle}>A Letter to Santa</h1>
      </header>

      <main className={styles.main}>
        <div className={styles.formContainer}>
          <p className={styles.introText}>
            Ho ho ho, what do you want for Christmas?
          </p>
          <Formik initialValues={initialValues} onSubmit={handleSubmitForm}>
            {({ values }) => (
              <Form className={styles.form}>
                <label htmlFor="username" className={styles.label}>
                  Who are you?
                </label>
                <Field
                  id="username"
                  name="username"
                  placeholder="charlie.brown"
                  className={styles.input}
                />
                <label htmlFor="request" className={styles.label}>
                  What do you want for Christmas?
                </label>
                <Field
                  id="request"
                  name="request"
                  maxLength={100}
                  placeholder="Gifts!"
                  className={styles.textarea}
                  as="textarea"
                />
                <Button
                  isLoading={loading}
                  loadingText="Sending..."
                  disabled={disableSubmit(values)}
                >
                  Send
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </main>

      <footer className={styles.footer}>
        Made by{' '}
        <a href="https://davidrica.com" target="_blank" className={styles.link}>
          David Ricardo
        </a>
        !
      </footer>

      <Modal
        show={!!modalContent.message}
        onClose={handleClose}
        title={modalContent.title}
      >
        <p>{modalContent.message}</p>
      </Modal>
    </div>
  );
};

export default SantaLetter;
