import React, { useState, useEffect } from 'react';
import './SearchResult.css';
import TrackList from '../TrackList/Tracklist';

function SearchResult({ searchResults, onAdd, toPlaylist }) {


    return(
        <div className="SearchResult">
            <h2>Results</h2>
            <TrackList
                searchResults={searchResults}
                onAdd={tr => onAdd(tr)} 
                toPlaylist={toPlaylist}
            />
        </div>
    )
}

export default SearchResult;