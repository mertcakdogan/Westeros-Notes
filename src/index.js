import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from "./redux/store"; // store'u import et

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}> {/* Uygulamayı Provider ile sarmala */}
      <App />
    </Provider>
  </React.StrictMode>
);