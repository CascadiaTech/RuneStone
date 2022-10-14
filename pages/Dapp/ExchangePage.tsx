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

  const sortedbidsorderlist: any[] = [];
  const sortedasksorderlist: any[] = [];
  //const [chart, setchart] = useState(html)
  const [book, setbook] = useState(Object);
  const [orderonbook, setorderonbook] = useState<any[]>([]);
  const [devmodeactive, setdevmodactive] = useState(true);
  const [ishidden, setishidden] = useState(Boolean);
  const [orderbook, setorderbook] = useState<any[]>([]);
  const [order_side, setorder_side] = useState(String);
  const [order_size, setorder_size] = useState(Number);
  const [orderplaced, setorderplaced] = useState(Boolean);
  const [TradingPair, setasset_market] = useState(String);
  const [order_price, setorder_price] = useState(Number);
  const [order_variant, setorder_variant] = useState(String);
  const [limithidden, setislimithidden] = useState(false);
  const [cancelhidden, setiscancelhidden] = useState(false);
  const [markethidden, setismarkethidden] = useState(false);
  const [cancelorderid, setcancelorderid] = useState(Number);

  function ChartComponent() {
    return (
      <AdvancedChart
        widgetProps={{
          symbol: "BITMEX:ETHUSDT",
          theme: "dark",
        }}
      />
    );
  }

  const Chart = useMemo(() => ChartComponent(), [orderbook]);

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
    if (order_size == 0 ) {
      Swal.fire({
        icon: "error",
        title: " Please fill in all fields before submitting",
        text: "You cannot submit an order with no order size",
      });
      return;
    }
    if (order_side == "LIMIT" && !order_price) {
      Swal.fire({
        icon: "error",
        title: " Please fill in all fields before submitting",
        text: "You must submit a price with a limit order",
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
            ? sortedbidsorderlist.push(element.order_price) &&
            //sortedbidsorderlist.sort((a: number, b: number) => a - b) &&
            bidsorderlist.push([
                JSON.stringify(element.order_price),
                element.order_size,
              ]) //&& bidsize.push(element.order_size)
            : asksorderlist.push([
                JSON.stringify(element.order_price),
                element.order_size,
              ]); //&& asksize.push(element.order_size)
        });
        //asks[n].sort((a, b) => a - b)
        const bidbook = await asksorderlist.reverse();
        //for (let i = 0; i < bidbook.length; i++) {
       //   console.log(bidbook[i][0])
        //  sortedbidsorderlist.push([bidbook[i][0]])
        //  console.log(sortedbidsorderlist.sort((a, b) => a - b))
        //}
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

  useEffect(() => {
    orderbook.forEach((element: any) => {
      element.address === account
        ? orderonbook.push(element._id.toString())
        : console.log("customer has no orders");
    });
  }, [orderbook]);

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
        className="sm:flex flex-row mt-20 md:flex-row..."
        style={{ color: "#000000", justifyContent: "left", paddingTop: "50px"}}
      >
          
          <div
            style={{ justifyContent: "center", marginTop: '50px' }}
            className="sm:mt-48 flex flex-col w-screen md:flex flex-col w-screen"
          >
            {Chart}
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
          <div className="flex flex-col justify-center md:flex flex-row justify-center mb-48">
          <div className="mt-48 bg-[#070F15] block p-6 text-center w-96 h-fit bg-white  border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <div className=" mb-10 justify-center py-2 flex flex-row...">
              
              <button
                onClick={() => handlemarketclick()}
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Market Order
              </button>
              <button
                onClick={() => handlelimitclick()}
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Limit Order
              </button>
            </div>
            <label style={{ color: "#ffffff" }} htmlFor="fname">
              Order Price
            </label>
            {markethidden ? (
              <input
                type="text"
                id="disabled-input"
                aria-label="Choose limit order to change price"
                className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value=""
                disabled
              ></input>
            ) : (
              <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) => { if (Number(e.target.value) > 0) {setorder_price(Number(e.target.value))}}}
                type="number"
                id="fname"
                name="order_price"
                placeholder="price of order"
              ></input>
            )}
            <label style={{ color: "#ffffff" }} htmlFor="fname">
              Order Size
            </label>
            <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(e) => { if (Number(e.target.value) > 0) {setorder_size(Number(e.target.value))}}}
              type="number"
              id="fname"
              name="order_size"
              placeholder="size of order"
            ></input>
            <div className="flex flex-col justify-center">
            <div
              className="flex flex-row..."
              style={{ justifyContent: "center" }}
            >
              <div className={"buytab"} style={{ justifyContent: "center" }}>
                <button
                  onClick={() => setorder_side("BUY")}
                  className={"tablinks"}
                >
                  Buy
                </button>
              </div>
              <div className={"selltab"} style={{ justifyContent: "center" }}>
                <button
                  onClick={() => setorder_side("SELL")}
                  className={"tablinks"}
                >
                  Sell
                </button>
              </div>
              </div>
              <button type="button" onClick={() => Postacc()} className=" m-4 border-2 border-slate-200 text-white bg-transparent hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
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
        </div>
        <a href="#" className="mt-48 bg-[#070F15] block p-6 text-center w-96 h-fit bg-white  border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
    <h5 className="mb-2 text-center justify-center text-2xl font-bold tracking-tight text-white dark:text-white">OrderBook</h5>
    <p className="font-normal text-gray-700 dark:text-gray-400">{bookcalled ? (
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
            )}</p>
</a>
      </div>
    </>
  );
};

export default Exchange;
