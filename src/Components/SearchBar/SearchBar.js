import React, { useState } from "react";
import './SearchBar.css';

function SearchBar({ handleChange2, searchKey, searchTracks, tracks }) {

    const handleChange = (e) => {
        handleChange2(e.target.value);
    }

    const handleSubmit = (e) => {
            searchTracks();
    }

    return(
        <div className="SearchBar">
            <input placeholder="Enter a Song, Album, Artist..." onChange={handleChange} value={searchKey} />
            <button className="SearchButton" onClick={handleSubmit}>SEARCH</button>
        </div>
    )
}

export default SearchBar;