import { useEffect, useState } from "react";
import style from "../Song/SongSlidder.module.css";
import SongDetails from "../components/SongDetails";
// import { Link, Routes, Route,useHistory } from 'react-router-dom';
import { Link, useNavigate } from "react-router-dom";
import MusicPlayer from "../components/MusicPlayer";
function SongSlidder(props) {
  const [songList, setSongList] = useState([]);
  const [titleAndId, setTitleAndId] = useState();
  const [showSongDetailComp, setSongDetailComp] = useState(false);
  let [selectedSong, setSelectedSong] = useState();
  const navigate = useNavigate();

  // let limitOfSong=20;

  let { title } = props;
  const url = `https://academics.newtonschool.co/api/v1/music/${title}`;
  const artistUrl = `https://academics.newtonschool.co/api/v1/music/artist?_id=`;

  async function clickHandler(album) {
    console.log(album, "onClick when song");
    if (album.songs) {
      const param = title + ":" + album._id;
      console.log(param, "onClick");
      navigate(`/page/` + param);
    } else {
      let artistsNameString;
      let artistNameList = album.artist?.map((artist) => {
        console.log(artist.name, "artistId");
        return artist.name;
      });
      artistsNameString = artistNameList.join(",");
      console.log(artistsNameString, "artist name string");
      selectedSong = {
        _id: album._id,
        audio_url: album.audio_url,
        title: album.title,
        artistsNameString: artistsNameString,
        thumbnail: album.thumbnail,
      };
      setSelectedSong(selectedSong);
    }
  }

  useEffect(() => {
    fetch(url, {
      headers: {
        projectId: "8nbih316dvO1",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data, "Song Slider data");
        setSongList(data.data);
      });
  }, []);

  return (
    <>
      <div className={style.songContainer}>
        <div className={style.ContainerHeading}>
          <h2 className={style.title}>{title}</h2>
          <h4 className={style.more}>
            <Link to={`/page/${titleAndId}`}>More</Link>
          </h4>
        </div>
        <div className={style.songsContainer}>
          {songList?.map((item, index) => (
            <div key={index}>
              <div
                className={
                  title === "artist" ? style.artistImage : style.squareContainer
                }
                onClick={() => clickHandler(item)}
              >
                {item.image && <img src={item.image} alt={item.title} />}
                {item.thumbnail && (
                  <img src={item.thumbnail} alt={item.title} />
                )}
              </div>
              {item.title &&
                (item.title.length > 18 ? (
                  <h4 className={style.songTitle}>
                    {item.title.substring(0, 18)}...
                  </h4>
                ) : (
                  <h4 className={style.songTitle}>{item.title}</h4>
                ))}
              {item.name &&
                (item.name.length > 18 ? (
                  <h4 className={style.songTitle}>
                    {item.name.substring(0, 18)}...
                  </h4>
                ) : (
                  <h4 className={style.songTitle}>{item.name}</h4>
                ))}
            </div>
          ))}
        </div>
      </div>
      {selectedSong && (
        <div className={style.musicPlayer}>
          <MusicPlayer songList={selectedSong} />
        </div>
      )}
    </>
  );
}
export default SongSlidder;

// import { useEffect, useState } from 'react';
// import style from '../Song/SongSlidder.module.css'
// function SongSlidder(props){
//     const [songList,setSongList]=useState([])

//     const {title}=props
//     console.log(title)

//     useEffect(()=>{
//         fetch(`https://academics.newtonschool.co/api/v1/music/song?filter={"mood":"${title}"}`, {
//             headers:{
//                 'projectId': '8nbih316dvO1'
//             }
//         }).then((response)=>response.json()).then((data)=>{
//             setSongList(data.data)
//         })
//     },[])

//     return(
//         <>
//         <div className={style.songContainer}>
//             <div className={style.ContainerHeading}>
//                 <h2 className={style.title}>New Release</h2>
//                 <h4 className={style.more}>more</h4>
//             </div>
//             <div className={style.songsContainer}>
//                 {songList.map((item,index)=>(
//                     <div>
//                         <div className={style.squareContainer}>
//                             <img src={item.thumbnail} alt={item.title}/>
//                         </div>
//                         {item.title.length>18 ? <h4 className={style.songTitle}>{item.title.substring(0,18)}...</h4> : <h4 className={style.songTitle}>{item.title}</h4>}
//                     </div>
//                 ))}
//             </div>

//         </div>
//         </>
//     )
// }
// export default SongSlidder;
