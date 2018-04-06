import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './_Components/App';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './Store'

import {Provider} from 'react-redux'
const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>, document.getElementById('root'));
registerServiceWorker();
