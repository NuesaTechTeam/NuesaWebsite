import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import 'react-quill/dist/quill.snow.css';
import { GlobalProvider } from './context/index.js';

import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

const Root = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  return (
    <GlobalProvider>
      <App />
    </GlobalProvider>
  );
};

createRoot(document.getElementById('root')).render(<Root />);
