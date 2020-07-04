import React from 'react';
import ReactDOM from 'react-dom';
import 'babel-polyfill';
import '@fortawesome/fontawesome-free/css/all.min.css';
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "mdbreact/dist/css/free/modules/animations-extended/animations-extended.css"
  import App from './src/app.jsx';

ReactDOM.render(<App />, document.getElementById('app'));