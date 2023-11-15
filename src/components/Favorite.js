import { useEffect, useState } from "react";
import style from "./SongDetails.module.css";
import favStyle from "./Favorite.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDownload,
  faEllipsisVertical,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import MusicPlayer from "./MusicPlayer";
import LoginModal from "../Login/LoginModal";
import { addFavorite, removeFavorite } from "../Utility/addRemoveFavorite";

const favorateImage = require("../resources/favoriteImage.png");

function Favorite() {
  const [details, setDetails] = useState();
  const [songList, setSongList] = useState();
  let [selectedSong, setSelectedSong] = useState();

  // const {albumId,url}=props
  //GET ID AND TYPE BY PARAM
  //   const location = useLocation();
  //   const currentUrl = location.pathname.split("/");
  const token = localStorage.getItem("token");

  const url = `https://academics.newtonschool.co/api/v1/music/favorites/like`;
  const artistUrl = `https://academics.newtonschool.co/api/v1/music/artist?_id=`;

  async function getFavoriteSongs() {
    const response = await fetch(url, {
      headers: { projectId: "8nbih316dvO1", Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    console.log("Favorite songs ", data);
    getRequiredData(data.data);
    setDetails(data.data);
  }

  async function getRequiredData(data) {
    const requireDta = data?.songs?.map(async (item) => {
      const { _id, title, thumbnail, audio_url, artist: artistIdList } = item;
      let artistNameList = [];
      let artistsNameString;
      artistNameList = artistIdList?.map((artistId) => {
        return getArtistName(artistId);
      });
      await Promise.all(artistNameList).then(
        (data) => (artistsNameString = data.join(","))
      );
      let time;
      const timeDurationOfAudio = getTimeDurationOfAudio(audio_url);
      await timeDurationOfAudio.then((data) => {
        time = data;
        console.log(data, "pr");
      });
      return {
        _id,
        title,
        thumbnail,
        audio_url,
        artistsNameString,
        time,
      };
    });

    if (requireDta) {
      Promise?.all(requireDta).then((data) => {
        setSelectedSong(data[0]);
        setSongList(data);
      });
    }
  }

  async function getTimeDurationOfAudio(url) {
    const audio = new Audio(url);
    let duration = new Promise(async function (res, rej) {
      await audio.addEventListener("loadedmetadata", function () {
        res(audio.duration);
      });
    });
    //  console.log( duration,' time')
    return duration;
  }

  async function getArtistName(id) {
    const url = artistUrl + id;
    const response = await fetch(url, {
      headers: { projectId: "8nbih316dvO1" },
    });
    const data = await response.json();
    return data?.data[0]?.name;
  }

  //function for downaloading song  by clicking on downloading buttton
  const downloadSong = (song) => {
    // audioRef.current.download()
    const downloadLink = document.createElement("a");
    downloadLink.href = song.audio_url; // Replace with your audio URL
    console.log(downloadLink);
    downloadLink.download = "audio_file.mp3"; // Replace with desired file name and extension
    downloadLink.click();
  };

  function changeSong(song) {
    setSelectedSong(song);
    console.log(song, "selectedsong");
  }

  useEffect(() => {
    if (token === undefined) {
      return <LoginModal />;
    }
    getFavoriteSongs();
  }, []);

  return (
    <>
      <div className={style.mainDiv}>
        <div className={style.songImage}>
          {/* {details?.image && <img src={details?.image} alt={details?.title} />} */}

          <img src={favorateImage} alt={details?.title} />
        </div>
        <div className={style.songDescription}>
          <h2 className={style.songTitle}>{details?.title}</h2>
          <ul>
            <li>{details?.songs?.length} songs</li>
          </ul>
          <div className={style.playDownloadBtn}>
            <div className={style.playBtn}>
              <button>
                <FontAwesomeIcon className={style.playIcon} icon={faPlay} />{" "}
                <span>Play Song</span>
              </button>
            </div>
            <div className={style.downloadBtn}>
              <button>
                <FontAwesomeIcon
                  className={style.downloadBtn}
                  icon={faDownload}
                />
              </button>
              <button>
                <FontAwesomeIcon
                  className={style.downloadBtn}
                  icon={faEllipsisVertical}
                />
              </button>
            </div>
          </div>

          <div className={style.songsTable}>
            <table>
              <tbody>
                <tr>
                  <th>#</th>
                  <th>Track</th>
                  <th>Artist</th>
                  <th>Album</th>
                  <th>Duration</th>
                  <th></th>
                  <th></th>
                </tr>
                {!songList && (
                  <tr>
                    <td>1</td>
                    <td>{details?.title}</td>
                    {details?.artists && <td>{details?.artists[0]?.name}</td>}
                    {details?.artist && <td>{details?.artist[0]?.name}</td>}
                    <td>{details?.title}</td>
                    <td>0:{Math.floor(Number(selectedSong?.time))}</td>
                    <td>
                      <button>
                        <FontAwesomeIcon
                          className={style.downloadBtn}
                          icon={faDownload}
                          onClick={() => downloadSong(details)}
                        />
                      </button>
                    </td>
                    <td>
                      <button>
                        <FontAwesomeIcon
                          className={style.downloadBtn}
                          icon={faEllipsisVertical}
                        />
                      </button>
                    </td>
                  </tr>
                )}
                {songList?.map((song, index) => (
                  <tr key={index}>
                    <td onClick={() => changeSong(song)}>
                      <img
                        className={favStyle.songImage}
                        src={song.thumbnail}
                        alt="none"
                      />
                    </td>
                    <td onClick={() => changeSong(song)}>{song.title}</td>
                    <td onClick={() => changeSong(song)}>
                      {song.artistsNameString}
                    </td>
                    <td onClick={() => changeSong(song)}>{song.title}</td>
                    <td>0:{Math.round(Number(song.time))}</td>
                    <td>
                      <button>
                        <FontAwesomeIcon
                          className={style.downloadBtn}
                          icon={faDownload}
                          onClick={() => downloadSong(song)}
                        />
                      </button>
                    </td>
                    <td>
                      <button>
                        <FontAwesomeIcon
                          onClick={() => {
                            console.log("hello", song._id);
                            addFavorite(song._id);
                          }}
                          className={style.downloadBtn}
                          icon={faEllipsisVertical}
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className={style.musicPlayer}>
        <MusicPlayer selectedSong={selectedSong} />
      </div>
    </>
  );
}
export default Favorite;
