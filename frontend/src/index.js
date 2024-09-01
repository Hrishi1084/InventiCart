import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ProductsContextProvider } from './context/ProductContext';
import { AuthContextProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ProductsContextProvider>
        <App />
      </ProductsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
