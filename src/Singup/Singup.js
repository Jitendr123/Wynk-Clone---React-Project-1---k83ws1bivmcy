import { useState } from "react";
import style from "./Singup.module.css";
import { useNavigate } from "react-router-dom";
const playStoreBtn = require("../resources/play-store.icon.png");
const appleStoreBtn = require("../resources/apple-store.btn.png");
const loginImage = require("../resources/loginImage.png");
const singUpURL = "https://academics.newtonschool.co/api/v1/user/signup";
function Singup(props) {
  const { loginModal, signupModal, saveUser } = props;
  const [user, setUser] = useState({
    email: "",
    password: "",
    name: "",
    appType: "music",
  });
  let [loginResponse, setLoginResponse] = useState(false);

  function updateUser(inputValue, key) {
    setUser({
      ...user,
      [key]: inputValue,
    });
  }
  async function singUp(event) {
    loginResponse = {};
    console.log("singupppppp");
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
        signupModal(false);
      }, 2000);
    }
  }

  return (
    <div className={style.main}>
      <img className={style.loginImage} src={loginImage} alt="none" />

      <div className={style.rightDiv}>
        <div className={style.crossButton} onClick={() => signupModal(false)}>
          X
        </div>
        <h1>Sign Up</h1>
        <p>Get a personalised experience, and access all your music</p>
        {loginResponse?.data?.user?._id && (
          <div className={style.success}>
            Congratulation you have been succesfully Singin
          </div>
        )}
        {
          <form>
            <div className={style.input}>
              <div className={style.countryCode}>Name</div>
              <input
                type="text"
                placeholder="Enter Your Name"
                onInput={(event) => {
                  updateUser(event.target.value, "name");
                }}
              />
            </div>
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
            <button onClick={(event) => singUp(event)}>Sign Up</button>
            {loginResponse && (
              <div className={style.fail}>{loginResponse?.message}</div>
            )}
          </form>
        }

        <div>
          <h4>
            Already have an Account:
            <span
              onClick={() => {
                loginModal(true);
                signupModal(false);
              }}
            >
              Log in
            </span>
          </h4>
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
export default Singup;
