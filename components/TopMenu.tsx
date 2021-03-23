import {
  createStyles,
  makeStyles,
  Tooltip,
  Grid,
  Typography,
} from '@material-ui/core';
import React from 'react';
import Link from 'next/link';

const useStyles = makeStyles(() =>
  createStyles({
    menu: {
      height: '10vh',
      borderBottom: '4px #08B1A8 solid',
      width: '100%',
      margin: 0,
    },
    menuItems: {
      display: 'flex',
      flexBasis: '80%',
    },
    menuItem: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'white',
      margin: '0 6px',
      cursor: 'pointer',

      '& p': {
        color: '#303C47',
        fontSize: 21,
        fontWeight: 'bold',
      },
      '&:first-of-type': {
        margin: '0 6px 0 12px',
      },
    },
    logo: {
      flexBasis: '20%',
      display: 'flex',
      '& img': {
        width: '100%',
      },
    },
    currentMenuItem: {
      background: '#08B1A8',

      '& p': {
        color: 'white',
      },
    },
  }),
);

type MenuItem = {
  label: string,
  href: string,
};

interface TopMenuProps {
  menuItems: MenuItem[],
  current: number,
}

const TopMenu = ({
  menuItems,
  current,
}: TopMenuProps) => {
  const classes = useStyles();

  return (
    <Grid container spacing={3} className={classes.menu}>
      <div className={classes.menuItems}>
      {menuItems.map((menuItem, index) => (
        <Link as={menuItem.href} href={menuItem.href} key={index}>
          <Grid key={menuItem.label} item xs={2} className={`${classes.menuItem} ${current===index ? classes.currentMenuItem : ''}`}>
            <Typography>{menuItem.label}</Typography>
          </Grid>
        </Link>
      ))}
      </div>
      <div className={classes.logo}>
        <img src='/static/images/blutech_logo_new_white.svg' />
      </div>
    </Grid>
  )
};

export default TopMenu;