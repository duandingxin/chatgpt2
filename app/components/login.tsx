import {
  HashRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import { Path } from "../constant";
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
export function Login() {
  const [image, setImage] = useState("");
  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useState({
    username: "",
    password: "",
    code: "",
    key: "",
  });

  useEffect(() => {
    getCode();
  }, []);

  function getCode() {
    axios.get("https://test.workergpt.cn/common/captcha").then((res) => {
      console.log(res.data.data);
      loginInfo.key = res.data.data.key;
      setImage(res.data.data.image);
    });
  }

  async function login() {
    console.log(loginInfo);
    await axios({
      method: "post",
      url: "https://test.workergpt.cn/common/login",
      data: loginInfo,
      withCredentials: true,
    }).then((res) => {
      if (res.data.code == 200) {
        navigate(Path.Home);
        localStorage.setItem("userInfo", JSON.stringify(res.data.data));
      } else {
        alert(res.data.msg);
      }
    });
  }

  function handleInputChange(
    event: ChangeEvent<HTMLInputElement>,
    inputName: string,
  ) {
    setLoginInfo({ ...loginInfo, [inputName]: event.target.value });
  }

  return (
    <div className="box">
      <div className="login-box">
        <div className="info">
          <input
            type="text"
            placeholder="请输入您的账号"
            value={loginInfo.username}
            onChange={(e) => handleInputChange(e, "username")}
          />{" "}
          <br />
          <input
            type="password"
            placeholder="请输入您的密码"
            value={loginInfo.password}
            onChange={(e) => handleInputChange(e, "password")}
          />{" "}
          <br />
          {/* <div
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
              value={loginInfo.code}
              onChange={(e) => handleInputChange(e, "code")}
            />
            <img
              src={image}
              alt=""
              style={{ width: "110px", marginLeft: "10px", marginTop: "15px" }}
              onClick={getCode}
              className={"codeImg"}
            />
          </div> */}
          <div className="btn">
            <button onClick={login}>登录</button>
            <Link to={Path.Register}>
              <button>注册</button>
            </Link>
          </div>
          <div
            className="footer"
            style={{ fontSize: "12px", marginTop: "20px" }}
          >
            登录问题联系客服qq：3152557243
          </div>
        </div>
      </div>
    </div>
  );
}
