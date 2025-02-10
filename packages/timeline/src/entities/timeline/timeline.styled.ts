import styled from '@emotion/styled';

export const TimelineWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
`;
// Modify the TimelineContainer to be the scrolling inner container
export const TimelineContainer = styled.div`
    overflow-x: auto;
    white-space: nowrap;
    position: relative;
    height: 100%;
    background: rgba(245, 245, 245, 0.05);
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    user-select: none;
    cursor: grab;
`;
export const SeasonBlock = styled.div`
    position: absolute;
    top: 0;
    height: 100%;
    opacity: 0.4;
    background: ${({ color }) => color};
    border-radius: 4px;
    backdrop-filter: blur(10px);
    z-index: 0; // Set to 0 to ensure it's behind the markers and labels
`;
export const TimelineItem = styled.div`
    position: absolute;
    top: 50%;
    cursor: pointer;
    transform: translateY(-50%);
    &:hover .tooltip {
        display: block;
    }
    &:active {
        cursor: grabbing;
    }
    z-index: 2; // Ensure that it's above the SeasonBlock
`;
export const TimelineLine = styled.div`
    position: absolute;
    top: 50%;
    height: 4px;
    background-color: #90caf9;
    transform: translateY(-50%);
    border-radius: 2px;
`;
export const TimeMarker = styled.div`
    position: absolute;
    top: 0;
    width: 2px; // Make it a bit thicker for better visibility
    height: 100%;
    background-color: #e0e0e0; // A softer color
    transform: translateY(0%);
    z-index: 1;
    background: repeating-linear-gradient(
        to bottom,
        #e0e0e0,
        #e0e0e0 10px,
        transparent 10px,
        transparent 20px
    ); // Dashed effect
`;
export const Tooltip = styled.div`
    display: none;
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 12px;
    padding: 6px 10px;
    background-color: rgba(255, 255, 255, 0.9);
    border: 1px solid #cfd8dc;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
    color: #333;
    font-size: 0.875rem;
    z-index: 10;
    transition:
        opacity 0.1s ease-in-out,
        visibility 0.3s ease-in-out;
    opacity: 0.7; // Start with 0 opacity for transition
    &:before {
        // Tooltip arrow
        content: '';
        position: absolute;
        bottom: 100%;
        left: 50%;
        border-width: 5px;
        border-style: solid;
        border-color: transparent transparent rgba(255, 255, 255, 0.9) transparent;
        transform: translateX(-50%);
    }

    &:hover {
        visibility: visible; // Show tooltip on hover
        opacity: 1; // Fade in tooltip
    }
`;
export const TimeLabel = styled.div`
    position: absolute;
    top: 90%;
    left: 50%;
    transform: translateX(-50%) translateY(-100%);
    white-space: nowrap;
    color: #333;
    font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
    font-size: 0.75rem;
    background-color: rgba(255, 255, 255, 0.8);
    padding: 2px 6px;
    border-radius: 4px;
    margin-top: 4px; // Spacing from the timeline line
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    z-index: 2;
    pointer-events: none; // Ensures click-through to the timeline
`;
export const TimelineMarker = styled.div<{ isSelected: boolean }>`
    width: ${({ isSelected }) => (isSelected ? '32px' : '12px')};
    height: ${({ isSelected }) => (isSelected ? '32px' : '12px')};
    border-radius: 50%;
    background-color: #3949ab;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    border: ${({ isSelected }) => (isSelected ? '8px' : '2px')} solid #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease-in-out;
`;
// Styled components for controls
