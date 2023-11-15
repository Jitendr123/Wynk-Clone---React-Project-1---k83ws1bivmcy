import { useState } from "react";
import style from "./UpdateUser.module.css";
import { useNavigate } from "react-router-dom";
const playStoreBtn = require("../resources/play-store.icon.png");
const appleStoreBtn = require("../resources/apple-store.btn.png");
const loginImage = require("../resources/loginImage.png");
const singUpURL =
  "https://academics.newtonschool.co/api/v1/user/updateMyPassword";

function UpdateUser(props) {
  const { user: currentDetails, handleUpdateUserModal } = props;
  const [updatedDetails, setUpdatedDetails] = useState();
  const [user, setUser] = useState({
    name: currentDetails?.name,
    email: currentDetails?.email,
    passwordCurrent: currentDetails?.password,
    password: "",
    appType: "music",
  });
  let [loginResponse, setLoginResponse] = useState(false);
  console.log("userrrrr", user);

  function updateUser(inputValue, key) {
    setUser({
      ...user,
      [key]: inputValue,
    });
  }
  async function updatePassword(event) {
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
      //   saveUser(data.data);
      setTimeout(() => {
        handleUpdateUserModal(false);
      }, 2000);
    }
  }

  return (
    <div className={style.main}>
      <img className={style.loginImage} src={loginImage} alt="none" />

      <div className={style.rightDiv}>
        <div
          className={style.crossButton}
          onClick={() => handleUpdateUserModal(false)}
        >
          X
        </div>
        <h1>Update Password</h1>
        {/* <p>Get a personalised experience, and access all your music</p> */}
        {loginResponse?.data?.user?._id && (
          <div className={style.success}>
            Congratulation you have been succesfully Updated Your Details
          </div>
        )}
        {
          <form>
            <div className={style.input}>
              <div className={style.countryCode}>Name</div>
              <input type="text" value={user?.name} />
            </div>
            <div className={style.input}>
              <div className={style.countryCode}>Email</div>
              <input type="email" value={user?.email} />
            </div>
            <div className={style.input}>
              <div className={style.countryCode}>Password</div>
              <input
                type="text"
                placeholder="Enter Your New Password"
                onInput={(event) => {
                  updateUser(event.target.value, "password");
                }}
              />
            </div>
            <br />
            <button onClick={(event) => updatePassword(event)}>
              Update Password
            </button>
            {loginResponse && (
              <div className={style.fail}>{loginResponse?.message}</div>
            )}
          </form>
        }

        {/* <div>
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
        </div> */}
        <br />
        <br />
        <h4>To create your account, install Wynk app</h4>
        <h1> </h1>
        <br />
        <br />
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
export default UpdateUser;
