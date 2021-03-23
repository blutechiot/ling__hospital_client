import { Radar } from 'react-chartjs-2';

const options = {
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  tooltips: {
    displayColors: false,
    mode: 'label',
    callbacks: {
      label: function(tooltipItem, data) {
        return data['datasets'][0]['data'][tooltipItem['index']];
      },
      title: function(tooltipItem, data) {
        return;
      }
    }
  },
  scale: {
    ticks: {
      beginAtZero: true,
      max: 1,
      min: 0,
      stepSize: 0.2,
      display: false,
    },
    pointLabels: {
      fontColor: '#EBEBEB',
      fontSize: 18,
    },
    gridLines: {
      circular: true,
      color: 'white',
      borderDash: [ 5],
      drawTicks: false,
    },
  },
};

interface RadarChartProps {
  data: number[],
  labels: string[],
}

const RadarChart = ({ data, labels }: RadarChartProps) => (
  <Radar
    data={{
      labels,
      datasets: [{
        data,
        backgroundColor: 'rgba(251, 183, 31, 0.8)',
        borderColor: 'transparent',
      }]
    }}
    options={options}
  />
);

export default RadarChart;