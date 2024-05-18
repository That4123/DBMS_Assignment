import React from "react";
import LineChart from "./LineChart";
import axios from "axios";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useState, useEffect, useRef } from "react";
import { FiPrinter } from "react-icons/fi";
import ReactToPrint from "react-to-print";

Chart.register(CategoryScale);

const Report = () => {
  const componentRef = useRef(null);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [statistic, setStatistic] = useState({});
  

  useEffect(() => {
    axios
      .get("/api/printingLog")
      .then((res) => {
        if (res.status === 200) {
          // console.log(res)
          const tempData = res.data;
          // if (tempData.length === 0)
          //   {
          //     console.log('No information')
          //   }
          const arr = new Array(31).fill(0);
          for (let i = 0; i < 31; i++) {
            arr[i] = 0;
          }
          const tempStatistic = {
            total: 0,
            accept: 0,
            denied: 0,
            pending: 0,
          };
          for (let i in tempData) {
            tempStatistic.total = tempStatistic.total + 1;
            arr[Number(new Date(tempData[i]["end_time"]).getDate())]++;
            if (tempData[i]["printing_status"] === "Accepted")
              tempStatistic.accept = tempStatistic.accept + 1;
            else if (tempData[i]["printing_status"] === "Denied")
              tempStatistic.denied = tempStatistic.denied + 1;
            else tempStatistic.pending = tempStatistic.pending + 1;
          }
          setStatistic(tempStatistic);
          setData({
            labels: [
              1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
              20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
            ],
            datasets: [
              {
                label: "Print request",
                data: arr,
                fill: false,
                backgroundColor: "rgb(255, 99, 132)",
                borderColor: "black",
                borderWidth: 2,
                responsive: true,
              },
            ],
          });
          setLoading(false);
        } else {
          console.log("Something happen");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleGenerate = () => {

  }

  return (
    <section className="container d-flex flex-column justify-content-center align-items-center mt-5">
      <p className="fs-2 fw-bold">Báo cáo thống kê</p>
      {!loading ? (
        <div className="d-flex flex-row w-100">
          <div className="col-7" ref={componentRef}>
            <LineChart chartData={data} />
          </div>
          <div className="col ms-2">
            <div className="w-100 d-flex justify-content-end">
              <ReactToPrint 
                trigger={() => {
                  return (<button type="button" className="btn btn-light border border-1 py-2 px-3  mt-4 mb-5" onClick={handleGenerate}>
                  <FiPrinter />
                  <span className="ms-2">Xuất file</span></button>)
                }}
                content={() => componentRef.current}
                documentTitle="Printing request report"
                pageStyle="print"
              />
            </div>
            <div className="row mb-3 mt-4">
              <div className="col">
                <div className="card text-bg-primary">
                  <div class="card-header">Tổng yêu cầu</div>
                  <div class="card-body">
                    <h5 class="card-title">{statistic.total}</h5>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card text-bg-success">
                  <div class="card-header">Lượt chấp nhận</div>
                  <div class="card-body">
                    <h5 class="card-title">{statistic.accept}</h5>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div className="card text-bg-danger">
                  <div class="card-header">Lượt từ chối</div>
                  <div class="card-body">
                    <h5 class="card-title">{statistic.denied}</h5>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card text-bg-warning">
                  <div class="card-header">Yêu cầu đang chờ</div>
                  <div class="card-body">
                    <h5 class="card-title">{statistic.pending}</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </section>
  );
};

export default Report;
