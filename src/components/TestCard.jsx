import React from 'react';

export const TestCard = ({ card }) => {
  return (
    <div className="card">
      <div dangerouslySetInnerHTML={{ __html: card.icon }} />

      <h3>{card.title}</h3>

      <p>{card.description}</p>
    </div>
  );
};
