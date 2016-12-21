require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';

let yeomanImage = require('../images/yeoman.png');

const TodoList = (props)=>(
    <ul>
        {
            props.items.map((item)=>(
                <li key={item.id}>{item.text}</li>
            ))
        }
    </ul>
)

class TodoApp extends React.Component{
    constructor(props){
        super(props);
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            items: [],
            text: '',
        }
    }
    onChange(e){
        this.setState({text: e.target.value})
    }
    handleSubmit(e){
        e.preventDefault();
        const nextItems = this.state.items.concat([{text: this.state.text, id: Date.now()}]);
        const nextText = '';
        this.setState({items: nextItems, text: nextText});
    }
    render() {
        return (
            <div>
                <h3>TODO</h3>
                <form onSubmit={this.handleSubmit}>
                    <input onChange={this.onChange} value={this.state.text} />
                    <button>{'Add #' + (this.state.items.length + 1)}</button>
                </form>
                <TodoList items={this.state.items} />
            </div>
        );
    }
}

export default TodoApp;
