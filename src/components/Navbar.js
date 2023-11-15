import { useState } from "react";
import style from "../Style/NavBar.module.css";
import { useNavigate } from "react-router-dom";

function Navbar() {
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
  function selectGener(data, index) {
    setSelectedIndex(index);
    console.log(index);
    if (data === "Favorite Song") {
      navigate("/music/favorite-song");
    } else if (data === "All") {
      navigate("/");
    }
  }

  return (
    <>
      <div className={style.main}>
        <div className={style.main}>
          {songGener.map((data, index) => (
            <div
              key={index}
              className={
                selectedIndex === index
                  ? style.gener + " " + style.select
                  : style.gener
              }
              onClick={() => {
                selectGener(data, index);
              }}
            >
              {data}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
export default Navbar;
