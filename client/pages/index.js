import { useState } from 'react';
import Head from 'next/head';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import Calendar from '../components/sections/Calendar';
import { changeCurrentUser } from '../redux/slices/calendarSlice';

const StyledBox = styled(Box)({
  marginBottom: '2rem',
  minWidth: '100%',
});

const StyledMenu = styled(Menu)({
  padding: '1rem',
});

export default function Home() {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuItem, setMenuItem] = useState('User 1');

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Head>
        <title>Calendar App</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="shortcut icon" href="https://i.imgur.com/gDGrd2Y.png" />
      </Head>
      <StyledBox display="flex" justifyContent="flex-end">
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
          color="primary"
          variant="contained"
          endIcon={<ArrowDropDownIcon />}
        >
          {menuItem}
        </Button>
        <StyledMenu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem
            onClick={() => {
              dispatch(changeCurrentUser('User 1'));
              setMenuItem('User 1');
              handleClose();
            }}
          >
            User 1
          </MenuItem>
          <MenuItem
            onClick={() => {
              dispatch(changeCurrentUser('User 2'));
              setMenuItem('User 2');
              handleClose();
            }}
          >
            User 2
          </MenuItem>
          <MenuItem
            onClick={() => {
              dispatch(changeCurrentUser('User 3'));
              setMenuItem('User 3');
              handleClose();
            }}
          >
            User 3
          </MenuItem>
        </StyledMenu>
      </StyledBox>
      <Calendar />
    </>
  );
}
