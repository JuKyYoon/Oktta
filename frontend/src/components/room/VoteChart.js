import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { championKorean } from '@/const/lolKorean';

const VoteChart = (props) => {

    const candidates = [...props.candidates];
    const labels = candidates.map((candidate) => championKorean[candidate.championName]);

  const donutData = {
    series: [props.top, props.jungle, props.mid, props.adc, props.supporter],
    options: {
      chart: {
        type: 'donut',
      },
      legend: {
        position: 'bottom',
      },
      colors: ['#2E93fA', '#66DA26', '#546E7A', '#E91E63', '#FF9800'],
      plotOptions: {
        pie: {
          donut: {
            size: '60%',
            labels: {
              show: true,
              total: {
                showAlways: true,
                show: true,
                label: '총 투표수',
                fontSize: '12px',
                color: 'red',
              },
              value: {
                fontSize: '22px',
                show: true,
                color: 'blue',
              },
            },
          },
        },
      },
      labels,
      title: {
        text: '과실 비율',
        align: 'center',
      },
    },
  };

  return (
    <div id='chart'>
      <ReactApexChart
        options={donutData.options}
        series={donutData.series}
        type='donut'
        width='500'
      />
    </div>
  );
};
export default VoteChart;
