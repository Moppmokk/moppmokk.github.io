import React, { useState } from 'react';
import './Track.css';

function Track(props) {

    const addToPlaylist = (e) => {
        props.onAdd(props);
    }

    return(
        <div className="Track">
            <div className="Track-information">
                <h3>{props.searchResultObject.name}</h3>
                <p>{props.searchResultObject.artists[0].name} | {props.searchResultObject.album.name}</p>
            </div>
            <button className="buttonAddTrack" onClick={addToPlaylist}>
                {props.toPlaylist.some(e => e.id === props.searchResultObject.id) ? 'Remove' : 'Add'}
            </button>
        </div>
    )
}

export default Track;