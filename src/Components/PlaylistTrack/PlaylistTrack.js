import React, { useState } from 'react';
import './PlaylistTrack.css';

function Track(props) {

    const addToPlaylist = (e) => {
        props.onAdd(props);
    }

    return(
        <div className="Track">
            <div className="Track-information">
                <h3>{props.toPlaylistObject.name}</h3>
                <p>{props.toPlaylistObject.artists[0].name} | {props.toPlaylistObject.album.name}</p>
            </div>
        </div>
    )
}

export default Track;