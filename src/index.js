import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import RecipeApp from './components/RecipeApp';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<RecipeApp />, document.getElementById('root'));
registerServiceWorker();



// WEBPACK FOOTER //
// ./src/index.js