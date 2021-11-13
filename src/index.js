import React from "react";
import ReactDom from 'react-dom';
import App from './app/App';
import './index.scss';
import {createStore} from "redux";



ReactDom.render(
    <App/>,
    document.getElementById('root')
);
