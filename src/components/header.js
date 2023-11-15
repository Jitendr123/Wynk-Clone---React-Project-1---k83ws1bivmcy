import {
  faBars,
  faIndianRupeeSign,
  faMagnifyingGlass,
  faMusic,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import style from "./Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, redirect, useLocation } from "react-router-dom";
import { useState, useRef } from "react";
import SearchOutput from "./SearchOutput";
import SearchCompo from "./SearchCompo";
import LoginModal from "../Login/LoginModal";
import Singup from "../Singup/Singup";
import { useEffect } from "react";
import Menu from "./Menu";
const appIcon = require("../resources/appImg.png");
function Header() {
  const navigate = useNavigate();
  const profileModalRef = useRef();
  const token = localStorage.getItem("token");
  const [searchedData, setSearchedData] = useState();
  const [searchVal, setSearchVal] = useState();
  const [user, setUser] = useState();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showProfileModal, setProfileModal] = useState(false);
  const [type, setType] = useState("song");
  const [paramKey, setParamKey] = useState("title");
  const url = `https://academics.newtonschool.co/api/v1/music/${type}?search=`;

  const location = useLocation();
  const currentUrl = location.pathname.split("/");
  const showSearchCompo = currentUrl.find((item) => item === "search");
  // console.log(showSearchCompo, "showSearchCompo");

  function handleProfileModal() {
    console.log("handleProfileModal", showProfileModal);
    setShowLoginModal(false);
    setShowSignupModal(false);
    if (showProfileModal) {
      setProfileModal(false);
    } else {
      setProfileModal(true);
    }
  }

  function handleLoginModal() {
    // console.log()
    setShowSignupModal(false);
    setProfileModal(false);
    if (showLoginModal) {
      setShowLoginModal(false);
    } else {
      setShowLoginModal(true);
    }
  }

  function saveUser(data) {
    setUser(data);
  }

  function aplyFilter(type, paramKey) {
    setParamKey(paramKey);
    setType(type);
  }

  async function searchSong(val) {
    if (val === undefined) {
      return;
    }
    setSearchVal(val);
    const param = {
      [paramKey]: val,
    };
    const response = await fetch(url + JSON.stringify(param), {
      headers: {
        projectId: "8nbih316dvO1",
      },
    });
    const data = await response.json();
    setSearchedData(data.data);
    console.log(data.data, "seach data");
  }

  function handleOutsideClick(e) {
    console.log(
      showProfileModal,
      "handleoutsideclick",
      !profileModalRef.current?.contains(e.target)
    );
    if (!showProfileModal && !profileModalRef.current?.contains(e.target)) {
      setProfileModal(false);
    }
  }

  useEffect(() => {
    searchSong(searchVal);
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [type]);

  return (
    <>
      <div id={style.header}>
        {/* left div */}
        <div id={style.leftDiv} onClick={() => navigate("/")}>
          <div id={style.appIcon}>
            <img src={appIcon} alt="none" />
          </div>
          <div id={style.appName}>Wynk Music</div>
        </div>
        {/* right div */}
        <div id={style.rightDiv}>
          {/* search bar  */}
          <div>
            <form className={style.searchContainer}>
              <FontAwesomeIcon id={style.searchIcon} icon={faMagnifyingGlass} />
              <input
                id={style.searchBar}
                type="text"
                placeholder="Search Song"
                name="search"
                onClick={() => navigate("/music/search")}
                onInput={(event) => searchSong(event.target.value)}
              />
            </form>
          </div>
          {/* subscription div  */}
          <div
            id={style.userLogin}
            onClick={() => navigate("/music/subscription")}
          >
            <FontAwesomeIcon id={style.userIcon} icon={faIndianRupeeSign} />
            <p style={{ margin: "auto" }}>Manage Subcription</p>
          </div>
          {/* user login div  */}
          <div id={style.userLogin} onClick={handleLoginModal}>
            {!token && (
              <>
                <FontAwesomeIcon id={style.userIcon} icon={faUser} />
                <p style={{ margin: "auto" }}>Login</p>{" "}
              </>
            )}
            {token && (
              <>
                <FontAwesomeIcon id={style.userIcon} icon={faMusic} />
                <p style={{ margin: "auto" }}>My Music</p>{" "}
              </>
            )}
          </div>
          <FontAwesomeIcon
            id={style.menuIcon}
            icon={faBars}
            onClick={handleProfileModal}
          />
        </div>
      </div>
      {showLoginModal && (
        <LoginModal
          saveUser={saveUser}
          loginModal={setShowLoginModal}
          signupModal={setShowSignupModal}
        />
      )}
      {showSignupModal && (
        <Singup
          saveUser={saveUser}
          loginModal={setShowSignupModal}
          signupModal={setShowSignupModal}
        />
      )}
      {!searchVal && showSearchCompo && <SearchCompo />}
      {searchVal && (
        <SearchOutput
          data={searchedData}
          val={searchVal}
          aplyFilter={aplyFilter}
        />
      )}
      {showProfileModal && (
        <div ref={profileModalRef}>
          <Menu user={user} />
        </div>
      )}
    </>
  );
}
export default Header;

// function loginModal() {}
// export default loginModal;
