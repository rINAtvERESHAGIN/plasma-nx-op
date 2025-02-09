import styled from '@emotion/styled';
import IconButton from '@mui/material/IconButton';

export const MainContainer = styled.div`
    position: relative;
    overflow: hidden;
    height: calc(100vh - 58px);  
    display: flex;
    flex-direction: row;
`;

export const PanelHeaderContainer = styled.div`
    position: sticky;
    top: 0;
    left: 0;
    z-index: 1000;
    background-color: #ffffff;
`;
export const PlotlyContainer = styled.div`
    overflow: hidden;
    margin-bottom: 15px;
`;

export const SettingsContainer = styled.div`
    position: fixed;
    display: flex;
    flex-direction: column;
    bottom: 110px;
    left: 25%;
    padding: 10px;
    z-index: 1000;
    width: 50%;
    height: 250px;
    background-color: rgba(253, 253, 253, 0.8);
    border-radius: 20px;
    box-shadow:
        0 0 10px rgba(0, 0, 0, 0.1),
        0 4px 8px rgba(0, 0, 0, 0.2);
`;

export const TimeLineBox = styled.div`
    display: flex;
    z-index: 1000;
    width: 100%;
    height: 170px;
    padding-bottom: 5px;
`;
export const CloseButton = styled(IconButton)` // TODO добавить типы для theme
    position: absolute;
    top: 4px;
    right: 4px;
    background-color: transparent;
    border: none;
    color: ${({ theme }) => theme.palette.grey[500]}; 
    font-size: 16px;
    cursor: pointer;
    z-index: 10000;
`;
