import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";

import {
  ChannelDetail,
  VideoDetail,
  SearchFeed,
  Navbar,
  Feed,
} from "./components";
import InfoUser from "./components/InfoUser";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Footer from "./components/Footer";
import FeedPage from "./components/FeedPage";

//yarn add socket.io-client
import { io } from "socket.io-client";
import DemoSocket from "./components/demoSocket";

//đối tượng socket client
const socket = io("ws://localhost:8081");
socket.on("nu-up", (data) => {
  document.querySelector(
    "#noiDung"
  ).innerHTML = `${data} <br/>`
});

const App = () => (
  <BrowserRouter>
    <p id="noiDung">0</p>
    <button onClick={()=>{
      socket.emit("fe-click")
    }}>Click</button>
    <Box sx={{ backgroundColor: "#000" }}>
      <Navbar />
      <Routes>
        <Route exact path="/socket" element={<DemoSocket/>}/>
        <Route exact path="/" element={<FeedPage />} />

        <Route exact path="/:page" element={<FeedPage />} />
        <Route exact path="/videoType/:id" element={<Feed />} />

        <Route path="/video/:id" element={<VideoDetail />} />
        <Route path="/channel/:id" element={<ChannelDetail />} />
        <Route path="/info/:id" element={<InfoUser />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/search/:searchTerm" element={<SearchFeed />} />
      </Routes>
      {/* <Footer /> */}
    </Box>
  </BrowserRouter>
);

export default App;
