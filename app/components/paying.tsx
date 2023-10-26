import { useEffect, useState } from "react";
import "./paying.scss";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Path } from "../constant";
import { IconButton } from "./button";
import CloseIcon from "../icons/close.svg";
import Locale, { AllLangs, changeLang, getLang } from "../locales";
export function Paying() {
  const { commodityId } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    paying();
  }, []);

  interface Product {
    codeImg: string;
    productName: string;
    orderId: string;
    createTime: string;
  }
  const [product, setProduct] = useState<Product[]>([]);

  const [codeImg, setCodeImg] = useState("");
  const [productName, setProductName] = useState("");
  const [orderId, setOrderId] = useState("");
  const [createTime, setCreateTime] = useState("");
  const [forPhone, setForPhone] = useState("");

  const paying = () => {
    axios({
      method: "get",
      url: "https://test.workergpt.cn/user/getCode",
      withCredentials: true,
      params: {
        commodityId,
      },
    }).then((res) => {
      console.log(res);

      if (res.data.code == 200) {
        setCodeImg(res.data.data.imgCode);
        setProductName(res.data.data.productName);
        setOrderId(res.data.data.orderId);
        setCreateTime(res.data.data.createTime);
        setForPhone(res.data.data.url);
        const userInfo = JSON.parse(localStorage.getItem("userInfo")!);
        let data = {
          commodityId,
          orderId: res.data.data.orderId,
          username: userInfo.username,
        };
        axios({
          method: "post",
          url: "https://test.workergpt.cn/order/query",
          data,
          withCredentials: true,
        }).then(() => {
          alert("支付成功");
          navigate(Path.Home);
        });
      }
    });
  };
  return (
    <div className="box">
      <div className="window-header">
        <div className="window-header-title">
          <div className="window-header-main-title">正在支付...</div>
          <div className="window-header-sub-title">请您尽快支付</div>
        </div>
        <div className="window-actions">
          <div className="window-action-button">
            <IconButton
              icon={<CloseIcon />}
              onClick={() => navigate(Path.Home)}
              bordered
              title={Locale.Settings.Actions.Close}
            />
          </div>
        </div>
      </div>
      <div className="pay">
        <img src={codeImg} alt="" />
        <div className="info">
          商品名称：<span>{productName}</span> <br />
          商品单号：<span>{orderId}</span> <br />
          创建时间：<span>{createTime}</span> <br />
        </div>
        <div className="footer">
          <span>二维码有效期为5分钟，请您尽快支付</span> <br />
          <a className="goPhone" href={forPhone}>
            手机用户点击跳转支付宝支付
          </a>
        </div>
      </div>
    </div>
  );
}
