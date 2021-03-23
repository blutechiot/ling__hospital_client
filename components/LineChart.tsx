import React from 'react';
import { Line } from 'react-chartjs-2';

const options = {
  responsive: true,
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  tooltips: {
    displayColors: false,
    callbacks: {
      // use label callback to return the desired label
      label: function(tooltipItem, data) {
        return tooltipItem.xLabel + ": " + tooltipItem.yLabel;
      },
      // remove title
      title: function(tooltipItem, data) {
        return;
      }
    }
  },
  scales: {
    xAxes: [{
      gridLines: {
        display:false,
        drawBorder: false,
      },
      ticks: {
        display: false,
      }
    }],
    yAxes: [{
      gridLines: {
        display:false,
        drawBorder: false,
      },
      ticks: {
        display: false,
      }
    }]
  },
};

interface LineChartProps {
  data: number[],
  labels: string[],
}

const LineChart = ({ data, labels }: LineChartProps) => {
  return (
    <Line 
      data={{
        labels,
        datasets: [
          {
            label: '人流統計',
            fill: true,
            lineTension: 0.5,
            backgroundColor: '#08B1A8',
            borderColor: '#08B1A8',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: '#08B1A8',
            pointBackgroundColor: '#08B1A8',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data,
          }
        ],
      }}
      options={options} />
  );
}


export default LineChart;