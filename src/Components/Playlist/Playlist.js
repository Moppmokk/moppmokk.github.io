import React, { useState } from 'react';
import TrackList from '../TrackList/Tracklist';
import './Playlist.css';
import PlaylistTrack from '../PlaylistTrack/PlaylistTrack';

function Playlist({ toPlaylist, onAdd, changeName, playlistName, getUser, createPlaylist }) {

    const handleChange = (e) => {
        changeName(e.target.value);
    }

    const saveToSpotify = () => {
        createPlaylist();

    }

    return(
        <div className="Playlist">
            <input onChange={handleChange} value={playlistName} />
            {toPlaylist.map(
                toPlaylistObject => 
                    <PlaylistTrack 
                        key={toPlaylistObject.id} 
                        toPlaylistObject={toPlaylistObject} 
                        onAdd={tr => onAdd(tr)}
                        toPlaylist={toPlaylist} 
                    />
            )}
            <button className="Playlist-save" onClick={saveToSpotify}>Save To Spotify</button>
        </div>
    )
}

export default Playlist;