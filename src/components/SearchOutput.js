import { useState } from "react";
import style from "./SearchOutput.module.css";
import { useNavigate } from "react-router-dom";
function SearchOutput(param) {
  const navigate = useNavigate();
  const [selectedSongType, setSlecetdSongType] = useState("song");
  const { data, val, aplyFilter } = param;
  console.log(data, "serchOutput");
  return (
    <div className={style.main}>
      <div className={style.searchHeading}>
        <h1>Search results for "{val}"</h1>
      </div>
      <div className={style.heading}>
        <h3
          className={selectedSongType === "song" ? style.selected : ""}
          onClick={() => {
            setSlecetdSongType("song");
            aplyFilter("song", "title");
          }}
        >
          Songs
        </h3>
        <h3
          className={selectedSongType === "album" ? style.selected : ""}
          onClick={() => {
            setSlecetdSongType("album");
            aplyFilter("album", "title");
          }}
        >
          Albums
        </h3>
        <h3
          className={selectedSongType === "artist" ? style.selected : ""}
          onClick={() => {
            setSlecetdSongType("artist");
            aplyFilter("artist", "name");
          }}
        >
          Artists
        </h3>
        <h3
          className={selectedSongType === "playList" ? style.selected : ""}
          onClick={() => setSlecetdSongType("playList")}
        >
          Playlists
        </h3>
        <h3
          className={selectedSongType === "podcast" ? style.selected : ""}
          onClick={() => setSlecetdSongType("podcast")}
        >
          Podcast
        </h3>
      </div>
      <div className={style.songs}>
        {data?.map((song, index) => (
          <div
            className={style.song}
            key={index}
            onClick={() => {
              navigate(`/page/${selectedSongType}:${song._id}`);
            }}
          >
            <div>
              {song?.thumbnail && (
                <img
                  className={style.image}
                  src={song?.thumbnail}
                  alt={song.title}
                />
              )}
              {song?.image && (
                <img
                  className={style.image}
                  src={song?.image}
                  alt={song.title}
                />
              )}
            </div>
            <div className={style.songDetails}>
              {song?.title?.length > 40 ? (
                <div>{song?.title?.substring(0, 18)}... </div>
              ) : (
                <div>{song?.title} </div>
              )}
              {song?.name?.length > 40 ? (
                <div>{song?.name?.substring(0, 18)}... </div>
              ) : (
                <div>{song?.name} </div>
              )}
              {/* <div>{song?.title?.substring(0, 18)} </div> */}
              {song?.artist && (
                <div>
                  {song.type} {song?.artist[0]?.name}
                </div>
              )}
              {song?.artists && (
                <div>
                  {song.type} {song?.artists[0]?.name}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default SearchOutput;
