import { ThemeProvider } from '@mui/material/styles';
import App from 'components/App/App';
import 'nprogress/nprogress.css';
import AuthProvider from 'providers/AuthProvider';
import { FallbackProvider } from 'providers/FallbackProvider';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'styles/index.scss';
import { theme } from 'styles/theme';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <BrowserRouter>
          <FallbackProvider>
            <App />
          </FallbackProvider>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
