import styled from '@emotion/styled';
import { Backdrop } from '@mui/material';

export const RootContainer = styled.div`
    height: 100%;
    width: 100%;
    overflow: hidden;
`;

export const ContentContainer = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    overflow: auto;
`;

export const Container = styled.div`
    width: 100%;
    height: 100%;
    //padding-top: 64px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    grid-column-gap: 8px;
    grid-row-gap: 8px;
`;

export const InitAddBthComparison = styled.div`
    margin: auto;
`;

export const ScrollableContainer = styled.div`
    overflow: auto;
    max-height: 100%;
    width: 30%;
    padding-left: 16px;
    margin-bottom: 5%;
`;
export const CenteredElement = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    justify-self: center;
    flex-direction: column;
`;

export const CardHeader = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
`;

export const CustomBackdrop = styled(Backdrop)`
    position: absolute;
    left: 0;
    top: 0;
    width: 95%;
    height: 90%;
    display: flex;
    align-items: center;
    justify-content: center;
`;
export const PlotContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
`;
