import React, { useState } from 'react';
import styled from 'styled-components';
import { CardContent, Card as MuiCard } from '@mui/material';

const CardStackContainer = styled.div`
    position: relative;
    width: 300px;
    height: 400px;
`;

const Card = styled(MuiCard)<{ index: number, scope: number }>`
    position: absolute;
    width: 50%;
    height: 50%;
    background-color: white;
    border: 1px solid gray;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
    transition: transform 0.3s;

    top: ${({ index }) => index * 10}px;
    left: ${({ index }) => index * 10}px;

    z-index: ${({ index, scope }) => scope - index};
    transition: transform 0.3s ease-in-out;
    cursor: pointer;
    &:hover {
        transform: translateY(-10px);
        /* transform: scale(1.05); */
    }
`;

function StackOfCards (): React.ReactNode {
  const cardData = [
    { id: 1, title: 'Card 1', content: 'This is the content of Card 1' },
    { id: 2, title: 'Card 2', content: 'This is the content of Card 2' },
    { id: 3, title: 'Card 3', content: 'This is the content of Card 3' }
  ];

  const toggleAccordion = (): void => {
    setIsOpen(!isOpen);
  };

  const [isOpen, setIsOpen] = useState(false);

  const handleCardClick = (): void => {
    setIsOpen(true);
  };

  return (
    <CardStackContainer>
      {cardData &&
                cardData.length > 0 &&
                cardData.map((card, index, arr) => (
                  <Card
                    scope={arr.length}
                    key={card.id}
                    index={index}
                    onClick={index === 0 && arr.length > 1 ? handleCardClick : undefined}
                  >
                    <CardContent>
                      <h3>{card.title}</h3>
                      <p>{card.content}</p>
                    </CardContent>
                  </Card>
                ))}
    </CardStackContainer>
  );
}

export default StackOfCards;
