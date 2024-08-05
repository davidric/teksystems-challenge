import React from 'react';
import { Formik, Field, Form } from 'formik';
import styles from './styles.module.css';

interface FormValues {
  username: string;
  request: string;
}

const SantaLetterForm: React.FC = () => {
  const initialValues: FormValues = { username: '', request: '' };

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
          <Formik
            initialValues={initialValues}
            onSubmit={(values, actions) => {
              console.log({ values, actions });
              alert(JSON.stringify(values, null, 2));
              actions.setSubmitting(false);
            }}
          >
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
              <button type="submit" className={styles.button}>
                Send
              </button>
            </Form>
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
