require('normalize.css/normalize.css');
require('styles/editor.css');
import React from 'react';
import Remarkable from 'remarkable'

/**
 * markdown editor
 */
class MardownEditor extends React.Component{
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.rawMarkup = this.rawMarkup.bind(this);
        this.state = {
            value: `
> A JAVASCRIPT LIBRARY FOR BUILDING USER INTERFACES \n
![react](http://image.beekka.com/blog/2015/bg2015031302.jpg)`
        }
    }

    handleChange(){
        this.setState({value: this.refs.textarea.value})
    }

    rawMarkup(){
        const md = new Remarkable();
        return {__html:md.render(this.state.value)}
    }

    render(){
        return(
            <div className="editor">
                <textarea
                    onChange={this.handleChange}
                    ref="textarea"
                    defaultValue={this.state.value}
                    className="editor-input" />
                <div className="editor-output"  dangerouslySetInnerHTML={this.rawMarkup()}></div>
            </div>
        )
    }
}

export default MardownEditor
