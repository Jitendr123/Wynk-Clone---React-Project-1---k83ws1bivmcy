import { useState } from "react";
import style from "./Login.module.css";
import { useNavigate } from "react-router-dom";
const playStoreBtn = require("../resources/play-store.icon.png");
const appleStoreBtn = require("../resources/apple-store.btn.png");
const loginImage = require("../resources/loginImage.png");
const singUpURL = "https://academics.newtonschool.co/api/v1/user/login";
function LoginModal(props) {
  const { loginModal, signupModal, saveUser } = props;
  let [loginResponse, setLoginResponse] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
    appType: "music",
  });

  function updateUser(inputValue, key) {
    setUser({
      ...user,
      [key]: inputValue,
    });
  }

  async function singUp(event) {
    loginResponse = {};
    await event.preventDefault();
    const response = await fetch(singUpURL, {
      method: "POST",
      headers: {
        projectId: "8nbih316dvO1",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    localStorage.setItem("token", data.token);
    setLoginResponse(data);
    if (data.status === "success") {
      saveUser(data.data);
      setTimeout(() => {
        loginModal(false);
      }, 2000);
    }
  }

  return (
    <div className={style.main}>
      <img className={style.loginImage} src={loginImage} alt="none" />
      <div className={style.rightDiv}>
        <div className={style.crossButton} onClick={() => loginModal(false)}>
          X
        </div>
        <h1>Log In</h1>
        <p>Get a personalised experience, and access all your music</p>
        {loginResponse.status === "success" && (
          <div className={style.success}>
            Congratulation you have been Login succesfully
          </div>
        )}
        <form>
          <div className={style.input}>
            <div className={style.countryCode}>Email</div>
            <input
              type="email"
              placeholder="Enter Your Email"
              onInput={(event) => {
                updateUser(event.target.value, "email");
              }}
            />
          </div>
          <div className={style.input}>
            <div className={style.countryCode}>Password</div>
            <input
              type="password"
              placeholder="Enter Your Password"
              onInput={(event) => {
                updateUser(event.target.value, "password");
              }}
            />
          </div>
          <button onClick={(event) => singUp(event)}>Log In</button>
          {loginResponse && (
            <div className={style.fail}>{loginResponse?.message}</div>
          )}
        </form>
        <div>
          <div>
            Don't have Account:
            <span
              onClick={() => {
                loginModal(false);
                signupModal(true);
              }}
            >
              Click here
            </span>
          </div>
        </div>
        <h4>To create your account, install Wynk app</h4>
        <div className={style.redirectingButton}>
          <div id={style.appIcon}>
            <img src={playStoreBtn} alt="none" />
          </div>
          <div id={style.appIcon}>
            <img src={appleStoreBtn} alt="none" />
          </div>
        </div>
      </div>
    </div>
  );
}
export default LoginModal;
