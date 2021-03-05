import { createStyles, makeStyles, Tooltip, LinearProgress } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles(() =>
  createStyles({
    progress: {
      borderRadius: 16,
      width: '100%',
      height: 20,
      backgroundColor: 'transparent',
      border: '4px #08B1A8 solid',
      boxSizing: 'content-box',
    },
    warningProgress: {
      borderColor: '#FBB71F',
    },
    dangerProgress: {
      borderColor: '#F3314B',
    },
    bar: {
      borderRadius: 12,
    },
    warningBar: {
      backgroundColor: '#FBB71F',
    },
    dangerBar: {
      backgroundColor: '#F3314B',
    },
  }),
);

interface ProgressProps {
  value: number,
  max: number,
  warningThreshold?: number,
  dangerThreshold?: number,
}

const Progress = ({
  value,
  max,
  warningThreshold = 0.8,
  dangerThreshold = 1,
}: ProgressProps) => {
  const classes = useStyles();
  let ratio = value/max;
  if (max === 0) ratio = 0;

  return (
    <React.Fragment>
      <Tooltip title={`${value}/${max}`} arrow>
        <LinearProgress
          variant="determinate"
          value={ratio*100}
          classes={{
            root: `${classes.progress}
              ${ratio >= dangerThreshold && classes.dangerProgress}
              ${ratio < dangerThreshold && ratio >= warningThreshold && classes.warningProgress}`,
            bar: `${classes.bar}
              ${ratio >= dangerThreshold && classes.dangerBar}
              ${ratio < dangerThreshold && ratio >= warningThreshold && classes.warningBar}`,
          }}
        />
      </Tooltip>
    </React.Fragment>
  )
};

export default Progress;