import { useState, useEffect } from 'react'
import React from 'react';
import Plot from 'react-plotly.js';

import './App.css'

function BarChart(input_data) {
  return (
    <Plot
      data={[
        {
          x: ['Apples', 'Oranges', 'Bananas'],
          y: [20, 14, 23],
          type: 'bar',
        },
      ]}
      layout={{
        autosize: true,
        title: 'Fruit Sales',
      }}
      config={{
        responsive: true, // Ensure the chart resizes with the window
      }}
      style={{ width: '100%', height: '100%' }}
    />
  );
}

function App() {
  const [data, setData] = useState('');

  useEffect(() => {
    // Define the fetch function
    const fetchData = async () => {
      const response = await fetch('http://10.75.128.87:8002/sample');
      const result = await response.json();
      console.log(result);

      for (const key in result) {
        result[key] = Object.values(result[key]);
      }
      setData(result);

    }
    fetchData();
  }, []);


  return (
    <div className="App">
      <h1>Coal Washability Analysis</h1>
      <h4>{JSON.stringify(data)}</h4>
      <BarChart />
    </div>
  )
}

export default App
