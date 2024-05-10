import App from 'components/App/App';
import 'nprogress/nprogress.css';
import AuthProvider from 'providers/AuthProvider';
import { FallbackProvider } from 'providers/FallbackProvider';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'styles/index.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <FallbackProvider>{<App />}</FallbackProvider>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
);
