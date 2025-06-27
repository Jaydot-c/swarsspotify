// src/App.jsx
import React, { useRef, useState } from "react";
import "./App.css";
import songs from "./songsData";
import SongCard from "./components/SongCard";

function App() {
  const [currentlyPlayingIndex, setCurrentlyPlayingIndex] = useState(null);
  const mediaRefs = useRef([]);

   const handlePlay = (index) => {
    // Pause all other audios and videos
    mediaRefs.current.forEach((media, i) => {
      if (media && i !== index) {
        if (media.audio) {
          media.audio.pause();
          media.audio.currentTime = 0;
        }
        if (media.video) {
          media.video.pause();
          media.video.currentTime = 0;
        }
      }
    });
    setCurrentlyPlayingIndex(index);
  };

  const registerAudioRef = (index, audio) => {
    mediaRefs.current[index] = audio;
  };

  return (
    <div className="App">
      <h1> Swarspotify 💖</h1>
      <p className="subtitle">Shuddh Desi Romance 💕</p>
      <div className="song-list">
        {songs.map((song, index) => (
          <SongCard
            key={index}
            index={index}
            {...song}
            isPlaying={currentlyPlayingIndex === index}
            onPlay={() => handlePlay(index)}
            registerAudioRef={registerAudioRef}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
