import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
`;

const Card = styled.div`
  position: absolute;
  bottom: ${({ index }) => index * 70}px;
  right: 0;
  width: 320px;
  height: 60px;
  background-color: white;
  border: 1px solid gray;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s;
  cursor: pointer;

  &:hover {
    transform: translateY(-10px);
  }
`;

function NotificationStack ({ notifications }): React.ReactNode {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleCardExpansion = (index): void => {
    if (expandedIndex === index) {
      setExpandedIndex(null);
    } else {
      setExpandedIndex(index);
    }
  };

  return (
    <Container>
      {notifications.map((notification, index) => (
        <Card
          key={index}
          index={index}
          onClick={() => { toggleCardExpansion(index); }}
        >
          <h3>{notification.title}</h3>
          {expandedIndex === index && <p>{notification.message}</p>}
        </Card>
      ))}
    </Container>
  );
}

export default NotificationStack;
