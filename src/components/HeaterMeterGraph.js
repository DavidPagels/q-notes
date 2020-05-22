import React, { useEffect, useState } from 'react';
import { Paper } from '@material-ui/core';
import {Line} from 'react-chartjs-2';

const HeaterMeterGraph = (props) => {
	const heaterMeterUrl = 'http://68.46.34.69'

	const [hmData, setHmData] = useState();

	const extractData = csvRow => {
		const cols = csvRow.split(',');
		const [timestamp, setpoint, probe0, probe1, probe2, probe3, pidOut] = cols;
		return {time: new Date(Number(timestamp) * 1000), setpoint, probe0, probe1, probe2, probe3, pidOut};
	}

	const getHeaterMeterData = async () => {
		const url = `${heaterMeterUrl}/luci/lm/hist`;
		const resp = await fetch(url);
		if (resp.ok) {
			const respText = await resp.text();
			const csvRows = respText.split('\n').filter(row => row);
			setHmData(csvRows.map(extractData));
		}
	};

	useEffect(() => {
		getHeaterMeterData();
	}, []);

	const data = {
	  datasets: [{
	  	label: 'Setpoint',
	  	yAxisID: 'temp-axis',
	    data: hmData && hmData.map(d => ({x: d.time, y: Number(d.setpoint) || 0})),
	    borderWidth: 1,
	    showLine: true,
	    fill: false,
	    pointRadius: 0,
	    borderColor: 'rgba(255,0,0,0.8)'
	  },
	  {
	  	label: 'Pit',
	  	yAxisID: 'temp-axis',
	    data: hmData && hmData.map(d => ({x: d.time, y: Number(d.probe0) || 0})),
	    borderWidth: 3,
	    showLine: true,
	    fill: false,
	    pointRadius: 0,
	    borderColor: '#e73'
	  },
	  {
	  	label: 'Probe 1',
	  	yAxisID: 'temp-axis',
	    data: hmData && hmData.map(d => ({x: d.time, y: Number(d.probe1) || 0})),
	    borderWidth: 2,
	    showLine: true,
	    fill: false,
	    pointRadius: 0,
	    borderColor: '#6c3'
	  },
	  {
	  	label: 'Probe 2',
	  	yAxisID: 'temp-axis',
	    data: hmData && hmData.map(d => ({x: d.time, y: Number(d.probe2) || 0})),
	    borderWidth: 2,
	    showLine: true,
	    fill: false,
	    pointRadius: 0,
	    borderColor: '#297'
	  },
	  {
	  	label: 'Probe 3',
	  	yAxisID: 'temp-axis',
	    data: hmData && hmData.map(d => ({x: d.time, y: Number(d.probe3) || 0})),
	    borderWidth: 2,
	    showLine: true,
	    fill: false,
	    pointRadius: 0,
	    borderColor: '#789'
	  },
	  {
	  	label: 'PID Output',
	  	yAxisID: 'percent-axis',
	    data: hmData && hmData.map(d => ({x: d.time, y: Number(d.pidOut) || 0})),
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
	        display: false,
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
	  maintainAspectRatio: false,
	  legend: {display: false}
	};
	console.log(hmData)

	return (
	  <div className="App">
	    <Paper>
	      <Line id='log-chart' data={data} options={options}/>
	    </Paper>
	  </div>
	);
};

export default HeaterMeterGraph;