import {
  faFacebook,
  faTwitter,
  faSquareInstagram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import style from "./LinkCompo.module.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function LinkComponent() {
  const navigate = useNavigate();
  return (
    <div className={style.main}>
      <div className={style.link}>
        <ul>
          <a href="https://wynk.in/corporate">
            <li>ABOUT US | </li>
          </a>
          <a href="">
            <li onClick={() => navigate("/music/privacy-policy")}>
              {" "}
              PRIVACY POLICY |{" "}
            </li>
          </a>
          <a href="">
            <li> TERMS OF USES | </li>
          </a>
          <li> CONTACT US | </li>
          <li> HELLOTUNES</li>
        </ul>
        <div className={style.icons}>
          <a>
            <FontAwesomeIcon className={style.icon} icon={faFacebook} />
          </a>
          <a>
            <FontAwesomeIcon className={style.icon} icon={faTwitter} />
          </a>
          <a>
            <FontAwesomeIcon className={style.icon} icon={faSquareInstagram} />
          </a>
          <a>
            <FontAwesomeIcon className={style.icon} icon={faYoutube} />
          </a>
        </div>
      </div>
      <div className={style.des}>
        <div>
          Wynk Music is the one-stop music app for the latest to the greatest
          songs that you love. Play your favourite music online for free or
          download mp3. Enjoy from over 22 Million Hindi, English, Bollywood,
          Regional, Latest, Old songs and more.
        </div>
        <div>2023 © All rights reserved | Airtel Digital Limited</div>
      </div>
    </div>
  );
}
export default LinkComponent;
