import React from 'react';
import { Layout } from '../';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import {
  createStyles,
  makeStyles,
  Typography,
  Grid,
  Paper,
  CircularProgress,
} from '@material-ui/core';
import { Progress, TopMenu , LineChart, RadarChart } from '../../components';
import { overviewMenuItems, timeInterval } from '../../constants';
import { useInterval } from '../../utils';
import { getPeopleCountSummary, getIndicators, getUsage } from '../../api/overview';
import { PeopleCountSummary, IndicatorsData, UsageOverview, Status } from '../../types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawerPaper: {
      background: '#303c47',
      borderRight: '4px #08B1A8 solid',
      justifyContent: 'space-between',
      width: '116px',
      boxSizing: 'content-box',
    },
    gridContainer: {
      width: '100%',
      margin: 0,
    },
    column: {
      padding: '0 !important',
    },
    paper: {
      background: '#172632',
      padding: 16,
    },
    paperLight: {
      background: 'transparent',
      padding: 16,
    },
    paperDarkGreen: {
      background: '#0A3039',
      padding: 16,
    },
    paper_1_3: {
      height: 'calc(30vh - 24px)',
      overflow: 'scroll',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
      msOverflowStyle: 'none',
      scrollbarWidth: 'none',
      display: 'flex',
      flexDirection: 'column',
    },
    paper_2_3: {
      height: 'calc(60vh - 24px)',
      overflow: 'scroll',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
      msOverflowStyle: 'none',
      scrollbarWidth: 'none',
      display: 'flex',
      flexDirection: 'column',
    },
    paper_3_3: {
      height: 'calc(90vh - 24px)',
      overflow: 'scroll',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
      msOverflowStyle: 'none',
      scrollbarWidth: 'none',
      display: 'flex',
      flexDirection: 'column',
    },
    levelContainer: {
      display: 'flex',
      padding: '12px 0',
    },
    levelBarsContainer: {
      flexGrow: 1,
      paddingLeft: 12,
    },
    levelBarContainer: {
      display: 'flex',
      paddingBottom: 12,
      alignItems: 'center',
    },
    toiletIcon: {
      paddingRight: 12,
    },
    widgetTitle: {
      fontSize: 23,
      lineHeight: 1.5,
      color: '#EBEBEB',
    },
    widgetText: {
      fontSize: 18,
      lineHeight: 2,
      color: '#EBEBEB',
    },
    peopleCountWidget: {
      padding: 0,
      display: 'flex',
    },
    peopleCountTextContainer: {
      padding: '16px 16px 0 16px',
      color: '#cccccc'
      
    },
    peopleCountNumber: {
      fontSize: 40,
      transform: 'translate(0px, 16px)',
    },
    peopleCountChartContainer: {
      flexGrow: 1,
      height: 'calc(30vh - 98px)',
    },
    outageText: {
      fontWeight: 'bold',
    },
    usageBuildingText: {
      fontSize: 22,
      lineHeight: 1,
      padding: '10px 0'
    },
    usageFloorText: {
      fontSize: 18,
      width: '15%',
      lineHeight: '43px',
    },
    indicatorChartContainer: {
      height: 'calc(60vh - 90px)',
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

const DashboardPanel = () => {
  const classes = useStyles();

  const [peopleCountData, setPeopleCountData] = React.useState<PeopleCountSummary>([]);
  const [indicatorsData, setIndicatorsData] = React.useState<IndicatorsData>();
  const [usageData, setUsageData] = React.useState<UsageOverview>();

  const [initialLoadStatus, setInitialLoadStatus] = React.useState<Status>(Status.blank);

  let ignore = false;

  const fetchData = async () => {
    try {
      const [peopleCountSummary, indicators, usage] = await Promise.all([getPeopleCountSummary(), getIndicators(), getUsage()]);
      if (!ignore) {
        setPeopleCountData(peopleCountSummary);
        setIndicatorsData(indicators);
        setUsageData(usage);
        setInitialLoadStatus(Status.success);
      }
    } catch {
      if (!ignore) {
        setInitialLoadStatus(Status.failure);
      }
    }
  };

  React.useEffect(() => {
    setInitialLoadStatus(Status.inProgress);
  }, []);

  useInterval(fetchData, timeInterval, true ,() => { ignore = true });

  return (
    <Layout current='overview'>
      <TopMenu menuItems={overviewMenuItems} current={0}/>
      <Grid container spacing={3} className={classes.gridContainer}>
        <Grid item xs={4} container spacing={3} className={`${classes.gridContainer} ${classes.column}`}>
          <Grid item xs={12}>
            <Paper className={`${classes.paper} ${classes.paper_1_3}`}>
              <Typography className={classes.widgetTitle}>靈實醫院</Typography>
              <Typography className={classes.widgetText}>醫院管理局</Typography>
              <Typography className={classes.widgetText}>開放時間：24 小時</Typography>
              <Typography className={classes.widgetText}>地點：香港</Typography>
            </Paper>
          </Grid>
     
          <Grid item xs={12}>
            <Paper className={`${classes.paperDarkGreen} ${classes.paper_1_3}`}>
              <Typography className={classes.widgetTitle}>各項服務停工時數</Typography>
              <Typography className={`${classes.widgetText} ${classes.outageText}`}>本周 收集數據中</Typography>
              <Typography className={`${classes.widgetText} ${classes.outageText}`}>本月 收集數據中</Typography>
              </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={`${classes.paperLight} ${classes.paper_1_3}`}>
            </Paper>
          </Grid>
        </Grid>

        <Grid item xs={4} container spacing={3} className={`${classes.gridContainer} ${classes.column}`}>
          <Grid item xs={12}>
            <Paper className={`${classes.paper} ${classes.paper_3_3}`}>
              <Typography className={classes.widgetTitle}>使用率</Typography>
              
              {initialLoadStatus === Status.success && 
              <React.Fragment>
              <Typography className={classes.usageBuildingText}>Block S</Typography>
              <div className={classes.levelContainer}>
                <Typography className={classes.usageFloorText}>LG/F</Typography>
                <div className={classes.levelBarsContainer}>
                  <div className={classes.levelBarContainer}>
                    <img className={classes.toiletIcon} src='static/icons/female.svg' />
                    {usageData && <Progress max={usageData[0].usage.total} value={usageData[0].usage.in_use} />}
                  </div>
                  {/* <div className={classes.levelBarContainer}>
                    <img className={classes.toiletIcon} src='static/icons/male.svg' />
                    {usageData && <Progress max={usageData[3].usage.total} value={usageData[3].usage.in_use} />}
                  </div> */}
                </div>
              </div>

              </React.Fragment>}

              {initialLoadStatus === Status.inProgress &&
              <div className={classes.loadingContainer}>
                <CircularProgress className={classes.loading} />
              </div>}

            </Paper>
          </Grid>
        </Grid>

        <Grid item xs={4} container spacing={3} className={`${classes.gridContainer} ${classes.column}`}>
          <Grid item xs={12} >
            <Paper className={`${classes.paperDarkGreen} ${classes.paper_1_3} ${classes.peopleCountWidget}`}>
              <div className={classes.peopleCountTextContainer}>
                <Typography className={classes.widgetTitle}>人流統計</Typography>
                {initialLoadStatus === Status.success && <Typography className={classes.peopleCountNumber}>
                  {peopleCountData.reduce((sumCount, dailyCount) => sumCount + dailyCount.count, 0)}
                </Typography>}
              </div>
              {initialLoadStatus === Status.success && <div className={classes.peopleCountChartContainer}>
                <LineChart
                  labels={peopleCountData.map(dailyCount => dailyCount.time)}
                  data={peopleCountData.map(dailyCount => dailyCount.count)}
                />
              </div>}
              {initialLoadStatus === Status.inProgress &&
              <div className={classes.loadingContainer}>
                <CircularProgress className={classes.loading} />
              </div>}
            </Paper>
           
     
          </Grid>
          <Grid item xs={12}>
            <Paper className={`${classes.paperDarkGreen} ${classes.paper_2_3}`}>
              <Typography className={classes.widgetTitle}>各項指標</Typography>
              {initialLoadStatus === Status.success && <div className={classes.indicatorChartContainer}>
                {indicatorsData && <RadarChart
                  labels={['廁板消毒液', '洗手液', 'IAQ', '廁紙', '抹手紙']}
                  data={[
                    indicatorsData.sensor_sanitizer.score,
                    indicatorsData.sensor_soap.score,
                    indicatorsData.sensor_iaq.score,
                    indicatorsData.sensor_toilet_paper.score,
                    indicatorsData.sensor_tissue.score
                  ]}
                />}
              </div>}
              {initialLoadStatus === Status.inProgress &&
              <div className={classes.loadingContainer}>
                <CircularProgress className={classes.loading} />
              </div>}
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  )
};

export default DashboardPanel;