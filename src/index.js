import React from 'react';
import ReactDOM from 'react-dom/client';
import './Interface/Page1.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createRoot } from 'react-dom/client';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

     <App />
  
   
  </React.StrictMode>
);

reportWebVitals();
