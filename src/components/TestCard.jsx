import React from 'react';
import { Link } from 'react-router-dom';

export const TestCard = ({ card }) => {
  return (
    <Link to={card.link} className="card">
      <div dangerouslySetInnerHTML={{ __html: card.icon }} />

      <h3>{card.title}</h3>

      <p>{card.description}</p>
    </Link>
  );
};
