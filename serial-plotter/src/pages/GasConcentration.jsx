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

function GasConcentrationHistory({ data }) {
  return (
    <LineChart width={600} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="timestamp" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="concentration"
        stroke="#ff0000"
        name="Gas Concentration (ppm)"
      />
    </LineChart>
  )
}

function GasConcentration({ sensorData }) {
  const historyRef = useRef([])

  // Update history with new data
  const currentTime = new Date().toLocaleTimeString()
  historyRef.current = [
    ...historyRef.current.slice(-50),
    {
      timestamp: currentTime,
      concentration: sensorData.environment.aqi,
    },
  ]

  return (
    <div>
      <h1>Gas Concentration (MQ135)</h1>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Card title="Current Values" className="custom-card">
            <p>
              Gas Concentration: {sensorData.environment.aqi.toFixed(2)} ppm
            </p>
          </Card>
        </Col>
        <Col span={24}>
          <Card title="History" className="custom-card">
            <GasConcentrationHistory data={historyRef.current} />
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default GasConcentration
