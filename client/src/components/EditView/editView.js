
import React from 'react';
import Title from '../Title/title';
import TextArea from '../TextArea/textArea';
import Footer from '../Footer/footer';

class EditView extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            title:'',
            contents:'',
            catList:[],
            markdown:false,
            warning: false,
            warning2: false
        }
    }
    //e - event, name - name of state where we add the change
handleChange = (e,name) => {
    this.setState({[name]:e.currentTarget.value})
}
handleCategoryChange = (value) => {
    this.setState({
        catList: this.props.arrayUnique(this.state.catList.concat(value)),
    });
}
handleRemove = (index) => {
    const newCatList = [...this.state.catList];
    newCatList.splice(index,1);
    this.setState({catList: newCatList});
}

handleSubmit = () => {
    // eslint-disable-next-line
    const re1 = /\`|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\[|\{|\]|\}|\||\\|\'|\<|\,|\.|\>|\?|\/|\""|\;|\:/
    const re2 = /[A-Za-z0-9_\\s]+/;
    //two regexp are used. re1 for checking special strings except for space. re2 only allows space if there are alphanum so that single space is not accepted.
    const checkCatList = this.state.catList
    if(!Array.isArray(checkCatList) || !checkCatList.length){
        checkCatList.push('Uncategorised');
    }
    if(this.state.title){
        if(!re1.test(this.state.title) && re2.test(this.state.title)){
            this.props.handleSave({
                title:this.state.title.trim(),
                contents:this.state.contents,
                catList:checkCatList,
                markdown:this.state.markdown
            });
            this.setState({warning:false, warning2:false});
        }else{
            this.setState({warning:false, warning2: true})
        }
    }
    else{
        this.setState({warning2: false, warning: true});
    }
    
}

handleMarkdownChange = () => {
    this.setState({markdown: !this.state.markdown});
}

    render(){
        return(
            <div>
                <Title
                    handleMarkdownChange={this.handleMarkdownChange}
                    title={this.state.title}
                    markdown={this.state.markdown}
                    handleChange={this.handleChange}
                />
                <TextArea
                    contents={this.state.contents}
                    handleChange={this.handleChange}
                />
                <Footer
                    noteToSave={this.props.noteToSave}
                    warning2={this.state.warning2}
                    warning={this.state.warning}
                    handleSubmit={this.handleSubmit}
                    handleRemove={this.handleRemove}
                    handleCategoryChange={this.handleCategoryChange}
                    catList={this.state.catList}
                    handleChange={this.handleChange}
                    handleCancel={this.props.handleCancel}
                    handleSave={this.props.handleSave}
                />
            </div>
    )
}
    
};

export default EditView;