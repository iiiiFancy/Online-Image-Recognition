import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import 'tachyons';
import App from './containers/App';

ReactDOM.render(
	<App /> // cardlist has prop: robots, where robots comes from {robots}
	// 每当刷新网页 App 组件便挂载在Id为root的document上（见index.html）（用App替代root）
, document.getElementById('root')
);
registerServiceWorker();

