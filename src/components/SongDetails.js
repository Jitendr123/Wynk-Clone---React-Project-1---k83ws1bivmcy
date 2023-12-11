import { useEffect, useState } from "react";
import style from "./SongDetails.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDownload,
  faEllipsisVertical,
  faHeart,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import MusicPlayer from "./MusicPlayer";
import { useLocation } from "react-router-dom";
import { addFavorite } from "../Utility/addRemoveFavorite";

function SongDetails(props) {
  const [details, setDetails] = useState();
  const [songList, setSongList] = useState();
  let [selectedSong, setSelectedSong] = useState();
  const [isLogin, setLogin] = useState();

  // const {albumId,url}=props
  //GET ID AND TYPE BY PARAM
  const location = useLocation();
  const currentUrl = location.pathname.split("/");

  console.log("Current URL:", currentUrl[currentUrl.length - 1].split(":"));
  const title = currentUrl[currentUrl.length - 1].split(":")[0];
  const albumId = currentUrl[currentUrl.length - 1].split(":")[1];

  // const albumId='64cee72fe41f6d0a8b0cd0a7'
  const url = `https://academics.newtonschool.co/api/v1/music/${title}`;
  const artistUrl = `https://academics.newtonschool.co/api/v1/music/artist?_id=`;
  // console.log(props,'song details')
  async function getSongDetails() {
    const response = await fetch(url + "/" + albumId, {
      headers: { projectId: "8nbih316dvO1" },
    });
    if (response.status === "error") {
      console.log("error", response);
      throw new Error("no data available");
    }
    const data = await response.json();
    await getRequiredData(data.data);
    console.log(data.data, "helll000000000");
    setDetails(data.data);
  }

  async function getRequiredData(data) {
    if (data.songs === undefined) {
      let time;
      const timeDurationOfAudio = getTimeDurationOfAudio(data.audio_url);
      console.log(timeDurationOfAudio, "48");
      await timeDurationOfAudio.then((data) => {
        time = data;
      });
      selectedSong = {
        title: data.title,
        thumbnail: data.thumbnail,
        audio_url: data.audio_url,
        artistsNameString: data.artist[0].name,
        time,
      };
      setSelectedSong(selectedSong);
    } else {
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
    console.log("artist details", data);
    if (data.data !== undefined) {
      return data?.data[0]?.name;
    }
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
  async function handlerAddFavorite(id) {
    const response = await addFavorite(id);
    if (response.status === "fail") {
      setLogin(true);
    } else {
      setLogin(false);
    }
  }

  useEffect(() => {
    getSongDetails();
  }, []);

  return (
    <>
      <div className={style.mainDiv}>
        <div className={style.songImage}>
          {details?.image && <img src={details?.image} alt={details?.title} />}
          {details?.thumbnail && (
            <img src={details?.thumbnail} alt={details?.title} />
          )}
        </div>
        <div className={style.songDescription}>
          {isLogin && (
            <div style={{ color: "red", textAlign: "right", fontSize: "30px" }}>
              Please login first
            </div>
          )}
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
          {/*list area  */}
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
                  <th></th>
                </tr>
                {!songList && (
                  <tr>
                    <td> 1</td>
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
                  <tr key={index} onClick={() => changeSong(song)}>
                    <td>{index + 1}</td>
                    <td>{song.title}</td>
                    <td>{song.artistsNameString}</td>
                    <td>{song.title}</td>
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
                          className={style.downloadBtn}
                          icon={faHeart}
                          onClick={() => handlerAddFavorite(song._id)}
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
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className={style.musicPlayer}>
        <MusicPlayer songList={songList} selectSong={selectedSong} />
      </div>
    </>
  );
}
export default SongDetails;
