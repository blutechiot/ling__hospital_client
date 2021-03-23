import {
  withStyles,
  createStyles,
  makeStyles,
  Drawer,
  List,
  ListItem,
  Typography,
  Divider,
  Menu,
  Badge,
} from '@material-ui/core';
import Link from 'next/link';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import React, { ReactNode } from 'react';
import SpeedGaugeIcon from '../public/static/icons/speed_gauge.svg';
import MapIcon from '../public/static/icons/map.svg';
// import RepairIcon from '../public/static/icons/repair.svg';
// import TranslateIcon from '../public/static/icons/translate.svg';
import NoticeIcon from '../public/static/icons/notification.svg';
import { getNotifications } from '../api/overview';
import { useInterval } from '../utils';
import { timeInterval, dangerColor } from '../constants';
import Router from 'next/router';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawerPaper: {
      background: '#303c47',
      borderRight: '4px #08B1A8 solid',
      justifyContent: 'space-between',
      width: '116px',
      boxSizing: 'content-box',
    },
    menuList: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    menuItemContainer: {
      marginRight: '-1px',
      margin: '12px 0',
    },
    currentMenuItemContainer: {
      marginRight: '-1px',
      margin: '12px 0',
      padding: '8px',
      background: '#08B1A8',
      borderRadius: '50% 0 0 50%',
    },
    currentMenuItem: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#178886',
      borderRadius: '50%',
      height: '100px',
      width: '100px',
      cursor: 'pointer',

      '& svg path': {
        fill: 'white',
      },
    },
    currentMenuText: {
      color: 'white',
      fontSize: '12px',
    },
    menuItem: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'white',
      borderRadius: '50%',
      height: '100px',
      width: '100px',
      cursor: 'pointer',

      '& svg path': {
        fill: '#303c47',
      },
    },
    menuText: {
      color: '#303c47',
      fontSize: '12px',
    },
    divider: {
      width: '50%',
      background: '#81898f',
      height: '2px',
    },
    translate: {
      cursor: 'pointer',
    },
    logout: {
      cursor: 'pointer',
    },
    content: {
      marginLeft: '120px',
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
    },
    noticeMenuPaper: {
      width: '30vw',
      minHeight: '50vh',
      transform: 'translate(-9.5px, -2px) !important',
      borderRadius: '50px',
      minWidth: '500px',
    },
    noticeMenuList: {
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
      minHeight: '50vh',
    },
    noticeTitle: {
      textAlign: 'center',
      fontSize: 24,
      fontWeight: 'bold',
      color: '#F3314B',
      padding: '20px 0',
    },
    noticeBodyContainer: {
      flexGrow: 1,
      display: 'flex',
    },
    noticeBody: {
      flexGrow: 1,
      margin: '0 12px',
      maxHeight: '70vh',
      overflow: 'scroll',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
      msOverflowStyle: 'none',
      scrollbarWidth: 'none',
    },
    noticeToiletName: {
      color: '#0B1A27',
      fontWeight: 'bold',
      fontSize: 18,
      padding: '12px 16px',
    },
    noticeTimeStamp: {
      color: (props: { [key: string]: any }) => props.dangerColor,
      paddingRight: 16,
      fontWeight: 'bold',
      whiteSpace: 'nowrap',
    },
    noticeIconContainer: {
      alignSelf: 'flex-end',
      margin: '0 0 2px 2px',
    },
    noticeIcon: {
      background: '#F3314B',
      color: 'white',
      '& svg path': {
        fill: 'white',
      },
    },
    notice: {
      border: '#0B1A27 1px solid',
      borderRadius: '6px',
      margin: '6px 0',
    },
  }),
);

const NoticeBadge = withStyles(() =>
  createStyles({
    badge: {
      background: 'white',
      color: '#F3314B',
      top: '15px',
      right: '15px',
      borderRadius: '15px',
      width: '30px',
      height: '30px',
    },
  }),
)(Badge);

interface LayoutProps {
  current: string;
  children: ReactNode;
}

interface Notice {
  group: string;
  messages: {
    text: string;
    timestamp: number;
  }[];
};

const Layout = ({
  current,
  children
}: LayoutProps) => {
  const classes = useStyles({ dangerColor });

  const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = React.useState<boolean>(false);
  const [notices, setNotices] = React.useState<Notice[]>([]);
  const alertAudio = new Audio();
  alertAudio.src = '/static/sounds/alert.ogg';

  const playSound = (audioFile: HTMLAudioElement) => {
    audioFile.play();
  };

  let ignore = false;

  const fetchData = async () => {
    try {
      const notifications = await getNotifications();
      if (notices.length !== 0) {
        notifications.some(deviceNotices => {
          deviceNotices.alert && playSound(alertAudio);
          return deviceNotices.alert;
        })
      }

      const newNotice = [];
      notifications.forEach((deviceNotices) => {
        const messages = [];
        let toiletName;
        if (deviceNotices.device_id === '1') toiletName = 'LG/F男廁';
        deviceNotices.sensor_toilet_paper.forEach(sensor => {
          let index;
          if (deviceNotices.device_id === '1') {
            index = Number(sensor.sensor_id) - 24;
          }
          //  else if (deviceNotices.device_id === '2') {
          //   index = 28 - Number(sensor.sensor_id);
          // } else if (deviceNotices.device_id === '3') {
          //   index = Number(sensor.sensor_id) - 24;
          // } else if (deviceNotices.device_id === '4') {
          //   index = Number(sensor.sensor_id) - 20;
          // }
          // messages.push(`${toiletName} 的 第${index}格的廁紙 需要替換`);
          messages.push({
            text: `${toiletName} 的 第${index}格的廁紙 需要替換`,
            timestamp: sensor.timestamp,
          })
        })
        deviceNotices.sensor_sanitizer.forEach(sensor => {
          let index;
          if (deviceNotices.device_id === '1') {
            if (sensor.sensor_id === '9'){
              index = 2;
            } else {
              index = sensor.sensor_id;
            }
          } 
          // else if (deviceNotices.device_id === '2') {
          //   index = 4 - Number(sensor.sensor_id);
          // } else if (deviceNotices.device_id === '3') {
          //   index = sensor.sensor_id;
          // } else if (deviceNotices.device_id === '4') {
          //   index = Number(sensor.sensor_id) - 12;
          // }
          messages.push({
            text: `${toiletName} 的 第${index}格的廁板消毒液 需要添加`,
            timestamp: sensor.timestamp,
          });
        })
        deviceNotices.sensor_tissue.forEach(sensor => {
          let index;
          if (deviceNotices.device_id === '1') {
            if (Number(sensor.sensor_id) < 37){
              index = Number(sensor.sensor_id) - 34;
            } else {
              index = Number(sensor.sensor_id) - 35;
            }
          } 
          // else if (deviceNotices.device_id === '2') {
          //   index = Number(sensor.sensor_id) - 35;
          // } else if (deviceNotices.device_id === '3') {
          //   index = Number(sensor.sensor_id) - 34;
          // } else if (deviceNotices.device_id === '4') {
          //   index = Number(sensor.sensor_id) - 27;
          // }
          messages.push({
            text: `${toiletName} 的 第${index}個抹手紙 需要添加`,
            timestamp: sensor.timestamp,
          });
        })
        deviceNotices.sensor_soap.forEach(sensor => {
          let index;
          if (deviceNotices.device_id === '1') {
            index = Number(sensor.sensor_id) - 10;
            if (sensor.sensor_id === '9') {
              index = 2;
            }
          } 
          // else if (deviceNotices.device_id === '2') {
          //   index = 13 - Number(sensor.sensor_id);
          // } else if (deviceNotices.device_id === '3') {
          //   index = Number(sensor.sensor_id) - 10;
          // } else if (deviceNotices.device_id === '4') {
          //   index = 20 - Number(sensor.sensor_id);
          // }
          messages.push({
            text: `${toiletName} 的 第${index}個洗手液 需要添加`,
            timestamp: sensor.timestamp,
          });
        })
          const type = deviceNotices.sensor_iaq;
          if (type.H2S) messages.push({
            text: `${toiletName} 的 H2S 濃度過高`,
            timestamp: type.H2S,
          });
          if (type.NH3) messages.push({
            text: `${toiletName} 的 NH3 濃度過高`,
            timestamp: type.NH3,
          });
          if (type.pm2d5) messages.push({
            text: `${toiletName} 的 PM2.5 濃度過高`,
            timestamp: type.pm2d5,
          });
          if (type.temperature) messages.push({
            text: `${toiletName} 的 溫度不適宜`,
            timestamp: type.temperature,
          });
          if (type.humidity) messages.push({
            text: `${toiletName} 的 濕度不適宜`,
            timestamp: type.humidity,
          });
        messages.sort((a, b) => b.timestamp - a.timestamp);
        newNotice.push({
          group: toiletName,
          messages,
        })
      })
      if (!ignore) {
        setNotices(newNotice);
      }
    } catch (err) {
      console.log(err)
    }
  };

  useInterval(fetchData, timeInterval, true, () => { ignore = true });

  const handleLogoutClick = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('token_exp');
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('refresh_token');
    sessionStorage.removeItem('token_exp');
    Router.push('/login');
  };

  const renderNoticeItem = () => (
    notices.length > 0 ? (
      <NoticeBadge badgeContent={getNoticeCount()} color="primary">
        <ListItem className={`${classes.menuItem} ${classes.noticeIcon}`}>
          <NoticeIcon />
          <Typography className={classes.currentMenuText}>通知</Typography>
        </ListItem>
      </NoticeBadge>
    ) : (
      <ListItem className={classes.menuItem}>
        <NoticeIcon />
        <Typography className={classes.menuText}>通知</Typography>
      </ListItem>
    )
  );

  const sideMenu = () => (
    <Drawer
      variant='permanent'
      classes={{
        paper: classes.drawerPaper
      }}
    >
      <List className={classes.menuList}>
        <div className={current==='overview' ? classes.currentMenuItemContainer : classes.menuItemContainer}>
          <Link as='/dashboard' href='/dashboard'>
            <ListItem className={current==='overview' ? classes.currentMenuItem : classes.menuItem}>
                <SpeedGaugeIcon />
              <Typography className={current==='overview' ? classes.currentMenuText :classes.menuText}>總覽</Typography>
            </ListItem>
          </Link>
        </div>
        <Divider className={classes.divider}/>
        <div className={current==='floorPlan' ? classes.currentMenuItemContainer : classes.menuItemContainer}>
          <Link as='/floorPlan' href='/floorPlan'>
          <ListItem className={current==='floorPlan' ? classes.currentMenuItem : classes.menuItem}>
              <MapIcon />
            <Typography className={current==='floorPlan' ? classes.currentMenuText : classes.menuText}>平面圖</Typography>
          </ListItem>
          </Link>
        </div>
        {/* <div className={current==='tasks' ? classes.currentMenuItemContainer : classes.menuItemContainer}>
          <Link as='/tasks' href='/tasks'>
            <ListItem className={current==='tasks' ? classes.currentMenuItem : classes.menuItem}>
                <RepairIcon />
              <Typography className={current==='tasks' ? classes.currentMenuText : classes.menuText}>任務列表</Typography>
            </ListItem>
          </Link>
        </div> */}
      </List>

      <List className={classes.menuList}>
        {/* <div className={classes.menuItemContainer}>
          <ListItem className={classes.translate}>
            <TranslateIcon />
          </ListItem>
        </div> */}
        <div className={classes.menuItemContainer}>
          <ListItem
            className={classes.logout}
            onClick={handleLogoutClick}
          >
            <Typography>登出</Typography>
          </ListItem>
        </div>
        <Divider className={classes.divider}/>
        <div
          className={classes.menuItemContainer}
          onClick={notices.length > 0 ? handleNoticeClick : null}
        >
          {renderNoticeItem()}
        </div>
      </List>
    </Drawer>
  );

  const handleNoticeClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
    setMenuOpen(true);
  };

  const handleNoticeClose = () => {
    setMenuOpen(false);
  };

  const formatTime = (timestamp: number): string => {
    const startOfDay = new Date();
    startOfDay.setHours(0,0,0,0);
    const ms = startOfDay.getTime();
    if (timestamp < ms){
      return `${Math.ceil((ms - timestamp)/86400000)}天前`;
    } else {
      const time = new Date(timestamp);
      return `${String(time.getHours()).padStart(2, '0')}:${String(time.getMinutes()).padStart(2, '0')}`;
    }
  };

  const getNoticeCount = () => {
    let count = 0;
    notices.forEach((noticeGroup) => {
      count = count + noticeGroup.messages.length;
    });
    if (count === 0) {
      return undefined;
    } else {
      return count;
    }
  };

  const renderNoticeMenu = () => (
    <Menu
      keepMounted
      open={menuOpen}
      onClose={handleNoticeClose}
      autoFocus={false}
      anchorEl={anchorEl}
      classes={{
        paper: `${classes.noticeMenuPaper}`,
        list: `${classes.noticeMenuList}`,
      }}
    >
      <div className={classes.noticeTitle}>通知</div>
      <div className={classes.noticeBodyContainer}>
        <div className={classes.noticeIconContainer} onClick={handleNoticeClick}>
          <NoticeBadge badgeContent={getNoticeCount()} color="primary">
          <ListItem className={`${classes.menuItem} ${classes.noticeIcon}`}>
            <NoticeIcon />
            <Typography className={classes.currentMenuText}>通知</Typography>
          </ListItem>
          </NoticeBadge>
        </div>
        <List className={classes.noticeBody}>
          {notices.map((noticeGroup, index) =>
            <React.Fragment key={index}>
              {noticeGroup.messages.length > 0 && <Typography className={classes.noticeToiletName}>{noticeGroup.group}</Typography>}
              {noticeGroup.messages.map((notice, index) =>
                <ListItem key={index} className={classes.notice}>
                  <Typography className={classes.noticeTimeStamp}>{formatTime(notice.timestamp*1000)}</Typography>
                  {notice.text}
                </ListItem>
              )}
            </React.Fragment>
          )}
        </List>
      </div>
    </Menu>
  );

  return (
    <React.Fragment>
      {sideMenu()}
      {renderNoticeMenu()}
      <div className={classes.content}>
        {children}
      </div>
    </React.Fragment>
  );
};

export default Layout;