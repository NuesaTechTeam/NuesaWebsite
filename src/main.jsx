import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import 'react-quill/dist/quill.snow.css';
import { GlobalProvider } from './context/index.js';
import { BrowserRouter } from 'react-router-dom';

import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init({
  duration: 800,
  once: true,
});

createRoot(document.getElementById('root')).render(
  <GlobalProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </GlobalProvider>
);
