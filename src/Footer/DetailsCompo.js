import style from "./DetailsCompo.module.css";
function DetailsCompo(props) {
  const { title, description } = props;
  return (
    <div className={style.main}>
      <div className={style.s}>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
}
export default DetailsCompo;
