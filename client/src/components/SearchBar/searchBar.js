import React from 'react';

const SearchBar = (props) =>{
    return(
        <div className="container">
                <label htmlFor="from">From:</label>
                <input type="date" id="from" value={props.selectedFrom} onChange={(e)=>props.handleChange(e, "selectedFrom")}/>

                <label htmlFor="to">To:</label>
                <input type="date" id="to" value={props.selectedTo} onChange={(e)=>props.handleChange(e, "selectedTo")}/>

                <label htmlFor='category'>Category:</label>
                <select id='category' value={props.selectedCategory} onChange={(e)=>props.handleChange(e, "selectedCategory")}>
                    <option value=''>--Select--</option>
                    {props.filteredCategories.map((category, index)=>(
                        <option key={index} value={category}>{category}</option>
                    ))}
                </select>
                <button onClick={props.handleClear}>Clear</button>
        </div>
)
};

export default SearchBar;