import React from 'react';

const TextArea = (props) =>{
    return(
    <div className="container">
<textarea id="note" name="note" rows="10" value={props.contents} placeholder="Content of Note" onChange={(e)=>props.handleChange(e, "contents")}></textarea>
    </div>
)
};

export default TextArea;