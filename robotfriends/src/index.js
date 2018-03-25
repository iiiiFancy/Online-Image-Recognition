import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import 'tachyons';
import App from './App';

ReactDOM.render(
	<App /> // cardlist has prop: robots, where robots comes from {robots}
, document.getElementById('root')
);
registerServiceWorker();

