import style from "./MusicPlayer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShuffle,
  faArrowLeft,
  faPause,
  faArrowRight,
  faPlay,
  faDownload,
  faVolumeXmark,
  faVolumeHigh,
} from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import { useEffect } from "react";

function MusicPlayer(props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  let [selectedSong, setSelectedSong] = useState();
  const { songList } = props;
  const audioRef = useRef(null);
  // console.log(songList[0], " song list");
  if (selectedSong === undefined && songList !== undefined) {
    if (songList[0] === undefined) {
      setSelectedSong(songList);
    } else {
      setSelectedSong(songList[0]);
    }
  }

  const togglePlay = async () => {
    if (isPlaying) {
      // console.log(audioRef.current.play(),'data')
      await audioRef.current.pause()?.catch((error) => {
        console.error("Failed to pause audio:", error);
      });
    } else {
      await audioRef.current.play()?.catch((error) => {
        console.error("Failed to play audio:", error);
      });
    }
    setIsPlaying(!isPlaying);
  };

  const downloadBtn = () => {
    // audioRef.current.download()
    const downloadLink = document.createElement("a");
    downloadLink.href = selectedSong.audio_url; // Replace with your audio URL
    downloadLink.download = "audio_file.mp3"; // Replace with desired file name and extension
    downloadLink.click();
  };

  function prevSong() {
    if (selectedSong !== undefined) {
      const currentIndex = songList.findIndex(
        (song) => song._id === selectedSong._id
      );
      setSelectedSong(songList[currentIndex - 1]);
    }
  }
  function nextSong() {
    if (selectedSong !== undefined) {
      const currentIndex = songList.findIndex(
        (song) => song._id === selectedSong._id
      );
      console.log("nextsong", currentIndex);
      if (currentIndex !== -1) {
        setSelectedSong(songList[currentIndex + 1]);
      }
    }
  }

  const handleVolumeChange = (e) => {
    if (audio) {
      console.log(audioRef.current.volume, "audio");
      audioRef.current.volume = 0;
      setAudio(false);
    } else {
      console.log(audioRef.current.volume, "audio");
      audioRef.current.volume = 1;
      setAudio(true);
    }
  };

  const handleTimeUpdate = () => {
    setCurrentTime(Math.floor(audioRef.current.currentTime));
    setDuration(Math.floor(audioRef.current.duration));
    console.log(duration, "duration");
    if (
      Math.floor(audioRef.current.currentTime) ===
      Math.floor(audioRef.current.duration)
    ) {
      setIsPlaying(false);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={selectedSong?.audio_url}
        onTimeUpdate={handleTimeUpdate}
      />

      <div className={style.main}>
        <div className={style.leftDiv}>
          <img
            className={style.image}
            src={selectedSong?.thumbnail}
            alt={selectedSong?.title}
          />
          <div className={style.des}>
            <div>{selectedSong?.title}</div>
            <div>{selectedSong?.artistsNameString}</div>
          </div>
        </div>
        <div className={style.midDiv}>
          <button>
            <FontAwesomeIcon className={style.btn} icon={faShuffle} />
          </button>
          <button onClick={prevSong}>
            <FontAwesomeIcon className={style.btn} icon={faArrowLeft} />
          </button>
          {isPlaying && (
            <button onClick={togglePlay}>
              <FontAwesomeIcon className={style.btn} icon={faPause} />
            </button>
          )}
          {!isPlaying && (
            <button onClick={togglePlay}>
              <FontAwesomeIcon className={style.btn} icon={faPlay} />
            </button>
          )}
          <button onClick={nextSong}>
            <FontAwesomeIcon className={style.btn} icon={faArrowRight} />
          </button>
        </div>
        <div className={style.rightDiv}>
          <button>
            <FontAwesomeIcon
              onClick={downloadBtn}
              className={style.btn}
              icon={faDownload}
            />
          </button>
          <div>
            00:{currentTime}/00:{duration}
          </div>
          <select>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
          {audio && (
            <button onClick={handleVolumeChange}>
              {" "}
              <FontAwesomeIcon className={style.btn} icon={faVolumeHigh} />
            </button>
          )}
          {!audio && (
            <button onClick={handleVolumeChange}>
              <FontAwesomeIcon className={style.btn} icon={faVolumeXmark} />
            </button>
          )}
        </div>
      </div>
    </>
  );
}
export default MusicPlayer;
