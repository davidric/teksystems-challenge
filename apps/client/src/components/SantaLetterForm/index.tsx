import React from 'react';
import styles from './styles.module.css';

const SantaLetterForm: React.FC = () => {
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

          <label htmlFor="userid" className={styles.label}>
            Who are you?
          </label>
          <input
            id="userid"
            name="userid"
            placeholder="charlie.brown"
            className={styles.input}
          />

          <form method="post" className={styles.form}>
            <label htmlFor="wish" className={styles.label}>
              What do you want for Christmas?
            </label>
            <textarea
              id="wish"
              name="wish"
              rows={4}
              maxLength={100}
              placeholder="Gifts!"
              className={styles.textarea}
            ></textarea>
            <button type="button" id="submit-letter" className={styles.button}>
              Send
            </button>
          </form>
        </div>
      </main>

      <footer className={styles.footer}>
        Made by{' '}
        <a href="https://davidrica.com" target="_blank" className={styles.link}>
          David Ricardo
        </a>
        !
      </footer>

      <div className={styles.fixedTopRight}>
        <script src="https://button.glitch.me/button.js"></script>
      </div>
    </div>
  );
};

export default SantaLetterForm;
