import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
    <meta http-equiv="Permissions-Policy" content="interest-cohort=()"></meta>
    <App />
    </>
);

