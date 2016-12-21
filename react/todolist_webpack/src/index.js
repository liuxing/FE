import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
// import App from './components/Main';
// import Timer from './components/Timer';
import MardownEditor from './components/MardownEditor';

// Render the main component into the dom
ReactDOM.render(
    <MardownEditor/>,
    document.getElementById('app')
);
