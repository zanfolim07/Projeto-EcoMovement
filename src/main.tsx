import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import MissoesProvider from './context/MissoesProvider';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <MissoesProvider>
        <App />
      </MissoesProvider>
    </BrowserRouter>
  </StrictMode>,
);
