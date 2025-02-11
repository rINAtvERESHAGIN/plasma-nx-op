import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@org/store-redux';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Button } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import { clearRegionBasket, removeRegionId } from '@features/mapbox/ui/model';
import Divider from '@mui/material/Divider';
import {
  ButtonBox,
  DrawerTitle,
  RegionCounter,
  StyledButton,
  StyledDrawer,
  StyledDrawerBox
} from '@features/basket-of-regions/ui.styled';

type Anchor = 'right';

const BasketOfRegions: React.FunctionComponent<any> = (props) => {
  const dispatch = useAppDispatch();
  const [state, setState] = React.useState({
    right: false
  });
  const regions = useAppSelector((state) => state.regionBasket.data);

  const [selectedRegions, setSelectedRegions] = useState<Record<string, boolean>>(
    regions.reduce((acc, region) => ({ ...acc, [region.iso_code]: false }), {})
  );

  const toggleDrawer = (anchor: Anchor, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const handleCheckboxChange = (isoCode: string): void => {
    setSelectedRegions({
      ...selectedRegions,
      [isoCode]: !selectedRegions[isoCode]
    });
  };

  const handleDeleteSelectedRegion = (): void => {
    const selectedIsoCodes = Object.keys(selectedRegions).filter((isoCode: string) => selectedRegions[isoCode]);

    selectedIsoCodes.forEach((isoCode): void => {
      dispatch(removeRegionId(isoCode));
    });

    setSelectedRegions({
      ...selectedRegions,
      [selectedIsoCodes]: false
    });

    if (regions.length - selectedIsoCodes.length === 0) {
      setState({ ...state, right: false });
    }
  };

  const handleClearAllRegion = (): void => {
    dispatch(clearRegionBasket());
    setSelectedRegions({});
    setState({ ...state, right: false });
  };

  return (
    <div>
      <StyledButton onClick={toggleDrawer('right', true)} disabled={regions.length === 0}>
        <RegionCounter variant="h5">{regions.length}</RegionCounter>
      </StyledButton>

      <StyledDrawer anchor="right" open={state.right} onClose={toggleDrawer('right', false)}>
        <StyledDrawerBox role="presentation" onKeyDown={toggleDrawer('right', false)}>
          <DrawerTitle variant="h6">Регионы добавленные в сравнение</DrawerTitle>
          <Divider />
          <List>
            {regions.map((region) => (
              <ListItem key={region} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={selectedRegions[region]}
                      onChange={() => {
                        handleCheckboxChange(region);
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText primary={region} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <ButtonBox>
            <Button onClick={handleDeleteSelectedRegion} variant="contained">
              Удалить
            </Button>
            <Button onClick={handleClearAllRegion} variant="outlined">
              Удалить все
            </Button>
          </ButtonBox>
        </StyledDrawerBox>
      </StyledDrawer>
    </div>
  );
};

export default BasketOfRegions;
