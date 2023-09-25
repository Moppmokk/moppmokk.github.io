import React, { useState, useEffect } from 'react';
import './TrackList.css';
import Track from '../Track/Track';

function TrackList({searchResults, onAdd, toPlaylist}, props) {

    return (
        <div className="TrackList">
            {searchResults.map(
                searchResultObject => 
                <Track 
                    key={searchResultObject.id} 
                    searchResultObject={searchResultObject}
                    onAdd={tr => onAdd(tr)}                 
                    toPlaylist={toPlaylist}
                />
            )}
        </div>
    )
}

export default TrackList;