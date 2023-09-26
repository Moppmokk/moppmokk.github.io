import React, { useState, useEffect } from 'react';
import logo from './logo.jpg';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResult from '../SearchResult/SearchResult';
import Playlist from '../Playlist/Playlist';
import Track from '../Track/Track';
import axios from 'axios';

function App() {

  // token

  const [token, setToken] = useState("");
  useEffect(() => {
    const hash = window.location.hash
    let token = window.localStorage.getItem("token")

    if (!token && hash) {
        token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

        window.location.hash = ""
        window.localStorage.setItem("token", token)
    }

    setToken(token)
  }, []) 

  // user

  const [userId, setUserId] = useState("");

  const getUser = async (e) => {
    const {data} = await axios.get("https://api.spotify.com/v1/me", {
        headers: {
            Authorization: `Bearer ${token}`
        },
    })

    setUserId(data.id);
  }

  // search

  const CLIENT_ID = 'da32ad9710d44c12ba2961fc6bda4dda';
  const REDIRECT_URI = "https://moppmokk.github.io/";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  const [searchKey, setSearchKey] = useState("");
  const [tracks, setTracks] = useState([]);

  const searchTracks = async (e) => {
    const {data} = await axios.get("https://api.spotify.com/v1/search", {
        headers: {
            Authorization: `Bearer ${token}`
        },
        params: {
            q: searchKey,
            type: "track"
        }
    })

    setTracks(data.tracks.items);
  }

  // New Playlist

  const [playlistName, setPlaylistName] = useState("Enter Playlist Name");

  const [toPlaylist, setToPlaylist] = useState([]);
  const [trackIds, setTrackIds] = useState([]);
  useEffect(() => {
    if (!toPlaylist) {
      setToPlaylist([]);
    }
  })

    // save Playlist

    let errorTracker = '';

    const createPlaylist = async (e) => { 
      errorTracker = '';
      try {
        await getUser();
        const response = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: playlistName,
            public: true,
            description: 'A playlist generated through Jammming Project by OldMo'
         })
        })
        const jsonResponse = await response.json();
        const playlistId = jsonResponse.id;
        if (playlistId) {
          const replacePlaylistTracksUrl = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
          await fetch(replacePlaylistTracksUrl, {
              method: 'PUT',
              headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`
              },
              body : JSON.stringify({uris: toPlaylist.map(id => "spotify:track:".concat(id.id))})
          });
        }
      } catch (error) {
        console.log('error', error);
        errorTracker = error;
      }

      if (errorTracker === '') {
        window.alert(`Playlist ${playlistName} saved!`)
      }

    }



  return (
    <div className="App">
      <h1>Jammming</h1>
      <div className="logo"></div>
      <a className='button' href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=playlist-modify-public`}>Login to Spotify</a>
      <div className="App">
        <SearchBar 
          searchKey={searchKey} 
          handleChange2={e => setSearchKey(e)} 
          submitHandler={searchTracks}
          searchTracks={searchTracks}
          tracks={tracks}
        />
        <div className="App-playlist">
          <SearchResult 
            searchResults={tracks} 
            onAdd={tr => toPlaylist.some((i) => tr.searchResultObject === i) ? setToPlaylist(prev => { return prev.filter(newTr => newTr !== tr.searchResultObject)}) : setToPlaylist(prev => [tr.searchResultObject, ...prev]) } 
            toPlaylist={toPlaylist}
          />
          <Playlist 
            toPlaylist={toPlaylist}
            onAdd={tr => toPlaylist.some((i) => tr.searchResultObject === i) ? setToPlaylist(prev => { return prev.filter(newTr => newTr !== tr.searchResultObject)}) : setToPlaylist(prev => [tr.searchResultObject, ...prev]) } 
            changeName={name => setPlaylistName(name)}
            playlistName={playlistName}
            getUser={() => getUser()}
            createPlaylist={() => createPlaylist()}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
