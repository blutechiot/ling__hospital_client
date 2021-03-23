import React from 'react';
import { Layout } from '../';
import {
  createStyles,
  makeStyles,
  withStyles,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Badge,
  Tooltip,
  CircularProgress,
} from '@material-ui/core';
import Router from 'next/router';
import { TopMenu } from '../../components';
import {
  overviewMenuItems,
  toiletTableHeads,
  normalColor,
  warningColor,
  dangerColor,
  timeInterval,
} from '../../constants';
import LocationIcon from '../../public/static/icons/location.svg';
import { useInterval } from '../../utils';
import { getToiletsOverview } from '../../api/overview';
import { ToiletOverviewData, ToiletsOverviewData, SensorStatus, Status } from '../../types';

const useStyles = makeStyles(() =>
  createStyles({
    table: {
      borderCollapse: 'separate',
      borderSpacing: '0 10px',
      marginTop: -10,
      marginLeft: 3,
      marginRight: 3,
      width: 'calc(100% - 6px)',
    },
    tableHeadCell: {
      padding: 0,
      borderBottom: '3px #08B1A8 solid',
    },
    
    tableHeadText: {
      background: '#08B1A8',
      margin: '13px 6.5px 0',
      borderRadius: '5px 5px 0 0',
      padding: '15px 0',
      fontSize: 17,
      fontWeight: 'bold',
      minWidth: 64,
    },
    tableHeadText2: {
      background: '#181A1B',
      margin: '13px 6.5px 0',
      borderRadius: '5px 5px 0 0',
      padding: '15px 0',
      fontSize: 17,
      fontWeight: 'bold',
      minWidth: 64,
    },
    tableBodyCell: {
      background: 'white',
      borderBottom: 'none',
      color: '#0B1A27',
      fontSize: '17px',
      fontWeight: 'bold',
      '&:first-child': {
        borderRadius: '100px 0 0 100px',
      },
      '&:last-child': {
        borderRadius: '0 100px 100px 0',
      },
    },
    floorText: {
      fontFamily: "'Noto Sans TC', 'Roboto', 'sans-serif'",
      letterSpacing: '0.072em',
      fontSize: 23,
      color: '#EBEBEB',
      lineHeight: '29px',
      padding: '4px 0',
      marginTop: 20,
      '&:first-of-type': {
        marginTop: 0,
      },
    },
    mapContainer: {
      cursor: 'pointer',
    },
    loadingContainer: {
      flexGrow: 1,
      display: 'flex',
    },
    loading: {
      margin: 'auto',
    },
  }),
);

const WarningBadge = withStyles(() =>
  createStyles({
    badge: {
      background: '#FBB71F',
      color: 'white',
    },
  }),
)(Badge);

const DangerBadge = withStyles(() =>
  createStyles({
    badge: {
      background: '#F3314B',
      color: 'white',
    },
  }),
)(Badge);

const ToiletPanel = () => {
  const classes = useStyles();

  const [data, setData] = React.useState<ToiletsOverviewData>();
  const [initialLoadStatus, setInitialLoadStatus] = React.useState<Status>(Status.blank);

  let ignore = false;

  const fetchData = async () => {
    try {
      const toiletsOverviewData = await getToiletsOverview();
      if (!ignore) {
        setData(toiletsOverviewData);
        setInitialLoadStatus(Status.success);
      }
    } catch {
      if (!ignore) {
        setInitialLoadStatus(Status.failure);
      }
    }
  };

  useInterval(fetchData, timeInterval, true, () => { ignore = true });

  React.useEffect(() => {
    setInitialLoadStatus(Status.inProgress);
  }, []);

  const handleMapClick = (deviceId) => ()=> {
    let floor = 'l_male_01';
    // if (deviceId === "2") floor = 'b1_female_03';
    // if (deviceId === "3") floor = 'b1_accessible_02';
    // if (deviceId === "4") floor = 'g_male_01';
    Router.push(`/floorPlan?floor=${floor}`);
  };

  const renderProgressBar = (count, total, status) => {
    let color = normalColor;
    if (status === SensorStatus.normal) {
      color = normalColor;
    } else if (status === SensorStatus.warning) {
      color = warningColor;
    } else {
      color = dangerColor;
    }
    let precent = 0;
    if (total !== 0) precent = count/total*100;
    return (
      <Tooltip title={`${count}/${total}`} arrow>
        <svg xmlns="http://www.w3.org/2000/svg" width="79.343" height="11.176" viewBox="0 0 79.343 11.176">
          <path style={{fill: '#172632', opacity: 0.2}} d="M7.455,0H71.888C76,0,79.343,2.5,79.343,5.591S76,11.183,71.888,11.183H7.455C3.338,11.183,0,8.679,0,5.591S3.338,0,7.455,0Z"/>
          <rect style={{fill: color}} width={`${precent}%`} height="11.176" rx="5.588"/>
        </svg>
      </Tooltip>
    );
  };

  const renderBadge = (count, status) => {
    if (status === SensorStatus.normal) {
      return <Badge badgeContent={''} color="primary"/>;
    } else if (status === SensorStatus.warning) {
      return <WarningBadge badgeContent={''}/>;
    } else if (status === SensorStatus.danger) {
      return <DangerBadge badgeContent={count} />
    }
  };

  const renderTableRow = (toiletOverview: ToiletOverviewData) => {
    let toiletName = 'LG/F 男廁';
    // if (toiletOverview.device_id === '2') toiletName = '急症走廊女廁';
    // if (toiletOverview.device_id === '3') toiletName = '暢通易達洗手間';
    // if (toiletOverview.device_id === '4') toiletName = '藥房男廁';
    return (
    <TableRow>
      <TableCell className={classes.tableBodyCell} align='center'>{toiletName}</TableCell>
      {/* {toiletOverview.people_count.count} */}
      <TableCell className={classes.tableBodyCell} align='center'> 0 </TableCell>  
      <TableCell className={classes.tableBodyCell} align='center'>
        {toiletOverview.usage
        ? renderProgressBar(toiletOverview.usage.in_use, toiletOverview.usage.total, toiletOverview.usage.status)
        : renderProgressBar(0, 0, 0)}
      </TableCell>
      <TableCell className={classes.tableBodyCell} align='center'>
        {toiletOverview.toilet_paper ? renderBadge(toiletOverview.toilet_paper.count, toiletOverview.toilet_paper.status) : ''}
      </TableCell>
      <TableCell className={classes.tableBodyCell} align='center'>
        {toiletOverview.soap ? renderBadge(toiletOverview.soap.count, toiletOverview.soap.status) : ''}
      </TableCell>
      <TableCell className={classes.tableBodyCell} align='center'>
        {toiletOverview.sanitizer ? renderBadge(toiletOverview.sanitizer.count, toiletOverview.sanitizer.status) : ''}
      </TableCell>
      <TableCell className={classes.tableBodyCell} align='center'>
        {toiletOverview.tissue ? renderBadge(toiletOverview.tissue.count, toiletOverview.tissue.status) : ''}
      </TableCell>
      <TableCell className={classes.tableBodyCell} align='center'>
        {toiletOverview.iaq ? renderBadge(toiletOverview.iaq.count, toiletOverview.iaq.status) : ''}
      </TableCell>
      <TableCell className={classes.tableBodyCell} align='center'>
        <div className={classes.mapContainer} onClick={handleMapClick(toiletOverview.device_id)}>
          <LocationIcon />
        </div>
      </TableCell>
    </TableRow>
    )
  };

  return (
    <Layout current='overview'>
      <TopMenu menuItems={overviewMenuItems} current={1}/>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            {toiletTableHeads.map((head, key) => (
              <TableCell className={classes.tableHeadCell } align='center' key={key}>
                <Typography className={[1, 2, 4].includes(key) ? classes.tableHeadText2 : classes.tableHeadText}>{head} {key}</Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        {initialLoadStatus === Status.success &&
        <React.Fragment>
          <TableBody>
            <TableRow>
              <td colSpan={9}>
                <div className={classes.floorText}>廁所列表</div>
              </td>
            </TableRow>
            {renderTableRow(data.find(overview => overview.device_id === '1'))}
          </TableBody>
        </React.Fragment>
        }
      </Table>
      {initialLoadStatus === Status.inProgress &&
        <div className={classes.loadingContainer}>
        <CircularProgress className={classes.loading} />
      </div>
      }
    </Layout>
  )
};

export default ToiletPanel;