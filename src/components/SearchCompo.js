import { useEffect, useState } from "react";
import style from "./SearchCompo.module.css";
function SearchCompo(props) {
  const [trendingSong, setTrendingSong] = useState();
  const { searchValue } = props;
  const url = "https://academics.newtonschool.co/api/v1/music/song";
  async function fetchData() {
    const response = await fetch(url, {
      headers: {
        projectId: "8nbih316dvO1",
      },
    });
    const data = await response.json();
    setTrendingSong(data.data);
    console.log(data.data, "data");
  }
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className={style.main}>
      <div className={style.title}> Trending Searches</div>
      <div className={style.songContainer}>
        {trendingSong?.map((item, index) => (
          <div key={index}>
            <img src={item.thumbnail} alt={item.title} />
            <h4 className={style.songTitle}>{item.title}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}
export default SearchCompo;
