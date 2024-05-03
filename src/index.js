import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router} from 'react-router-dom';
import Home from "./paginas/home";
import Registrarse from "./paginas/registrarse";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
        <React.StrictMode>
            <Registrarse/>
        </React.StrictMode>
    </Router>
);

