import { useState } from "react";
import style from "../Style/NavBar.module.css";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [isHover, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const songGener = [
    "All",
    "Favorite Song",
    "Trending Song",
    "Old Song",
    "New Song",
    "Moods & Genre",
    "Top Album",
    "Top PlayList",
    "Podcast",
  ];
  const moodsAndGener = ["Happy", "Excited", "Romantic", "Sad"];
  function selectGener(data, index) {
    setSelectedIndex(index);
    console.log(index);
    if (data === "Favorite Song") {
      navigate("/music/favorite-song");
    } else if (data === "All") {
      navigate("/");
    } else if (data === "Trending Song") {
      navigate("music/trending-songs");
    }
  }

  function toggleHover(data) {
    console.log("data", data);
    if (data === "Moods & Genre") {
      setIsHovered(true);
    } else {
      setIsHovered(false);
    }
  }

  return (
    <>
      <div className={style.main}>
        <div className={style.main}>
          {songGener.map((data, index) => (
            <>
              <div
                key={index}
                className={
                  // selectedIndex === index
                  //   ? style.gener + " " + style.select
                  style.gener
                }
                onClick={() => {
                  selectGener(data, index);
                }}
                onMouseEnter={() => {
                  toggleHover(data);
                }}
                // onMouseLeave={() => setIsHovered(false)}
              >
                {data}
              </div>
            </>
          ))}
        </div>
      </div>
      {isHover ? (
        <MoodsAndGenerComponent
          moodsAndGener={moodsAndGener}
          selectedIndex={selectedIndex}
        />
      ) : (
        ""
      )}
    </>
  );
}
export default Navbar;

function MoodsAndGenerComponent(props) {
  var { moodsAndGener, selectedIndex } = props;
  return (
    <div className={style.hoverModal}>
      {moodsAndGener.map((data, index) => (
        <div
          key={index}
          className={
            selectedIndex === index
              ? style.moodsAndGener + " " + style.select
              : style.moodsAndGener
          }
          // onClick={() => {
          //   selectGener(data, index);
          // }}
        >
          {data}
        </div>
      ))}
    </div>
  );
}
