import React from 'react'
import { io } from "socket.io-client";
const socket = io("ws://localhost:8081")
const DemoSocket = () => {
  //đối tượng socket client => connect vs server realtime
  return (
    <div className='text-white'>socket</div>
  )
}

export default DemoSocket