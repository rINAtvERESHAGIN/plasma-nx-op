import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';

export const RootMapContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

export const Navbar = styled.div`
  width: 100%;
  height: 50px;
  background-color: rgba(45, 45, 45, 0.4);
  color: white;
  display: flex;
  align-items: center;
  padding: 0 20px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(10px);
  overflow: hidden;
`;

export const NavbarTitle = styled(Typography)`
  font-size: 30px;
`;

export const MapContainer = styled.div`
  height: 100%;
  width: 100%;
  position: fixed;
  left: 0;
  z-index: 1;
`;

export const GradientOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom right, rgb(0, 0, 0, 1), rgba(255, 255, 255, 0));
  pointer-events: none;
`;

export const ContentContainer = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  padding: 0 50px;
`;

export const ContentCard = styled.div`
  padding: 15px;
  border-radius: 0 0 15px 15px;
  border-top: 2px solid white;
  max-width: 550px;
  font-size: 30px;
  color: white;
  background-color: rgba(45, 45, 45, 0.4);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
`;

export const ReviewContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); // Две колонки
  grid-template-rows: auto auto; // Две строки
  gap: 50px;
  padding: 15px;
  width: 60%;
`;

export const ReviewChartsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const LinkContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px;
  top: 12%;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const LinkContainerEnd = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const LeftLink = styled.div`
  // border-right: 1px solid white;
  // border-top: 1px solid white;
  padding: 8px 8px 0 0;
  // background-color: rgba(255, 255, 255, 0);
`;

export const CenterLink = styled.div`
  border-radius: 0;
  // border-top: 1px solid white;
  padding: 8px 0 0 0;
  margin: 0 60px 0 60px;
  // background-color: rgba(255, 255, 255, 0);
`;

export const RightLink = styled.div`
  // border-left: 1px solid white;
  // border-top: 1px solid white;
  padding: 8px 0 0 8px;
  // background-color: rgba(255, 255, 255, 0);
`;

export const LinkCard = styled.div`
  padding: 20px;
  border-radius: 15px;
  text-align: center;
  background-color: rgba(45, 45, 45, 0.4);
  color: white;
  backdrop-filter: blur(10px);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  width: 240px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.5);
  }
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;
