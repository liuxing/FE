import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
// import App from './components/Main';
// import Timer from './components/Timer';
// import MardownEditor from './components/MardownEditor';
// import LifeCycle from './components/LifeCycle'
import UserGithub from './components/UserGithub'

// Render the main component into the dom
ReactDOM.render(
    <UserGithub source="https://api.github.com/users/ogilhinn"/>,
    document.getElementById('app')
);
