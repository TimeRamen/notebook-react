import React from 'react';
import moment from 'moment';

const NoteTable = (props) =>{
    return(
        <div className="container">
                
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.notes.map((note,index) => (
                            <tr key={index}>
                                <td>{note.title}</td>
                                <td>{moment(note.date).format('L')}</td>
                        <td><button onClick={props.handleEdit}>Edit</button><button onClick={props.handleDelete}>Delete</button></td>
                            </tr>
                        ))}

                    </tbody>
                </table>
                
            </div>
)
};

export default NoteTable;