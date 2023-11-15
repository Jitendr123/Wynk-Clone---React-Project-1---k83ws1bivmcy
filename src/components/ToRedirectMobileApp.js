import style from '../components/TORedirectMobileApp.module.css'
const appIcon =require('../resources/appImg.png')
const playStoreBtn=require('../resources/play-store.icon.png')
const appleStoreBtn=require('../resources/apple-store.btn.png')
function ToRedirectMobileApp(){
    return(
        <div className={style.main}>
            <div className={style.leftDiv}>
                <div id={style.appIcon}><img src={appIcon} alt='none'/>
                </div>
                <div id={style.description}>
                    <h2>Best way to Listen to Music!</h2>
                    <p>Don’t forget to install Wynk Music on your mobile phones</p>
                </div>
                </div>
                <div className={style.rightDiv}>
                    <div id={style.appIcon}><img src={playStoreBtn} alt='none'/></div>
                    <div id={style.appIcon}><img src={appleStoreBtn} alt='none'/></div>
                </div>
        </div>
    )
}
export default ToRedirectMobileApp;