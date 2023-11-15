import { Route, Routes, useLocation } from "react-router-dom";
import BannerSlider from "../Banner/BannerSlider";
import Description from "../components/Description";
import Header from "../components/header";
import MusicPlayer from "../components/MusicPlayer";
import Navbar from "../components/Navbar";
import SongDetails from "../components/SongDetails";
import ToRedirectMobileApp from "../components/ToRedirectMobileApp";
import Details from "../Footer/Details";
import SongSlidder from "../Song/SongSlidder";
import SearchCompo from "../components/SearchCompo";
import Singup from "../Singup/Singup";
import Menu from "../components/Menu";
import Subscription from "../Subscription/Subscription";
import Favorite from "../components/Favorite";
function Home() {
  const location = useLocation();
  const currentUrl = location.pathname.split("/");
  const isSubscription = currentUrl.find((item) => item === "subscription");
  const isSearch = currentUrl.find((item) => item === "search");
  return (
    <>
      <main>
        {!isSubscription && <Header />}
        {!isSubscription && !isSearch && <Navbar />}
        <Routes>
          {/* by default Route  */}
          <Route
            path="/"
            element={
              <>
                <BannerSlider />
                <SongSlidder title="album" />
                <SongSlidder title="song" />
                <SongSlidder title="artist" />
                <Description />
                <ToRedirectMobileApp />
                <Details />
              </>
            }
          ></Route>
          {/* Route for seleceting song from song slider  */}
          <Route
            path="/page/:id"
            element={
              <>
                <SongDetails />
                <Description />
                <ToRedirectMobileApp />
                <Details />
              </>
            }
          ></Route>
          {/* Route for search  */}
          <Route
            path="/music/favorite-song"
            element={<>{<Favorite />}</>}
          ></Route>
          <Route
            path="/music/subscription"
            element={<>{<Subscription />}</>}
          ></Route>
        </Routes>

        {/* <Navbar/> */}

        {/* <BannerSlider />
        <SongSlidder title="album" />
        <SongSlidder title="song" />
        <SongSlidder title="artist" /> */}
        {/* <SongSlidder/> */}
        {/* <SongDetails /> */}
        {/* <MusicPlayer /> */}
        {/* <Description />
        <ToRedirectMobileApp />
        <Details /> */}
      </main>
    </>
  );
}
export default Home;
