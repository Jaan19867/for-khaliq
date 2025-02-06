import React, { useRef } from "react"
import { Card, Row, Col } from "antd"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts"

function EnvironmentHistory({ data }) {
  return (
    <LineChart width={600} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="timestamp" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="temperature"
        stroke="#ff0000"
        name="Temperature (°C)"
      />
      <Line
        type="monotone"
        dataKey="altitude"
        stroke="#00ff00"
        name="Altitude (m)"
      />
      <Line
        type="monotone"
        dataKey="pressure"
        stroke="#0000ff"
        name="Pressure (hPa)"
      />
    </LineChart>
  )
}

function EnvironmentSec({ sensorData }) {
  const historyRef = useRef([])

  // Update history with new data
  const currentTime = new Date().toLocaleTimeString()
  historyRef.current = [
    ...historyRef.current.slice(-50),
    {
      timestamp: currentTime,
      temperature: sensorData.environment.temperature,
      altitude: sensorData.environment.altitude,
      pressure: sensorData.environment.pressure,
    },
  ]

  return (
    <div>
      <h1>Environment Data</h1>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Card title="Current Values" className="custom-card">
            <p>
              Temperature: {sensorData.environment.temperature.toFixed(2)} °C
            </p>
            <p>Altitude: {sensorData.environment.altitude.toFixed(2)} m</p>
            <p>Pressure: {sensorData.environment.pressure.toFixed(2)} hPa</p>
          </Card>
        </Col>
        <Col span={24}>
          <Card title="History" className="custom-card">
            <EnvironmentHistory data={historyRef.current} />
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default EnvironmentSec
