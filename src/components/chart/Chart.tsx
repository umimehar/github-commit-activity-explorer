import React, { ReactElement, useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { IState } from '../../store/store-types';
import format from 'date-fns/format';

const data: any = {
  labels: [],
  data: [],
};

const options = {
  tension: 0.3,
  animation: {
    duration: 0, // general animation time
  },
  hover: {
    animationDuration: 0, // duration of animations when hovering an item
  },
  responsiveAnimationDuration: 0,
  scaleLineColor: 'red',
  plugins: {
    tooltip: {
      backgroundColor: 'white',
      titleColor: 'black',
      bodyColor: 'black',
    },
  },

  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        display: false,
      },
    },
    y: {
      grid: {
        display: false,
      },
      ticks: {
        // display: false,
      },
    },
  },
};

export default function Chart(): ReactElement {
  const { list = {}, hoverOnList } = useSelector((state: IState) => state.statsList);
  const labels: any[] = [];
  const datasets: any[] = [];
  const stats = Object.values(list);

  if (!stats.length) {
    return <></>;
  }

  for (let i: number = 0; i < stats[0].stats.length; i++) {
    const stat = stats[0].stats[i];
    labels.push(`week of ${format(stat.week * 1000, 'MMM dd, yyyy')}`);
  }
  data.labels = labels;

  for (let i: number = 0; i < stats.length; i++) {
    const stat = stats[i];
    const { hoverState } = stat;
    const ini: any = {
      label: stat.initialData.full_name,
      data: [],
      fill: false,
      backgroundColor: hoverOnList && !hoverState ? addAlpha(stat.color, 0.1) : addAlpha(stat.color, 1),
      borderColor: hoverOnList && !hoverState ? addAlpha(stat.color, 0.1) : addAlpha(stat.color, 1),
    };
    for (let j: number = 0; j < stat.stats.length; j++) {
      ini.data.push(stat.stats[j].total);
    }
    datasets.push(ini);
  }
  data.datasets = datasets;
  return (
    <>
      <div key={`${Math.random()}`} className={'chartWrapper w-100'}>
        <Line data={data} options={options} />
      </div>
    </>
  );
}

function addAlpha(color: string, opacity: number): string {
  // coerce values so ti is between 0 and 1.
  const _opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
  return color + _opacity.toString(16).toUpperCase();
}
