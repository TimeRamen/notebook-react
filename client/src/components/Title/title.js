import React from 'react';

const Title = (props) =>{
    return(
        <div className="container">
    <input 
    type="text" name="title" id="title" placeholder="Title of the note" required
    value={props.title} onChange={(e)=>props.handleChange(e, "title")} />
    
    <label htmlFor="markdown" >Markdown: </label>
        <input type="checkbox" id="markdown" name="markdown" checked={props.markdown} onChange={props.handleMarkdownChange}/>
    </div>
)
};

export default Title;