import React from 'react';

class Footer extends React.Component
{
constructor(props){
    super(props);
    this.state = {
        category: '',
    };
}
handleCategoryChange = (e) => {
    this.setState({category: e.currentTarget.value});
}
handleToggle = () => {
    this.props.handleCategoryChange(this.state.category.trim());
    this.setState({category:''});
}


render(){
    return(
        <div className="container">
            <div className="row">
                <div className="col-6">
                            <div className="col-6">
                                <p>Category List</p>
                                    <div id="scroll">
                                    {this.props.catList.map((category,index) => (
                                            <li key={index}>
                                                {category} <span className='cancel' onClick={() => this.props.handleRemove(index)}>x</span>
                                            </li>
                                        ))}
                                    </div>
                                    <input onKeyDown={(e)=>{ 
                                        if(e.keyCode===13){
                                            e.preventDefault();
                                            this.handleToggle();
                                        }
                                    }} type="text" name="cname" id="cname" value={this.state.category} onChange={this.handleCategoryChange} />
                                    <button onClick={this.handleToggle}>Enter</button>
                            </div>
                            <div className="col-6">
                            </div>
                </div>

                <div className="col-6">
                    <button className="conf-button" method='post' onClick={this.props.handleSubmit}>Save</button>
                    <button className="conf-button" onClick={this.props.handleCancel}>Cancel</button>
                    {this.props.warning && 
                    (<p id="warning">Title cannot be empty!</p>)}
                    {this.props.warning2 && 
                    (<p id="warning">Title cannot have special characters!</p>)}
                </div>
            </div>
        </div>

)
}
};

export default Footer;