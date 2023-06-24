import {
  HashRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import {
  MAX_SIDEBAR_WIDTH,
  MIN_SIDEBAR_WIDTH,
  NARROW_SIDEBAR_WIDTH,
  Path,
  REPO_URL,
} from "../constant";
import { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
export function Register() {
  const navigate = useNavigate();
  const goLogin = () => {
    navigate("/login");
  };
  const [image, setImage] = useState("");
  const [registerInfo, setRegisterInfo] = useState({
    username: "",
    password: "",
    telephone: "",
    email: "",
    recommender: "",
    code: "",
    key: "",
  });

  function register() {
    console.log(registerInfo);
    axios({
      method: "post",
      url: "https://test.workergpt.cn/common/register",
      data: registerInfo,
      withCredentials: true,
    }).then((res) => {
      console.log(res);
      if (res.data.code == 200) {
        alert("注册成功");
        goLogin();
      } else {
        alert(res.data.msg);
      }
    });
  }

  useEffect(() => {
    getCode();
  }, []);

  function getCode() {
    axios.get("https://test.workergpt.cn/common/captcha").then((res) => {
      registerInfo.key = res.data.data.key;
      setImage(res.data.data.image);
    });
  }

  function handleInputChange(
    event: ChangeEvent<HTMLInputElement>,
    inputName: string,
  ) {
    setRegisterInfo({ ...registerInfo, [inputName]: event.target.value });
  }

  return (
    <div className="box">
      <div className="login-box">
        <div className="info">
          <input
            type="text"
            placeholder="请输入您的账号"
            value={registerInfo.username}
            onChange={(e) => handleInputChange(e, "username")}
          />{" "}
          <br />
          <input
            type="password"
            placeholder="请输入您的密码"
            value={registerInfo.password}
            onChange={(e) => handleInputChange(e, "password")}
          />{" "}
          <br />
          <input
            type="text"
            placeholder="请输入您的手机号"
            value={registerInfo.telephone}
            onChange={(e) => handleInputChange(e, "telephone")}
          />{" "}
          <br />
          <input
            type="text"
            placeholder="请输入您的邮箱"
            value={registerInfo.email}
            onChange={(e) => handleInputChange(e, "email")}
          />{" "}
          <br />
          <input
            type="text"
            placeholder="推荐人（选填）"
            value={registerInfo.recommender}
            onChange={(e) => handleInputChange(e, "recommender")}
          />{" "}
          <br />
          <div
            className="codeBox"
            style={{ display: "flex", alignContent: "center" }}
          >
            <input
              type="text"
              style={{
                width: "130px",
                display: "flex",
                alignContent: "center",
              }}
              placeholder="请输入验证码"
              value={registerInfo.code}
              onChange={(e) => handleInputChange(e, "code")}
            />
            <img
              src={image}
              alt=""
              style={{ width: "110px", marginLeft: "10px", marginTop: "15px" }}
              className="codeImg"
              onClick={getCode}
            />
          </div>
          <div className="btn">
            <button style={{ width: "250px" }} onClick={register}>
              注册
            </button>
          </div>
          <div className="footer">
            <span
              style={{ fontSize: "14px", cursor: "pointer" }}
              onClick={goLogin}
            >
              已有账号？点击返回登录
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
