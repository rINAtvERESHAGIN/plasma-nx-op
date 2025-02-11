import { useAppDispatch } from '@org/store-redux';
import { setOpenSettings, setOpenTimeLine } from '../../pages/main-page-split/model';
import SettingsIcon from '@mui/icons-material/Settings';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import BasketOfRegions from '../../features/basket-of-regions/ui';

const Icons = ({ openSettings, openTimeLine }) => {
  const dispatch = useAppDispatch();

  const handleDateIconClick = () => {
    dispatch(setOpenTimeLine(!openTimeLine));
    dispatch(setOpenSettings(false));
  };

  const handleSettingsIconClick = () => {
    dispatch(setOpenSettings(!openSettings));
    dispatch(setOpenTimeLine(true));
  };

  const handleToggleClick = () => {
    if (openSettings || openTimeLine) {
      dispatch(setOpenSettings(false));
      dispatch(setOpenTimeLine(false));
    } else {
      dispatch(setOpenSettings(true));
      dispatch(setOpenTimeLine(true));
    }
  };

  return [
    { icon: BasketOfRegions, name: 'Корзина регионов' },
    { icon: null, name: null },
    {
      icon: QueryBuilderIcon,
      name: 'Дата',
      action: handleDateIconClick
    },
    {
      icon: SettingsIcon,
      name: 'Настройки',
      action: handleSettingsIconClick
    },
    { icon: null, name: null },
    {
      icon: openSettings || openTimeLine ? ExpandMoreIcon : ExpandLessIcon,
      name: openSettings || openTimeLine ? 'Свернуть' : 'Открыть',
      action: handleToggleClick
    }
  ];
};

export default Icons;