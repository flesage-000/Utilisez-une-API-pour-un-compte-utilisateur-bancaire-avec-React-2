import React from 'react';
import ReactDOM from 'react-dom/client';

import 'reset-css';

import './index.css';
import App from './App';
import { Context } from './Utils/Context/Context';
import { Employees } from './Utils/Constants/Employees';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Context.Provider value={Employees}>
      <App />
    </Context.Provider>
  </React.StrictMode>
);