import React from 'react';
import { Layout } from '../';
import {
  createStyles,
  makeStyles,
  CircularProgress,
  Button,
} from '@material-ui/core';
import { TopMenu } from '../../components';
import { Line } from 'react-chartjs-2';
import { overviewMenuItems, categoryOptions, colorPaletteRGB } from '../../constants';
import Select from 'react-select';
import Router from 'next/router';
import { KeyboardDatePicker } from "@material-ui/pickers";
import { format } from 'date-fns';
import {
  getPeopleCountChartData,
  getIAQChartData,
  getSoapChartData,
  getToiletPaperChartData,
} from '../../api/charts';
import { Status, TimeScale, CategoryOptionsValue } from '../../types';

const customStyles = {
  menu: (provided, state) => ({
    ...provided,
    marginTop: 0,
    borderRadius: '0 0 18px 18px',
    backgroundColor: '#303C47',
  }),
  control: (provided, { selectProps: { width }}) => ({
    ...provided,
    width: width,
    borderRadius: '19px',
    fontSize: '19px',
    fontWeight: 'bold',
  }),
  container: (provided, state) => ({
    ...provided,
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? '#6e767e' : 'transparent',
    color: '#EBEBEB',
    fontSize: 18,
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';
    return { ...provided, opacity, transition, color: '#303C47', fontSize: 19 };
  },
};

const options = (title, yAxesUnit, timeUnit = 'hour') => {
  return {
    responsive: true,
    maintainAspectRatio: false,
    title: {
      display: true,
      fontColor: 'white',
      text: title,
      fontSize: 30,
    },
    legend: {
      labels: {
        fontColor: 'white',
      },
    },
    tooltips: {
      callbacks: {
        label: function(tooltipItem, data) {
          if (yAxesUnit) {
            return data.datasets[tooltipItem.datasetIndex].label + ": " + tooltipItem.yLabel + yAxesUnit;
          } else {
            return data.datasets[tooltipItem.datasetIndex].label + ": " + tooltipItem.yLabel;
          }
        },
      },
    },
    scales: {
      xAxes: [{
        gridLines: {
          display:false,
          drawBorder: false,
        },
        ticks: {
          fontColor: 'white',
        },
        type: 'time',
        time: { 
          unit: timeUnit,
          unitStepSize: 1,
          displayFormats: {
            hour: 'H:mm',
            day: 'M/D',
            month: 'YY/M',
          },
          parser: "YYYY-MM-DD h:mm:ss" 
        },
      }],
      yAxes: [{
        gridLines: {
          drawBorder: false,
          color: 'white',
          zeroLineColor: 'white',
        },
        ticks: {
          fontColor: 'white',
          suggestedMin: 0,
          ...(yAxesUnit === '%' && {
            suggestedMax: 100,
            callback: function(value) {
              return value + '%';
            },
          }),
        },
        ...(yAxesUnit && {
          scaleLabel: {
            display: true,
            fontColor: 'white',
            labelString: yAxesUnit,
          }
        }),
        ...(yAxesUnit === '%' && {
          scaleLabel: {
            display: true,
            fontColor: 'white',
            labelString: '百分比',
          }
        }),
        ...(yAxesUnit === '℃' && {
          scaleLabel: {
            display: true,
            fontColor: 'white',
            labelString: '攝氏度',
          }
        }),
      }]
    },
    elements: {
      line: {
        tension: 0,
      },
    },
  };
};

const useStyles = makeStyles(() =>
  createStyles({
    chartContainer: {
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column',
      padding: '0 32px',
    },
    selectContainer: {
      margin: '5% 5% 0',
      display: 'flex',
      justifyContent: 'space-between',
    },
    categorySelectContainer: {
      width: '250px',
    },
    datePickerContainer: {
      width: '250px',
      background: 'white',
      padding: '2px 9px',
      borderRadius: '18px',
      
      '& input': {
        fontSize: '19px',
        fontWeight: 'bold',
      },
    },
    loadingContainer: {
      flexGrow: 1,
      display: 'flex',
    },
    loading: {
      margin: 'auto',
    },
    timeScaleContainer: {
      margin: '12px 0',
      textAlign: 'center',
    },
    timeScaleButton: {
      margin: '0 6px',
    },
  }),
);

interface ChartPanelProps {
  category: CategoryOptionsValue | undefined;
}

const ChartPanel = ({ category }: ChartPanelProps) => {
  const classes = useStyles();

  const [initialLoadStatus, setInitialLoadStatus] = React.useState<Status>(Status.blank);
  const [chartsData, setChartsData] = React.useState<Array<any>>([]);
  const [scale, setScale] = React.useState<TimeScale>(TimeScale.hour);
  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());

  React.useEffect(() => {
    let ignore = false;

    const fetchChartsData = async () => {
      try {
        switch (category) {
          case 'soap':
            let soapRes = await getSoapChartData(
              scale,
              scale === TimeScale.hour ? format(selectedDate, 'yyyy-MM-dd') : undefined,
            );
            if (!ignore) {
              setChartsData(soapRes.map(dataset => {
                return {
                  ...dataset,
                  data: dataset.soap.map(data => {
                    return {
                      t: data.time,
                      y: data.score*100,
                    };
                  })
                };
              }));
              setInitialLoadStatus(Status.success);
            }
            break;
          case 'toilet_paper':
            let toiletPaperRes = await getToiletPaperChartData(
              scale,
              scale === TimeScale.hour ? format(selectedDate, 'yyyy-MM-dd') : undefined,
            );
            if (!ignore) {
              setChartsData(toiletPaperRes.map(dataset => {
                return {
                  ...dataset,
                  data: dataset.toilet_paper.map(data => {
                    return {
                      t: data.time,
                      y: data.score*100,
                    };
                  })
                };
              }));
              setInitialLoadStatus(Status.success);
            }
            break;
          case 'iaq_temperature':
            let iaqRes = await getIAQChartData(
              'temperature', 
              scale,
              scale === TimeScale.hour ? format(selectedDate, 'yyyy-MM-dd') : undefined,
            );
            if (!ignore) {
              setChartsData(iaqRes.map(dataset => {
                return {
                  ...dataset,
                  data: dataset.iaq_temperature.map(data => {
                    return {
                      t: data.time,
                      y: data.score,
                    };
                  })
                };
              }));
              setInitialLoadStatus(Status.success);
            }
            break;
          case 'iaq_humidity':
            iaqRes = await getIAQChartData(
              'humidity',
              scale,
              scale === TimeScale.hour ? format(selectedDate, 'yyyy-MM-dd') : undefined,
            );
            if (!ignore) {
              setChartsData(iaqRes.map(dataset => {
                return {
                  ...dataset,
                  data: dataset.iaq_humidity.map(data => {
                    return {
                      t: data.time,
                      y: data.score,
                    };
                  })
                };
              }));
              setInitialLoadStatus(Status.success);
            }
            break;
          case 'iaq_pm2d5':
            iaqRes = await getIAQChartData(
              'pm2d5',
              scale,
              scale === TimeScale.hour ? format(selectedDate, 'yyyy-MM-dd') : undefined,
            );
            if (!ignore) {
              setChartsData(iaqRes.map(dataset => {
                return {
                  ...dataset,
                  data: dataset.iaq_pm2d5.map(data => {
                    return {
                      t: data.time,
                      y: data.score,
                    };
                  })
                };
              }));
              setInitialLoadStatus(Status.success);
            }
            break;
          case 'iaq_NH3':
            iaqRes = await getIAQChartData(
              'NH3',
              scale,
              scale === TimeScale.hour ? format(selectedDate, 'yyyy-MM-dd') : undefined,
            );
            if (!ignore) {
              setChartsData(iaqRes.map(dataset => {
                return {
                  ...dataset,
                  data: dataset.iaq_NH3.map(data => {
                    return {
                      t: data.time,
                      y: data.score,
                    };
                  })
                };
              }));
              setInitialLoadStatus(Status.success);
            }
            break;
          case 'iaq_H2S':
            iaqRes = await getIAQChartData(
              'H2S',
              scale,
              scale === TimeScale.hour ? format(selectedDate, 'yyyy-MM-dd') : undefined,
            );
            if (!ignore) {
              setChartsData(iaqRes.map(dataset => {
                return {
                  ...dataset,
                  data: dataset.iaq_H2S.map(data => {
                    return {
                      t: data.time,
                      y: data.score,
                    };
                  })
                };
              }));
              setInitialLoadStatus(Status.success);
            }
            break;
          case 'people_count':
          default:
            let peopleCountRes = await getPeopleCountChartData(
              scale,
              scale === TimeScale.hour ? format(selectedDate, 'yyyy-MM-dd') : undefined,
            );
            if (!ignore) {
              setChartsData(peopleCountRes.map(dataset => {
                return {
                  ...dataset,
                  data: dataset.people_count.map(data => {
                    return {
                      t: data.time,
                      y: data.count,
                    };
                  })
                };
              }));
              setInitialLoadStatus(Status.success);
            }
            break;
        }
      } catch {
        if (!ignore) {
          setInitialLoadStatus(Status.failure);
        }
      }
    };

    fetchChartsData();
    setInitialLoadStatus(Status.inProgress);
    return () => { ignore = true; }
  }, [category, scale, selectedDate]);

  const handleSelectChange = (e) => {
    e.value && Router.push(`/chart?category=${e.value}`);
  };

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  const renderCategorySelect = () => (
    <div className={classes.selectContainer}>
      <div className={classes.categorySelectContainer}>
        <Select
          options={categoryOptions}
          styles={customStyles}
          value={categoryOptions.find(item => item.value === category) || categoryOptions[0]}
          onChange={handleSelectChange}
          isSearchable={false}
        />
      </div>
      {scale === TimeScale.hour && (
        <div className={classes.datePickerContainer}>
          <KeyboardDatePicker
            value={selectedDate}
            onChange={handleDateChange}
            format="yyyy/MM/dd"
            InputProps={{
              disableUnderline: true,
            }}
            cancelLabel='取消'
            okLabel='確定'
            showTodayButton
            todayLabel='今日'
          />
        </div>
      )}
    </div>
  );

  const getLabel = (device_id) => {
    if (device_id === '1') {
      return 'LG/F 男廁';
    } else {
      return '暂无数据'
    }
  };

  const formatDataSets = () => {
    return chartsData.map((chartData, index) => {
      return {
        label: getLabel(chartData.device_id),
        fill: false,
        backgroundColor: `rgb(${colorPaletteRGB[index%9]})`,
        borderColor: `rgb(${colorPaletteRGB[index%9]}, 1)`,
        data: chartData.data,
      };
    })
  };

  const getOptionTitle = () => {
    return categoryOptions.find(item => item.value === category)
      ? categoryOptions.find(item => item.value === category).label
      : categoryOptions[0].label;
  };

  const getYAxesUnit = () => {
    switch (category) {
      case 'toilet_paper':
      case 'soap':
      case 'tissue': 
      case 'sanitizer':
      case 'iaq_humidity':
        return '%';
      case 'iaq_temperature':
        return '℃';
      case 'iaq_pm2d5':
        return 'ug/m3';
      case 'iaq_NH3':
      case 'iaq_H2S':
        return 'ppm';
      default:
        return null;
    };
  };

  const handleScaleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setScale(e.currentTarget.name as TimeScale);
  }

  const renderTimeScaleSelect = () => (
    <div className={classes.timeScaleContainer}>
      <Button
        type="button"
        variant="contained"
        // @ts-ignore
        color={scale === TimeScale.hour ? "primary": "grey"}
        className={classes.timeScaleButton}
        name={TimeScale.hour}
        onClick={handleScaleClick}
      >
        時
      </Button>
      <Button
        type="button"
        variant="contained"
        // @ts-ignore
        color={scale === TimeScale.day ? "primary": "grey"}
        className={classes.timeScaleButton}
        name={TimeScale.day}
        onClick={handleScaleClick}
      >
        日
      </Button>
      <Button
        type="button"
        variant="contained"
        // @ts-ignore
        color={scale === TimeScale.month ? "primary": "grey"}
        className={classes.timeScaleButton}
        name={TimeScale.month}
        onClick={handleScaleClick}
      >
        月
      </Button>
    </div>
  )
  
  return (
    <Layout current='overview'>
      <TopMenu menuItems={overviewMenuItems} current={2}/>
      {renderCategorySelect()}
      <div className={classes.chartContainer}>
        {initialLoadStatus === Status.success && (
            <Line 
              data={{
                datasets: formatDataSets()
              }}
              options={options(getOptionTitle(), getYAxesUnit(), scale)}
            />
        )}
        {initialLoadStatus === Status.inProgress && (
          <div className={classes.loadingContainer}>
            <CircularProgress className={classes.loading} />
          </div>
        )}
      </div>
      {renderTimeScaleSelect()}
    </Layout>
  );
};

export default ChartPanel;