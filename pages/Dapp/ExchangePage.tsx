import { LoadingOutlined } from "@ant-design/icons";
import { OrderBook } from "@lab49/react-order-book";
import { useWeb3React } from "@web3-react/core";
//import bigTest from './neworder.mjs'
import { Spin } from "antd";
//import DOMPurify from 'dompurify'
//import useActiveWeb3React from 'hooks/useActiveWeb3React'
//import useAddTokenToMetamask from 'hooks/useAddTokenToMetamask' - /////from transaction cofrimation modal index line 127
import React, { useEffect, useMemo, useState } from "react";
//import TradeViewChart from 'react-crypto-chart'
import { AdvancedChart } from "../../components/react-tradingview-embed";
//        <AdvancedChart widgetProps={{ width: '700px', height: '500px', symbol: 'BITMEX:ETHUSDT', theme: 'dark' }} />
import Swal from "sweetalert2";
import HeaderComponent from "../../components/Header/HeaderComponent";
import ChartComponent from "./Chart";

//import Rex_logo from '../../assets/images/REX_logo.png'

//const mySafeHTML = DOMPurify.sanitize(myHTML)

const Exchange = () => {
  //const scrollY = useScrollPosition()
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const [loading, setLoading] = useState(false);
  //const { account } = useActiveWeb3React()
  const { account } = useWeb3React();
  const showConnectAWallet = Boolean(!account);
  const context = useWeb3React();
  const { library } = context;
  const [bookcalled, setbookcalled] = useState(false);
  const bidsorderlist: any[] = [];
  const asksorderlist: any[] = [];
  //const [chart, setchart] = useState(html)
  const [book, setbook] = useState(Object);
  const [orderonbook, setorderonbook] = useState<any[]>([]);
  const [devmodeactive, setdevmodactive] = useState(true);
  const [ishidden, setishidden] = useState(Boolean);
  const [orderbook, setorderbook] = useState<any[]>([]);
  const [order_side, setorder_side] = useState(String);
  const [order_size, setorder_size] = useState(String);
  const [orderplaced, setorderplaced] = useState(Boolean);
  const [TradingPair, setasset_market] = useState(String);
  const [order_price, setorder_price] = useState(Number);
  const [order_variant, setorder_variant] = useState(String);
  const [limithidden, setislimithidden] = useState(false);
  const [cancelhidden, setiscancelhidden] = useState(false);
  const [markethidden, setismarkethidden] = useState(false);
  const [cancelorderid, setcancelorderid] = useState(Number);

  function ChartComponent(){
    
    return( <AdvancedChart             widgetProps={{
        width: "700px",
        height: "500px",
        symbol: "BITMEX:ETHUSDT",
        theme: "dark",
      }} />)
}

const calculation = useMemo(() => ChartComponent(), [orderbook])

  function toggleHidden() {
    setishidden(!ishidden);
  }

  function handlelimitclick() {
    setislimithidden(!limithidden);
    setismarkethidden(false);
    setorder_variant("LIMIT");
  }
  function handlemarketclick() {
    setismarkethidden(!markethidden);
    setislimithidden(false);
    setorder_variant("MARKET");
  }
  function handlecancelclick() {
    setiscancelhidden(!cancelhidden);
  }

  useEffect(() => {
    async function FetchOrderbook() {
      try {
        const response = await fetch(
          "https://fierce-anchorage-27299.herokuapp.com/ ",
          {
            method: "GET",
            mode: "cors",
            headers: {
              "Content-Type": "text/plain",
              accept: "text/plain",
            },
          }
        );
        const data = await response.json();

        const awaitdata = await data;
        console.log(awaitdata);

        return awaitdata;
      } catch (error) {
        console.log(error);
      } finally {
        setasset_market("WETHUSDC");
      }
    }
    FetchOrderbook().then((result) => setorderbook(result));
  }, [account, orderplaced]);

  async function Postacc() {
    if (showConnectAWallet) {
      Swal.fire({
        icon: "error",
        title: "Connect your Wallet to submit a Transaction",
      });
      return;
    }
    if (!order_side && !order_size) {
      Swal.fire({
        icon: "error",
        title: " Please fill in all fields before submitting",
        text: "if you do not submit a price, your order will be executed at market price",
      });
      return;
    }
    try {
      setLoading(true);
      const options = {
        method: "POST",
        json: true, // if truthy, parse *response* as JSON
        headers: {
          "Content-type": "application/json",
          "Access-Control-Allow-Methods": "POST",
          "Access-Control-Allow-Headers": "Content-Type/json",
        },
        body: JSON.stringify({
          // have to manually stringify object in bod
          order_id: 0,
          order_size,
          address: account,
          order_price,
          AssetType: "WETHUSDC",
          order_variant,
          order_side,
        }),
      };
      const response = await fetch(
        "https://fierce-anchorage-27299.herokuapp.com/ ",
        options
      );
      const data = response.json();
      return data;
    } catch (error) {
      console.log(error);
    } finally {
      Swal.fire({
        icon: "success",
        title: "Your order has been placed",
      });
      setorderplaced(!orderplaced);
      setLoading(false);
    }
  }
  async function CancelOrder() {
    if (showConnectAWallet) {
      Swal.fire({
        icon: "error",
        title: "Connect your Wallet to submit a Transaction",
      });
      return;
    }
    if (!cancelorderid) {
      Swal.fire({
        icon: "error",
        title: "You must select an order to cancel before submitting",
      });
      return;
    }
    try {
      setLoading(true);
      const options = {
        method: "POST",
        json: true, // if truthy, parse *response* as JSON
        headers: {
          "Content-type": "application/json",
          "Access-Control-Allow-Methods": "POST",
          "Access-Control-Allow-Headers": "Content-Type/json",
        },
        body: JSON.stringify({
          // have to manually stringify object in bod
          order_id: cancelorderid,
          order_size,
          address: account,
          order_price,
          AssetType: "WETHUSDC",
          order_variant: "CANCELORDER",
          order_side,
        }),
      };
      const response = await fetch(
        "https://fierce-anchorage-27299.herokuapp.com/ ",
        options
      );
      const data = response.json();
      return data;
    } catch (error) {
      console.log(error);
    } finally {
      Swal.fire({
        icon: "success",
        title: "Your order has been cancelled",
      });
      setorderplaced(!orderplaced);
      setLoading(false);
    }
  }
  useEffect(() => {
    //const orderbookarray = JSON.parse(orderbook)
    //console.log(orderbookarray)
    async function Setbook() {
      if (orderbook.length === 0) {
        return;
      }
      try {
        console.log(orderbook);
        orderbook.forEach((element: any) => {
          element.order_side === "BUY" && element.order_variant === "LIMIT"
            ? bidsorderlist.push([
                JSON.stringify(element.order_price),
                element.order_size,
              ]) //&& bidsize.push(element.order_size)
            : asksorderlist.push([
                JSON.stringify(element.order_price),
                element.order_size,
              ]); //&& asksize.push(element.order_size)
        });
        const bidbook = await asksorderlist.reverse();
        const askbook = await bidsorderlist.reverse();
        const thebook = {
          bids: askbook,
          asks: bidbook,
        };
        console.log(thebook);
        const final = await thebook;
        setbook(final);
        return final;
      } catch (error) {
        console.log(error);
      } finally {
        setbookcalled(true);
      }
    }

    Setbook();
  }, [orderbook]);

  const testbook = {
    asks: [
      ["1.01", "2"],
      ["1.02", "3"],
    ],
    bids: [
      ["0.99", "5"],
      ["0.98", "3"],
    ],
  };
  const testbook2 = {
    asks: [
      ["1.0342", "243"],
      ["1.0432", "43"],
    ],
    bids: [
      ["5.99", "5"],
      ["10.98", "3"],
    ],
  };
  console.log(testbook);

  useEffect(() => {
    orderbook.forEach((element: any) => {
      element.address === account
        ? orderonbook.push(element._id.toString())
        : console.log("customer has no orders");
    });
  }, [orderbook]);
  useEffect(() => {
    setismarkethidden(!markethidden);
  }, []);

  const arrofids = orderonbook.map((i: any) => {
    return (
      <ul
        style={{
          cursor: "pointer",
          display: "inline-block",
          flexDirection: "row",
        }}
        onClick={() => setcancelorderid(i)}
        key={i}
      >
        {Number(i)}
      </ul>
    );
  });

  return (
    <>
      <HeaderComponent></HeaderComponent>
      <div
        className={"flexbox-container"}
        style={{ color: "#000000", justifyContent: "left", paddingTop: "50px" }}
      >
        <div
          className={"flexbox-vertical-container"}
          style={{
            color: "#000000",
            textAlign: "left",
            justifyContent: "left",
            paddingTop: "50px",
          }}
        >
         {calculation}
          <div
            style={{ justifyContent: "center" }}
            className={"flexbox-vertical-container"}
          >
            <p
              style={{
                paddingTop: "2vh",
                marginTop: "2vh",
                marginBottom: "2vh",
              }}
            ></p>

            <div
              className={"tab"}
              style={{ justifyContent: "center", minWidth: "300px" }}
            >
              <button
                onClick={() => handlemarketclick()}
                className={"tablinks"}
              >
                Your Orders
              </button>
              <button onClick={() => handlelimitclick()} className={"tablinks"}>
                Trade History
              </button>
              <button
                onClick={() => handlecancelclick()}
                className={"tablinks"}
              >
                Cancel Order
              </button>
            </div>
            {cancelhidden ? (
              <>
                <div className={"Rexcard"} style={{ maxWidth: "300px" }}>
                  <div style={{ color: "#ffffff" }}>
                    <h3>Cancel Order</h3>
                    <p>What order would you like to cancel?</p>
                    {orderbook ? (
                      <>{arrofids}</>
                    ) : (
                      <>You have no orders on the book</>
                    )}
                    <input
                      style={{ marginTop: "10px" }}
                      className={"Form-button-input"}
                      onClick={() => CancelOrder()}
                      type="submit"
                      value="Submit"
                    />
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div
          style={{ justifyContent: "center" }}
          className={"flexbox-vertical-container"}
        >
          <div
            className={"tab"}
            style={{
              justifyContent: "center",
              maxWidth: "30px",
              minWidth: "400px",
            }}
          >
            <button onClick={() => handlemarketclick()} className={"tablinks"}>
              Market Order
            </button>
            <button onClick={() => handlelimitclick()} className={"tablinks"}>
              Limit Order
            </button>
          </div>
          {markethidden ? (
            <div
              className={"Rexcard"}
              style={{ width: '400px', maxWidth: "400px", minWidth: "300px", height: "400px" }}
            >
              <div id="Limit" className="tabcontent">
                <h3>Market Order</h3>
                <label style={{ color: "#ffffff" }} htmlFor="fname">
                  Order Size
                </label>
                <input
                  onChange={(e) => setorder_size(e.target.value)}
                  type="text"
                  id="fname"
                  name="order_size"
                  placeholder="size of order"
                ></input>
                <div
                  className={"flexbox-container"}
                  style={{ justifyContent: "center" }}
                >
                  <div
                    className={"buytab"}
                    style={{ justifyContent: "center" }}
                  >
                    <button
                      onClick={() => setorder_side("BUY")}
                      className={"tablinks"}
                    >
                      Buy
                    </button>
                  </div>
                  <div
                    className={"selltab"}
                    style={{ justifyContent: "center" }}
                  >
                    <button
                      onClick={() => setorder_side("SELL")}
                      className={"tablinks"}
                    >
                      Sell
                    </button>
                  </div>
                </div>
                <button
                  style={{ marginTop: "10px", color: "#ffffff" }}
                  className={"Form-button-input"}
                  onClick={() => Postacc()}
                >
                  <div>
                    {loading ? (
                      <Spin indicator={antIcon} className="add-spinner" />
                    ) : (
                      "Place Order"
                    )}
                  </div>
                </button>
              </div>
            </div>
          ) : (
            <></>
          )}

          {limithidden ? (
            <div
              className={"Rexcard"}
              style={{ maxWidth: "400px", width: "400px", height: "400px" }}
            >
              <div id="Limit" className="tabcontent">
                <h3>Limit Order</h3>
                <label style={{ color: "#ffffff" }} htmlFor="fname">
                  Order Price
                </label>
                <input
                  onChange={(e) => setorder_price(Number(e.target.value))}
                  type="text"
                  id="fname"
                  name="order_price"
                  placeholder="price of order"
                ></input>

                <label style={{ color: "#ffffff" }} htmlFor="fname">
                  Order Size
                </label>
                <input
                  onChange={(e) => setorder_size(e.target.value)}
                  type="text"
                  id="fname"
                  name="order_size"
                  placeholder="size of order"
                ></input>
                <div
                  className={"flexbox-container"}
                  style={{ justifyContent: "center" }}
                >
                  <div
                    className={"buytab"}
                    style={{ justifyContent: "center" }}
                  >
                    <button
                      onClick={() => setorder_side("BUY")}
                      className={"tablinks"}
                    >
                      Buy
                    </button>
                  </div>
                  <div
                    className={"selltab"}
                    style={{ justifyContent: "center" }}
                  >
                    <button
                      onClick={() => setorder_side("SELL")}
                      className={"tablinks"}
                    >
                      Sell
                    </button>
                  </div>
                </div>
                <button
                  style={{ marginTop: "10px", color: "#ffffff" }}
                  className={"Form-button-input"}
                  onClick={() => Postacc()}
                >
                  <div>
                    {loading ? (
                      <Spin indicator={antIcon} className="add-spinner" />
                    ) : (
                      "Place Order"
                    )}
                  </div>
                </button>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div
          className={"Rexcard"}
          style={{ paddingTop: "50px", marginTop: '50px', maxWidth: "400px", width: "400px", height: "500px" }}
        >
          <div className={"flexbox-vertical-container"}>
            <h1> Orderbook </h1>
            {bookcalled ? (
              <OrderBook
                book={{ bids: book?.bids, asks: book?.asks }}
                fullOpacity
                interpolateColor={(color: any) => color}
                listLength={100}
                stylePrefix={"MakeItNice"}
              />
            ) : (
              <OrderBook
                book={{ bids: testbook2?.bids, asks: testbook2?.asks }}
                fullOpacity
                interpolateColor={(color: any) => color}
                listLength={10}
                stylePrefix={"MakeItNice"}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Exchange;
