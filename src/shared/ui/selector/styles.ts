import styled from '@emotion/styled';
import { Select, MenuItem } from '@mui/material';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
export const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 550
    }
  }
};

export const setMenuProps = (width: number | string) => ({
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width
    }
  }
});

export const StyledSelect = styled(Select)`
  height: 56px;
`;

export const StyledMenuItem = styled(MenuItem)`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 40px;
`;
