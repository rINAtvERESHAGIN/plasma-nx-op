import styled from 'styled-components';

const ChartContainer = styled.div<{ height?: number }>`
    width: 100%;
    height: ${(props) => `${props.height}px` ?? '100%'};
    background-color: lightblue;
`;

export default ChartContainer;
export const PlotContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    margin-bottom: 30px;
`;
export const PlotWrapper = styled.div`
    width: 100%;
`;
export const PlotShadow = styled.div<{ onResizingHeight: number }>`
    background-color: rgba(0, 0, 0, 0.11);
    width: 100%;
    height: ${({ onResizingHeight }) => `${onResizingHeight}px`};
`;
