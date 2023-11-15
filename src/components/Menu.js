import {
  faDoorOpen,
  faDownload,
  faIcons,
  faLanguage,
  faMusic,
  faPodcast,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import style from "./Menu.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import UpdateUser from "./UpdateUser";
import { useNavigate } from "react-router-dom";
function Menu(props) {
  const { user, useRef } = props;
  const [updateUserModal, setUpdateUserModal] = useState(false);
  const navigate = useNavigate();
  function handleUpdateUserModal() {
    console.log("useref", useRef);
    if (updateUserModal) {
      setUpdateUserModal(false);
    } else {
      setUpdateUserModal(true);
    }
  }
  function logOut() {
    setUpdateUserModal(false);
    console.log("menu");
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <>
      <div className={style.main}>
        {user && (
          <div onClick={handleUpdateUserModal}>
            <h4>
              <FontAwesomeIcon icon={faUser} />
              {user?.name}
            </h4>
          </div>
        )}
        <div>
          <h4>
            <FontAwesomeIcon icon={faDownload} /> Download App
          </h4>
        </div>
        <div>
          <h4>
            <FontAwesomeIcon icon={faLanguage} /> Select Language
          </h4>
        </div>
        <div>
          <h4>
            <FontAwesomeIcon icon={faMusic} /> Sound Quality
          </h4>
        </div>
        <div>
          <h4>
            <FontAwesomeIcon icon={faPodcast} /> Podcast
          </h4>
        </div>
        <div>
          <h4 onClick={logOut}>
            <FontAwesomeIcon icon={faDoorOpen} /> Sing Out
          </h4>
        </div>
        <div>
          <h4>
            <FontAwesomeIcon icon={faIcons} /> Join Wynk For Artist
          </h4>
          <p>
            Sing up as an artist on Wynk Studio and Release Your Original Song
            On Wynk
          </p>
        </div>
      </div>
      {updateUserModal && (
        <UpdateUser user={user} handleUpdateUserModal={handleUpdateUserModal} />
      )}
    </>
  );
}
export default Menu;
