import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, CardMedia } from "@mui/material";
import ReactFacebookLogin from "react-facebook-login";
import { Videos, ChannelCard } from ".";
import { loginAPI, loginFaceAPI } from "../utils/fetchFromAPI.js";
import axios from "axios";
const Login = () => {
  const [channelDetail, setChannelDetail] = useState();
  const [videos, setVideos] = useState(null);

  const { id } = useParams();

  //! Đọc file google sheet
  useEffect(async() => {
    const sheetId = "1bX2BlIASyRTgG0cw79_Y67IUekHAbWoimGdMqrYE-VY"
    const apiKey = "AIzaSyC46EwumuM1rmb6UyVuuk4pgOUUPx-k1qs"
    const range = "sheet1!A1:C10"
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`

    const response = await axios.get(url)
    console.log(response.data.values)
  }, []);

  return (
    <div className="p-5 " style={{ minHeight: "100vh" }}>
      <div className=" d-flex justify-content-center">
        <form className="row g-3 text-white">
          <div className="col-md-12">
            <label htmlFor="inputEmail4" className="form-label">
              Email
            </label>
            <input type="email" className="form-control" id="email" />
          </div>
          <div className="col-md-12">
            <label htmlFor="inputEmail4" className="form-label">
              Password
            </label>
            <input className="form-control" id="pass" />
          </div>
          <div className="col-12">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                let email = document.querySelector("#email").value;
                let password = document.querySelector("#pass").value;
                loginAPI({ email, password })
                  .then((result) => {
                    alert("login thành công ");
                    localStorage.setItem("LOGIN_USER", result); // save token
                    window.location.reload();
                  })
                  .catch((error) => {
                    // error.response // là cấu trúc mà axios trả về cho mình
                    // còn data.message là do backend mình định nghĩa
                    alert(error.response.data.message);
                  });
              }}
            >
              Login
            </button>
          </div>
          <ReactFacebookLogin
            appId="312062695290384"
            fields="name,email,picture"
            callback={(response) => {
              console.log(response);
              let newUser = {
                ...response,
                face_app_id: response.face_app_id,
              };
              loginFaceAPI(newUser).then((result) => {
                alert("Login thành công");

                localStorage.setItem("LOGIN_USER", result); // save token
                window.location.reload();
              });
            }}
          />
        </form>
      </div>
    </div>
  );
};

export default Login;
