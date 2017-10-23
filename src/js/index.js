import 'babel-polyfill';
import React from 'react';
import ReactDOM, { render } from 'react-dom';
import App from './containers/App';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../css/normalize.css';
import '../css/style.css';

ReactDOM.render(
	<App />, 
	document.getElementById('root')
);