// import DetailsCompo from "./DetailsCompo";
import style from './DetailsCompo.module.css'
function Details(){
    const songDetails=[
         {title:"LATEST SONGS",
         description:`Sarkaare  |  Keemti  |  Sab Rab  |  In Your Eyes Only  |  Aankhon Mein  |  Manmaani  |  JALSA 2.0  |  Oonchi Oonchi Deewarein (From "Yaariyan 2")  |  O Piya  |  Doriyaan  |  Khidkiyaan  |  Mann Jogiya (From "Pyaar Hai Toh Hai")  |  Jaanu Na  |  Legacy  |  Jeetenge`},
         {title:`REGIONAL PLAYLISTS`,
         description:`New Bengali Songs  |  New Bhojpuri Songs  |  New English Songs  |  New Haryanvi Songs  |  New Hindi Songs  |  New Kannada Songs  |  New Marathi Songs  |  New Punjabi Songs  |  New Tamil Songs  |  New Telugu Songs  |  New Odia Songs  |  New Rajasthani Songs  |  New Gujarati Songs  |  New Assamese Songs`},
         {title:`TRENDING SONGS`,
         description:`Chaleya (From "Jawan")  |  Heeriye (feat. Arijit Singh)  |  Zihaal e Miskin  |  Haanji (From "Thank You For Coming")  |  Gone Girl  |  Yaar Ka Sataya Hua Hai  |  Phir Aur Kya Chahiye (From "Zara Hatke Zara Bachke")  |  Apna Bana Le  |  Guli Mata  |  Kya Loge Tum  |  Tum Kya Mile (From "Rocky Aur Rani Kii Prem Kahaani")  |  Dil Jhoom  |  Hukum - Thalaivar Alappara (From "Jailer")  |  Kesariya (From "Brahmastra")  |  Jaana Hai Toh Jaa`},
         {title:`TOP ARTISTS`,
         description:`Guru Randhawa  |  Arijit Singh  |  Atif Aslam  |  Justin Bieber  |  Gulzar  |  Armaan Malik  |  Sidhu Moose Wala  |  Alan Walker  |  Udit Narayan  |  Sonu Nigam  |  Sid Sriram  |  Akhil  |  Darshan Raval  |  Shreya Ghoshal  |  Alka Yagnik`},
         {title:`LATEST ALBUMS`,
         description:`Scarlet  |  Yaariyan 2  |  Vikram Original Motion Picture Soundtrack  |  Shubh Vivah  |  Thallumaala  |  Pushpa - The Rise  |  Ninna Sanihake  |  Praktan  |  No Name  |  Bhavartha Mauli  |  Yuva Sarkar  |  Mal mahu jiban mati  |  GUTS`},
         {title:`EXPLORE MUSIC GENRES`,
         description:`Rock Songs  |  Patriotic songs  |  Sufi Music  |  Ghazals  |  Workout Music  |  Devotional Songs  |  Sad Songs  |  DJ Songs`},
         {title:`OLD SONGS`,
         description:`Old  Songs  |  Old Hindi Songs  |  Old English Songs  |  Old Punjabi Songs  |  Old Telugu Songs  |  Old Tamil Songs  |  Old Bengali Songs  |  Old Malayalam Songs  |  Old Kannada Songs`},
         {title:`SONGS WITH LYRICS`,
         description:`Coca Cola  |  Bom Diggy Diggy  |  Machayenge  |  Tera Yaar Hoon Main  |  Kar Gayi Chull (From "Kapoor & Sons (Since 1921)")  |  Morni Banke  |  Chalti Hai Kya 9 Se 12  |  Hawayein`},
         {title:`WYNK TOP HITS`,
         description:`Top 20 Bollywood Songs  |  Wynk Top 100 Songs  |  Top 20 English Songs  |  Trending Reels Songs`},
         {title:`DEVOTIONAL SONGS`,
         description:`Ganesh Ji Ki Aarti  |  Laxmi Ji Ki Aarti  |  Shri Hanuman Chalisa  |  Shiv Bhajan  |  Gurbani  |  Gurbani Shabad  |  Islamic Songs  |  Jesus Songs  |  Christian Songs`},
         {title:`JOIN WYNK FOR ARTISTS`,
         description:`Wynk Studio  |  Wynk Studio for Artists`}
    ]

    return(
        <>
        <div className={style.div1}>
        {songDetails.map((data,index)=>{
            return(
                <div className={style.s}  key={index}>
                    <h2 key={`${index}+2`}>{data.title}</h2>
                    <p key={`${index}+3`}>{data.description}</p>
                </div>)
            }
        )}
        </div>
        </>
    )
}
export default Details;