
import React from 'react';
import '../styles/card.css';
import arrowIcon from '/arrow_right.svg';

const Card = ({ title, description, image, link }) => {
    return (
      <div className="card">
        <img src={image} alt={title} className="card__image" />
        <h2 className="card__title">{title}</h2>
        <p className="card__description">{description}</p>
        <a href={link} className="card-link" >
            Read More
            <img src={arrowIcon} alt="arrow" className="card-link__icon" />
        </a>
      </div>
    );
  };
  

export default Card;
