import { useState, useEffect } from 'react'
import React from 'react';
import Plot from 'react-plotly.js';
import { Input, Spin, Button, Space } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import './App.css'

const ip = 'http://192.168.20.14:8002';

function BarChart_ash(input_plot_data) {
  var input_data = {...input_plot_data};
  // for (const key in input_data['data']) {
  //   input_data['data'][key] = input_data['data'][key].filter(item => item !== 'None');
  // }

  var plot_data = [
    {
      x: input_data['data']['A'],
      y: input_data['data']['D'],
      type: 'scatter',
      mode: 'lines+markers',
      marker: { color: 'blue' },
      name: 'The Densimetric Curve',
      xaxis: 'x1',
      yaxis: 'y1',
    },
    {
      x: input_data['data']['H'],
      y: input_data['data']['D'],
      type: 'scatter',
      mode: 'lines+markers',
      marker: { color: 'orange' },
      name: 'The Cumulative Floats Curve',
      xaxis: 'x2',
      yaxis: 'y1',
    },
    {
      x: input_data['data']['K'],
      y: input_data['data']['J'],
      type: 'scatter',
      mode: 'lines+markers',
      marker: { color: 'green' },
      name: 'The Cumulative Sinks Curve',
      xaxis: 'x2',
      yaxis: 'y2',
    },
    {
      x: input_data['data']['E'],
      y: input_data['data']['M'],
      type: 'scatter',
      mode: 'lines+markers',
      marker: { color: 'purple' },
      name: 'The Instantaneous Ash Curve',
      xaxis: 'x2',
      yaxis: 'y1',
    },
    {
      x: input_data['trace1']['x'],
      y: input_data['trace1']['y'],
      type: 'scatter',
      mode: 'lines',
      name: '',
      xaxis: 'x2',
      yaxis: 'y1',
      line: {
        dash: 'dash',
        color: 'red',
        width: 3,
      },
      showlegend: false
    },
    {
      x: input_data['trace2']['x'],
      y: input_data['trace2']['y'],
      type: 'scatter',
      mode: 'lines',
      name: '',
      xaxis: 'x',
      yaxis: 'y1',
      line: {
        dash: 'dash',
        color: 'red',
        width: 3,
      },
      showlegend: false
    },
    {
      x: input_data['trace3']['x'],
      y: input_data['trace3']['y'],
      type: 'scatter',
      mode: 'lines',
      name: '',
      xaxis: 'x',
      yaxis: 'y1',
      line: {
        dash: 'dash',
        color: 'red',
        width: 3,
      },
      showlegend: false
    },
  ];
  return (
    <Plot
      data={plot_data}
      layout={{
        xaxis1: { range: [Math.max(...input_data['data']['A'])+0.1, Math.min(...input_data['data']['A'])-0.1], title: 'SPECIFIC GRAVITY', side:'top' },
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
      style={{ width: '1000px', height: '600px' }}
    />
  );
}

function BarChart(input_data) {
  console.log(input_data);
  return (
    <Plot
      data={[
        {
          x: input_data['A'],
          y: input_data['D'],
          type: 'scatter',
          mode: 'lines+markers',
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
        },
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
      style={{ width: '1000px', height: '600px' }}
    />
  );
}

function isnumber(value) {
  if (!isNaN(parseFloat(value)) && isFinite(value) && parseFloat(value) >= 0 && parseFloat(value) <= 100) {
    return parseFloat(value) == value;
  } else {
    return false;
  }
}

function App() {
  const [data, setdata] = useState(null);
  const [chart, setchart] = useState(<Spin style={{ width: '1000px', height: '600px' }} indicator={<LoadingOutlined spin />} size="large" />);
  const [coal_product1, set_coal_product1] = useState(5);
  const [coal_product1_num, set_coal_product1_num] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${ip}/sample`);
      const result = await response.json();
      for (const key in result) {
        result[key] = Object.values(result[key]);
      }
      setdata(result);
      setchart(BarChart(result));
    }
    fetchData();
  }, []);

  function add_coal_product(value) {
    set_coal_product1(value);
    set_coal_product1_num(isnumber(value));
  }

  async function send_coal_product() {
    var req = {'data': data, 'ash': coal_product1};
    console.log(req);
    const response = await fetch(`${ip}/add_ash`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req),
    });
    const result = await response.json();
    var new_data = result['data'];
    for (const key in new_data) {
      new_data[key] = Object.values(new_data[key]);
    }
    setdata(new_data);
    result['data'] = new_data;
    setchart(BarChart_ash(result));
  }

  return (
    <div className="App">
      <h1>Coal Washability Analysis</h1>
      {chart}
      <Space.Compact style={{ width: '33%' }}>
        <Input 
          value={coal_product1}
          status={coal_product1_num ? 'success' : 'error'}
          placeholder="First Coal Product Ash %" 
          onChange={(e) => add_coal_product(e.target.value)}
        />
        {coal_product1_num ? <Button onClick={() => send_coal_product()} type="primary">Add</Button> : <Button disabled type="primary">Add</Button>}
        
      </Space.Compact>
    </div>
  )
}

export default App
