import "./commodity.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Path } from "../constant";
import { ErrorBoundary } from "./error";
import { useState, useEffect } from "react";
import { IconButton } from "./button";
import CloseIcon from "../icons/close.svg";
import Locale, { AllLangs, changeLang, getLang } from "../locales";
export function Commodity() {
  interface Product {
    id: number;
    productName: string;
    money: string;
    description: string;
  }

  const [products, setProducts] = useState<Product[]>([]);

  const navigate = useNavigate();

  const goPaying = (id: number) => {
    navigate(`${Path.Paying}/${id}`);
  };

  const getCommodity = () => {
    axios({
      method: "get",
      url: "https://test.workergpt.cn/commodity",
      withCredentials: true,
    }).then((res) => {
      setProducts(res.data.data);
      console.log(products);
    });
  };
  useEffect(() => {
    getCommodity();
  }, []);
  return (
    <ErrorBoundary>
      <div className="window-header">
        <div className="window-header-title">
          <div className="window-header-main-title">充值时长</div>
          <div className="window-header-sub-title">选择商品</div>
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
      <div className="box">
        <ul className="commodity">
          {products.map((item) => (
            <li onClick={() => goPaying(item.id)} key={item.id}>
              <img
                src="https://supperjoy-1311200541.cos.ap-chengdu.myqcloud.com/%E5%95%86%E5%93%81.png"
                alt=""
              />
              <div className="info">
                <div
                  style={{
                    fontSize: "14px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    width: "200px",
                  }}
                >
                  {item.productName}
                </div>
                <div>{"￥" + item.money}</div>
                <div
                  className="des"
                  style={{
                    fontSize: "12px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    width: "200px",
                  }}
                >
                  {item.description}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </ErrorBoundary>
  );
}
