import style from "./DetailsCompo.module.css";
function DetailsCompo(props) {
  const { title, description } = props;
  return (
    <div className={style.main}>
      <div className={style.s}>
        <h4>{title}</h4>
        <p>{description}</p>
      </div>
    </div>
  );
}
export default DetailsCompo;
