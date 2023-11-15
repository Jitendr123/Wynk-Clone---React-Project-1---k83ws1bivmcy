import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "./Subscription.module.css";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
const wynkLogoWhite = require("../resources/appImg.png");
const premiumImage = require("../resources/premiumImage.png");
function Subscription() {
  const [selectedPlan, setSelectedPlan] = useState(1);
  return (
    <div className={style.main}>
      <div className={style.top}>
        <h1>
          <img src={wynkLogoWhite} alt="none" />
          WYNKMUSIC
        </h1>
      </div>
      <div className={style.middle}>
        <div className={style.container}>
          <div className={style.card}>
            <div className={style.header}>
              <div className={style.title}>
                <p>Go Premium</p>
                <img src={premiumImage} alt="none" />
              </div>
              <small>Get the best of music &amp; podcasts</small>
            </div>
            <div className={style.table}>
              <table>
                <thead>
                  <tr>
                    <th>Benefits</th>
                    <th>Now</th>
                    <th>Premium</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Unlimited Streaming</td>
                    <td>
                      <FontAwesomeIcon
                        className={style.access}
                        icon={faCheck}
                      />
                    </td>
                    <td>
                      <FontAwesomeIcon
                        className={style.access}
                        icon={faCheck}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Unlimited Download</td>
                    <td>
                      <FontAwesomeIcon
                        className={style.noAccess}
                        icon={faXmark}
                      />
                    </td>
                    <td>
                      <FontAwesomeIcon
                        className={style.access}
                        icon={faCheck}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>No Ads</td>
                    <td>
                      <FontAwesomeIcon
                        className={style.noAccess}
                        icon={faXmark}
                      />
                    </td>
                    <td>
                      <FontAwesomeIcon
                        className={style.access}
                        icon={faCheck}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className={style.plan}>
              <div
                className={
                  selectedPlan === 1
                    ? style.selected + " " + style.planCard
                    : style.planCard
                }
                onClick={() => setSelectedPlan(1)}
              >
                <p className={style.period}>Yearly</p>
                <p className={style.price}>
                  <span className={style.originalPrice}>₹999</span>
                  <span className={style.payablePrice}>₹399</span>
                </p>
                <p className={style.discount}>Save 60%</p>
              </div>
              <div
                className={
                  selectedPlan === 2
                    ? style.selected + " " + style.planCard
                    : style.planCard
                }
                onClick={() => setSelectedPlan(2)}
              >
                <p className={style.period}>Yearly</p>
                <p className={style.price}>
                  <span className={style.originalPrice}>₹999</span>
                  <span className={style.payablePrice}>₹399</span>
                </p>
                <p className={style.discount}>Save 60%</p>
              </div>
              <div
                className={
                  selectedPlan === 3
                    ? style.selected + " " + style.planCard
                    : style.planCard
                }
                onClick={() => setSelectedPlan(3)}
              >
                <p className={style.period}>Yearly</p>
                <p className={style.price}>
                  <span className={style.originalPrice}>₹999</span>
                  <span className={style.payablePrice}>₹399</span>
                </p>
                <p className={style.discount}>Save 60%</p>
              </div>
            </div>
            <div className={style.validityWrapper}>
              Current plan valid till 06 Dec 2023
            </div>
          </div>
          <p>Other Plan</p>
          <div className={style.goPremium}>
            <div>
              <p>Go Premium</p>
              <small>
                Unlimited Streaming • Unlimited Downloads • Ad-free Music
              </small>
            </div>
            <div className={style.offerPrice}>
              <p>Yearly</p>
              <div className={style.price}>
                <span className={style.originalPrice}>₹999</span>
                <span className={style.offerPrice}>₹399</span>
              </div>
            </div>
          </div>
          <div className={style.termCond}>
            <ul>
              <li>All amounts are inclusive of 18% GST</li>
              <li>
                By clicking on Continue button, you agree to Wynk's{" "}
                <a href="/">Terms of service</a> and{" "}
                <a href="/">Privacy policy</a>.
              </li>
            </ul>
          </div>
        </div>
        {/* <div className={style.premium}></div>
        <div className={style.detail}></div> */}
      </div>
      <div className={style.bottom}>
        <div className={style.amount}>
          <p>Amount to be paid</p>
          <small>₹399</small>
        </div>
        <button>Continue</button>
      </div>
    </div>
  );
}
export default Subscription;
