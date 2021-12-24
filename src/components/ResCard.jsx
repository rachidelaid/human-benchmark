const ResCard = ({ res }) => {
  return (
    <div className="resCard">
      <div dangerouslySetInnerHTML={{ __html: res.icon }} />
      <h3>{res.title} :</h3>
      <p>{localStorage.getItem(res.link) || '-no score-'}</p>
    </div>
  );
};

export default ResCard;
