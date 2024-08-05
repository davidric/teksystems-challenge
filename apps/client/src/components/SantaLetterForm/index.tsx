import React from 'react';
import { Formik, Field, Form } from 'formik';
import styles from './styles.module.css';
import useRequest from '../../hooks/useRequest';

interface FormValues {
  username: string;
  request: string;
}

const SantaLetterForm: React.FC = () => {
  const initialValues: FormValues = { username: '', request: '' };

  const { data, loading, sendRequest } = useRequest<{
    message: string;
  }>();

  console.log('data:: ', data);

  const handleSubmitForm = ({ username, request }: FormValues) => {
    console.log('handleSubmitForm');
    sendRequest({
      url: '/api/submit',
      method: 'POST',
      body: { username, request },
      onSuccess: data => {
        console.log('data onSuccess: ', data);
      },
      onError: error => {
        alert(`Request failed with error: ${error.message}`);
      },
    });
  };

  const disableSubmit = ({ username, request }: FormValues) =>
    !username || !request;

  if (loading) return <div>Loading...</div>;

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
                  name="username"
                  placeholder="charlie.brown"
                  className={styles.input}
                />
                <label htmlFor="request" className={styles.label}>
                  What do you want for Christmas?
                </label>
                <Field
                  name="request"
                  maxLength={100}
                  placeholder="Gifts!"
                  className={styles.textarea}
                  as="textarea"
                />
                <button
                  type="submit"
                  className={
                    disableSubmit(values) ? styles.btnDisabled : styles.btn
                  }
                  disabled={disableSubmit(values)}
                >
                  Send
                </button>
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
    </div>
  );
};

export default SantaLetterForm;
