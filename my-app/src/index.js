import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Properties_listing from './components/Properties_listing';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
const proot = ReactDOM.createRoot(document.getElementById('property_list'));
proot.render(
  <React.StrictMode>
    <Properties_listing />
  </React.StrictMode> 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
