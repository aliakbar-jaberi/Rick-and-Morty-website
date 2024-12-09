function NotFined({ text, image, className }) {
  return (
    <div className={className}>
      <div className="notfind">
        <div className="notfind__img">
          <img src={image} alt="" />
        </div>
        <h3>{text}</h3>
      </div>
    </div>
  );
}

export default NotFined;
