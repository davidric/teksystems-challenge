import { useEffect, useState } from 'react';
import SantaLetterForm from './components/SantaLetterForm';

function App() {
  const [message, setMessage] = useState('');

  console.log('message: ', message);

  useEffect(() => {
    fetch('/api')
      .then(res => res.text())
      .then(setMessage);
  }, []);

  return (
    <>
      <SantaLetterForm />
    </>
  );
}

export default App;
