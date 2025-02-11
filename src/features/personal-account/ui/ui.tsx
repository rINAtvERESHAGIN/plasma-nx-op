import React, { useEffect } from 'react';
import { Avatar, ListItem, ListItemText, ListItemAvatar, Divider, Button } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import BadgeIcon from '@mui/icons-material/Badge';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@org/store-redux';
import { userInfo } from '../../../pages/personal-account/user-info.js';
import { logout } from '../../../pages/personal-account/logout.js';
import { StyledAvatar, StyledBox, StyledList, StyledTypography } from './ui.styled.js';

const PersonalAccount: React.FunctionComponent<any> = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfoData = useAppSelector((state) => state.userInfo);

  const handleLogout = async (): Promise<void> => {
    try {
      const response = await logout();
      if (response.ok) navigate('/login-page/main');
    } catch (error) {
      /* empty */
    }
  };

  useEffect(() => {
    dispatch(userInfo());
  }, []);

  return (
    <StyledBox>
      <StyledTypography variant="h5">Личный кабинет {userInfoData.username}</StyledTypography>
      <StyledList>
        <ListItem>
          <ListItemAvatar>
            <StyledAvatar src="" />
          </ListItemAvatar>
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <BadgeIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Фамилия" secondary={userInfoData.last_name} />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <BadgeIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Имя" secondary={userInfoData.first_name} />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <EmailIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Email" secondary={userInfoData.email} />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem>
          <Button variant="outlined" onClick={handleLogout}>
            Выход
          </Button>
        </ListItem>
      </StyledList>
    </StyledBox>
  );
};

export default PersonalAccount;
