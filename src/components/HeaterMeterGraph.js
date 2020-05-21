import React, { useEffect, useState } from 'react';
import {Line} from 'react-chartjs-2';
import * as moment from 'moment';

const HeaterMeterGraph = (props) => {
	const heaterMeterUrl = 'http://68.46.34.69'

	const [hmData, setHmData] = useState();

	const extractData = csvRow => {
		console.log(csvRow)
		const cols = csvRow.split(',');
		const [timestamp, setpoint, probe0, probe1, probe2, probe3, pidOut] = cols;
		return {time: new Date(Number(timestamp) * 1000), setpoint, probe0, probe1, probe2, probe3, pidOut};
	}

	const getHeaterMeterData = async () => {
		const url = `${heaterMeterUrl}/luci/lm/hist`;
		const opts = {cache: 'no-cache'};;
		const resp = await fetch(url, opts);
		console.log(resp)
		//if (resp.ok) {
			const respText = await resp.text();
			console.log(respText)
			const csvRows = respText.split('\n');
			setHmData(csvRows.map(extractData));
		//}
		console.log(hmData);;
	};

	useEffect(() => {
		getHeaterMeterData();
	}, []);
	const width = 200;
  const height = 400;

	const data = {
	  datasets: [{
	    data: [],
	    borderWidth: 3,
	    steppedLine: true,
	    showLine: true,
	    fill: false,
	    borderColor: 'rgba(0,0,0,0.8)'
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
	    yAxes: [{
	      ticks: {
	        min: -0.5,
	        max: 3.5,
	        stepSize: 1,
	        reverse: true
	      },
	      gridLines: {
	        display: true,
	      }
	    }]
	  },
	  maintainAspectRatio: false,
	  legend: {display: false}
	};

	return (
	  <div className="App">
	    <div style={{margin: 100, height: 300}}>
	      <Line id='log-chart' data={data} options={options}/>
	    </div>
	  </div>
	);
};

export default HeaterMeterGraph;
