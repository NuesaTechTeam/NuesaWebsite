import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import 'react-quill/dist/quill.snow.css';
import { GlobalProvider } from './context/index.js';
import { BrowserRouter } from 'react-router-dom';

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
      <BrowserRouter basename="/NuesaWebsite">
        <App />
      </BrowserRouter>
    </GlobalProvider>
  );
};

createRoot(document.getElementById('root')).render(<Root />);
