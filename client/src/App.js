import React from 'react';

import SearchBar from './components/SearchBar/searchBar';
import NoteTable from './components/NoteTable/noteTable';
import Paginate from './components/Paginate/paginate';
import EditView from './components/EditView/editView';
import moment from 'moment';

//===========

function arrayUnique(array) {
    var a = array.concat();
    for(var i=0; i<a.length; ++i) {
        for(var j=i+1; j<a.length; ++j) {
            if(a[i] === a[j])
                a.splice(j--, 1);
        }
    }

    return a;
}
//===========

class App extends React.Component{
constructor(props){
    super(props);
    this.state = {
        noteList:[],
currentPage: 1,
notesPerPage: 7,
selectedFrom: "",
selectedTo: "",
selectedCategory: "",
editMode: false,
itemToEdit:{},

noteToSave: {},

response: '',
post: '',
responseToPost: '',

    }
}


componentDidMount() {
    this.callApi()
      .then(res => this.setState({ noteList: res }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    
    return body;
  };






//==============

incrementPage = (length) => {
    if(length> this.state.notesPerPage *this.state.currentPage){
        this.setState({currentPage:this.state.currentPage+1})
    }
}
decrementPage = () => {
    if(this.state.currentPage>1){
        this.setState({currentPage:this.state.currentPage-1})
    }
}
//e - event, name - name of state where we add the change
handleChange = (e,name) => {
    this.setState({[name]:e.currentTarget.value})
}

handleClear = () => {
    this.setState({selectedFrom: "",
    selectedTo: "",
    selectedCategory: "",})
}
/*
handleDelete = (index) => {
    const newNoteList = [...this.state.noteList];
    newNoteList.splice(index,1);
    this.setState({catList: newNoteList});
}
*/
handleDelete = async (index) => {
    await fetch('/api/delete', {
        method: 'POST',
      });
    const newNoteList = [...this.state.noteList];
    newNoteList.splice(index,1);
    this.setState({catList: newNoteList});
}
handleNew = () => {
    
    this.setState({editMode:true});

}
handleEdit = (index) => {
    console.log(index);
    this.setState({editMode:true, itemToEdit: index});

}
handleCancel = () =>{
this.setState({editMode:false});
}

handleSave = async note =>{
    const response = await fetch('/api/save', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify(note),
      });
      const body = await response.text();
        this.setState({
            responseToPost: body,
            noteList: this.state.noteList.concat(note),
            editMode: false
        });

}


testButton = async e => {
    e.preventDefault();
    const response = await fetch('/api/world', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: this.state.post }),
    });
    const body = await response.text();
    
    this.setState({ responseToPost: body });
  };




render(){
    const filteredFrom= this.state.noteList.filter(note => this.state.selectedFrom ? moment(note.date).isSameOrAfter(this.state.selectedFrom,'day') : true);
    const filteredTo = filteredFrom.filter(note => this.state.selectedTo ? moment(note.date).isSameOrBefore(this.state.selectedTo,'day') : true);
    const filteredList = filteredTo.filter(note => this.state.selectedCategory ? note.catList.includes(this.state.selectedCategory) : true);
    const maxPage = Math.ceil(filteredList.length / this.state.notesPerPage);
    let filteredCategories = [];
    filteredTo.forEach((note, index) => {filteredCategories = arrayUnique([...filteredCategories, ...(note.catList)])}
    );
    return (
        <div>
            {!this.state.editMode ?
            (<div>
                <SearchBar
                    handleClear={this.handleClear}
                    handleChange={this.handleChange}
                    selectedFrom={this.state.selectedFrom}
                    selectedTo={this.state.selectedTo}
                    selectedCategory={this.state.selectedCategory}
                    filteredCategories={filteredCategories}
                />
                <NoteTable
                    handleEdit={this.handleEdit}
                    handleDelete={this.handleDelete}
                    notes={filteredList.slice((this.state.currentPage-1)*this.state.notesPerPage,this.state.currentPage*this.state.notesPerPage)}
                    /> 
                <Paginate
                    handleNew={this.handleNew}
                    incrementPage={()=> this.incrementPage(filteredList.length)}
                    decrementPage={this.decrementPage}
                    currentPage={this.state.currentPage}
                    maxPage={maxPage}
                />
            </div>)
            :
            (<EditView
                noteToSave={this.state.noteToSave}
                arrayUnique={arrayUnique}
                handleSave={this.handleSave}
                handleCancel={this.handleCancel}
            />)}

        </div>
    )
    };
};
    

export default App;


