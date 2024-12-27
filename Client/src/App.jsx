import { useState, useEffect } from 'react'
import React from 'react';
import Plot from 'react-plotly.js';

import './App.css'

function BarChart(input_data) {
  console.log(input_data);
  return (
    <Plot
      data={[
        {
          x: input_data['A'],
          y: input_data['D'],
          type: 'scatter',
          mode: 'lines+markers', // Adds markers to the lines
          marker: { color: 'blue' },
          name: 'The Densimetric Curve',
          xaxis: 'x1',
          yaxis: 'y1',
        },
        {
          x: input_data['H'],
          y: input_data['D'],
          type: 'scatter',
          mode: 'lines+markers',
          marker: { color: 'orange' },
          name: 'The Cumulative Floats Curve',
          xaxis: 'x2',
          yaxis: 'y1',
        },
        {
          x: input_data['K'],
          y: input_data['J'],
          type: 'scatter',
          mode: 'lines+markers',
          marker: { color: 'green' },
          name: 'The Cumulative Sinks Curve',
          xaxis: 'x2',
          yaxis: 'y2',
        },
        {
          x: input_data['E'],
          y: input_data['M'],
          type: 'scatter',
          mode: 'lines+markers',
          marker: { color: 'purple' },
          name: 'The Instantaneous Ash Curve',
          xaxis: 'x2',
          yaxis: 'y1',
        }
      ]}
      layout={{
        xaxis1: { range: [Math.max(...input_data['A'])+0.1, Math.min(...input_data['A'])-0.1], title: 'SPECIFIC GRAVITY', side:'top' },
        yaxis1: { range: [100, 0], title: 'CUMULATIVE WEIGHT % FLOATS' },
        xaxis2: {range: [0, 100], side: 'bottom', title: 'ASH %', overlaying: 'x'},
        yaxis2: {range: [0, 100], side: 'right', title: 'CUMULATIVE WEIGHT % SINKS', overlaying: 'y'},
        legend: {
          orientation: 'h', // Horizontal legend
          x: 0, // Aligns legend to the left
          y: -0.2, // Moves legend below the plot (negative values)
        }
      }}
      config={{
        responsive: true,
      }}
      style={{ width: '100%', height: '600px' }}
    />
  );
}

function App() {
  const [data, setData] = useState('');
  const [chart, setchart] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://10.75.128.94:8002/sample');
      const result = await response.json();
      for (const key in result) {
        result[key] = Object.values(result[key]);
      }
      setData(result);
      setchart(BarChart(result));
    }
    fetchData();
  }, []);


  return (
    <div className="App">
      <h1 style={{ width: '1200px' }}>Coal Washability Analysis</h1>
      {chart}
    </div>
  )
}

export default App
