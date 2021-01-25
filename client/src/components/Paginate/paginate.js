import React from 'react';

const Paginate = (props) =>{
    return(
        <div className="container">
        
        <div className="row">
          <div className="col-6">
                <button onClick={props.handleNew}>New</button>
          </div>
          <div className="col-6">
                <button onClick={props.decrementPage}>Back</button>
    <span>Page {props.maxPage ? props.currentPage : 0} / {props.maxPage}</span>
                <button onClick={props.incrementPage}>Next</button>
          </div>
        </div>
      </div>
)
};

export default Paginate;