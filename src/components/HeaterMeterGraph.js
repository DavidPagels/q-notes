import React from 'react';
import { Line } from 'react-chartjs-2';

const HeaterMeterGraph = (props) => {

	const data = {
	  datasets: [{
	  	label: 'Setpoint',
	  	yAxisID: 'temp-axis',
	    data: props.hmData && props.hmData.filter(d => Number(d.setpoint)).map(d => ({x: d.time, y: Number(d.setpoint) || 0})),
	    borderWidth: 1,
	    showLine: true,
	    fill: false,
	    pointRadius: 0,
	    borderColor: 'rgba(255,0,0,0.8)'
	  },
	  {
	  	label: 'Pit',
	  	yAxisID: 'temp-axis',
	    data: props.hmData && props.hmData.filter(d => Number(d.probe0)).map(d => ({x: d.time, y: Number(d.probe0) || 0})),
	    borderWidth: 3,
	    showLine: true,
	    fill: false,
	    pointRadius: 0,
	    borderColor: '#e73'
	  },
	  {
	  	label: 'Probe 1',
	  	yAxisID: 'temp-axis',
	    data: props.hmData && props.hmData.filter(d => Number(d.probe1)).map(d => ({x: d.time, y: Number(d.probe1) || 0})),
	    borderWidth: 2,
	    showLine: true,
	    fill: false,
	    pointRadius: 0,
	    borderColor: '#6c3'
	  },
	  {
	  	label: 'Probe 2',
	  	yAxisID: 'temp-axis',
	    data: props.hmData && props.hmData.filter(d => Number(d.probe2)).map(d => ({x: d.time, y: Number(d.probe2) || 0})),
	    borderWidth: 2,
	    showLine: true,
	    fill: false,
	    pointRadius: 0,
	    borderColor: '#297'
	  },
	  {
	  	label: 'Probe 3',
	  	yAxisID: 'temp-axis',
	    data: props.hmData && props.hmData.filter(d => Number(d.probe3)).map(d => ({x: d.time, y: Number(d.probe3) || 0})),
	    borderWidth: 2,
	    showLine: true,
	    fill: false,
	    pointRadius: 0,
	    borderColor: '#789'
	  },
	  {
	  	label: 'PID Output',
	  	yAxisID: 'percent-axis',
	    data: props.hmData && props.hmData.filter(d => Number(d.pidOut)).map(d => ({x: d.time, y: Number(d.pidOut) || 0})),
	    borderWidth: 1,
	    showLine: true,
	    fill: true,
	    pointRadius: 0,
	    borderColor: '#6cf'
	  }]
	};

	const options = {
	  scales: {
	    xAxes: [{
	      type: 'time',
	      gridLines: {
	      	color: '#CCC',
	      	display: true
	      }
	    }],
	    yAxes: [
	    {
	    	type: 'linear',
	    	id: 'percent-axis',
	      ticks: {
	        min: 0,
	        max: 100,
	        stepSize: 10
	      },
	      gridLines: {
	      	color: '#ccc',
	        display: true,
	      }
	    },
	    {
	    	type: 'linear',
	    	id: 'temp-axis',
	      gridLines: {
	        display: false,
	      },
	      ticks: {
	      	stepSize: 10
	      },
	      position: 'right'
	    }]
	  },
	  maintainAspectRatio: true,
	  legend: {display: false}
	};

	return <Line id='log-chart' data={data} options={options}/>;
};

export default HeaterMeterGraph;