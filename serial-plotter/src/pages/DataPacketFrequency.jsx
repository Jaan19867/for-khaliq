import React, { useState, useEffect } from "react"
import { Card, Statistic } from "antd"

function DataPacketFrequency({ onDataReceived }) {
  const [packetFrequency, setPacketFrequency] = useState(0) // Frequency in Hz
  const [lastPacketTime, setLastPacketTime] = useState(null) // Timestamp of the last packet

  // Effect to calculate frequency whenever a new data packet is received
  useEffect(() => {
    if (onDataReceived) {
      const handleData = () => {
        const now = Date.now() // Current timestamp in milliseconds
        if (lastPacketTime) {
          const timeDifference = (now - lastPacketTime) / 1000 // Time difference in seconds
          const frequency = 1 / timeDifference // Frequency in Hz
          setPacketFrequency(frequency.toFixed(2)) // Update frequency state
        }
        setLastPacketTime(now) // Update the last packet timestamp
      }

      // Attach the handler to the onDataReceived event
      onDataReceived(handleData)
    }
  }, [lastPacketTime, onDataReceived])

  return (
    <Card title="Data Packet Frequency" style={{ width: 300 }}>
      <Statistic title="Frequency" value={packetFrequency} suffix="Hz" />
    </Card>
  )
}

export default DataPacketFrequency
