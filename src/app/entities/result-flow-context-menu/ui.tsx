import React from 'react';
import { Menu } from './ui.styled';

const ContextMenu: React.FunctionComponent = ({ id, top, left, right, bottom, ...props }) => {
    return (
        <Menu style={{ top, left, right, bottom }} {...props}>
            node: {id}
        </Menu>
    );
};
export default ContextMenu;
