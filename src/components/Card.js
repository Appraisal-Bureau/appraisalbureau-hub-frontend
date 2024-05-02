import '../styles/Card.scss';
import ActionButton from './ActionButton';

const Card = ({imgSrc, imgAltText, bodyText, actionButtonText}) => {
  return (
    <div className="card">
      <img src={imgSrc} alt={imgAltText} />
      <p className="body">{bodyText}</p>
      <ActionButton text={actionButtonText}/>
    </div>
  );
}

export default Card;
