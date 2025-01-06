'use client';

import React, { useState, FC } from 'react';
import dynamic from 'next/dynamic';
import moment from 'moment';
import { AnalyticsContentProps } from './analytics-content.type';
import { pastDays } from '../../../../../lib/analytics/constants';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

const AnalyticsContent: FC<AnalyticsContentProps> = ({ data = [], mallName }) => {
  const filteredData = data.filter((d) => {
    const createdAt = new Date(d.createdAt);

    return createdAt >= pastDays['30d'];
  });

  const getDataByIndex = (index: number) => {
    if (index < 0) return null;

    return filteredData[index];
  };

  const [chartData, setChartData] = useState<any>({
    series: [
      {
        name: 'Revenue',
        data: filteredData.map((d) => d.amount),
      },
    ],
    options: {
      chart: {
        height: 350,
        type: 'bar',
      },
      plotOptions: {
        bar: {
          borderRadius: 10,
          dataLabels: {
            position: 'top',
          },
        },
      },
      dataLabels: {
        enabled: true,
        formatter: (val: number, { dataPointIndex = 0 }: any) => {
          const { paymentCurrency } = getDataByIndex(dataPointIndex);

          return (
            new Intl.NumberFormat('tr-TR', {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(val) + ` ${paymentCurrency?.symbol}`
          );
        },
        offsetY: -20,
        style: {
          fontSize: '12px',
          colors: ['#304758'],
        },
      },

      xaxis: {
        categories: filteredData.map((d) => moment(d.createdAt).format('MMM Do YYYY')),
        position: 'top',
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        crosshairs: {
          fill: {
            type: 'gradient',
            gradient: {
              colorFrom: '#D8E3F0',
              colorTo: '#BED1E6',
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5,
            },
          },
        },
        tooltip: {
          enabled: true,
        },
      },
      yaxis: {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: false,
          formatter: (val: number, { dataPointIndex = 0 }: any) => {
            const { paymentCurrency, status } = getDataByIndex(dataPointIndex);

            return (
              new Intl.NumberFormat('tr-TR', {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }).format(val) +
              ` ${paymentCurrency?.symbol}` +
              ` (${status})`
            );
          },
        },
      },
      title: {
        text: `Monthly Store Revenue of ${mallName}`,
        floating: true,
        offsetY: 330,
        align: 'center',
        style: {
          color: '#444',
        },
      },
      tooltip: {
        enabled: true,
        custom: ({ series, seriesIndex, dataPointIndex = 0 }: any) => {
          const amount = series[seriesIndex][dataPointIndex];
          const { paymentCurrency, store, status, createdAt } = getDataByIndex(
            Number(dataPointIndex),
          );

          const revenue =
            new Intl.NumberFormat('tr-TR', {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(amount) + ` ${paymentCurrency?.symbol}`;
          const clientName = ['Yusuf', 'Ali', 'Ahmet'][dataPointIndex];

          return `
            <div>
              <strong>Revenue:</strong> ${revenue.toLocaleString()}<br>
              <strong>Store:</strong> ${store?.name}<br>
              <strong>Status:</strong> ${status}<br>
              <strong>Time Ago:</strong> ${moment(createdAt).startOf('day').fromNow()}
            </div>
          `;
        },
        style: {
          padding: '15px',
        },
      },
    },
  });

  return (
    <div className="analytics__content">
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="bar"
        height={350}
        style={{ padding: 30, border: '1px solid #ececec', borderRadius: 10 }}
      />
    </div>
  );
};

export default AnalyticsContent;
