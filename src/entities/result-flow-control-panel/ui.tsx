import React from 'react';
import { RotatedVerticalAlignCenterIcon, StyledPanel } from './ui.styled';
import { Button, Tooltip } from '@mui/material';
import VerticalAlignCenterIcon from '@mui/icons-material/VerticalAlignCenter';
import UndoIcon from '@mui/icons-material/Undo';
import SaveIcon from '@mui/icons-material/Save';
interface ControlPanelProps {
    handleVerticalLayout: () => void;
    handleHorizontalLayout: () => void;
    onSave: () => void;
    onRestore: () => void;
}

const ControlPanel: React.FunctionComponent<ControlPanelProps> = ({
    handleVerticalLayout,
    handleHorizontalLayout,
    onSave,
    onRestore
}) => {
    return (
        <StyledPanel position="top-right">
            <Tooltip title="Вертикальный вид">
                <Button onClick={handleVerticalLayout}>
                    <RotatedVerticalAlignCenterIcon />
                </Button>
            </Tooltip>
            <Tooltip title="Горизонтальный вид">
                <Button onClick={handleHorizontalLayout}>
                    <VerticalAlignCenterIcon />
                </Button>
            </Tooltip>
            <Tooltip title="Сохранить">
                <Button onClick={onSave}>
                    <SaveIcon />
                </Button>
            </Tooltip>
            <Tooltip title="Вернуть">
                <Button onClick={onRestore}>
                    <UndoIcon />
                </Button>
            </Tooltip>
        </StyledPanel>
    );
};

export default ControlPanel;
