import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import axios from "axios";
import { useState, useEffect } from "react";
import PringtingReqCard from "../shared/printingReqCard";

const PringtingQueue = () => {
  const [printRequestList, setPrintRequestList] = useState([]);
  const [acceptRequestList, setAcceptRequestList] = useState([]);
  const [rejectRequestList, setRejectRequestList] = useState([]);
  const [buttonState, setButtonState] = useState([true, false, false]);

  const handleTabClick = (index) => {
    const newButtonStates = buttonState.map((state, i) => i === index);
    setButtonState(newButtonStates);
  };

  useEffect(() => {
    axios.get('/api/printRequest').then((res) => {
      if (res.status === 200) {
        console.log(res);
        setPrintRequestList(res.data.filter((req) => req.printing_status === 'Pending'))
        setAcceptRequestList(res.data.filter((req) => req.printing_status === 'Accepted'))
        setRejectRequestList(res.data.filter((req) => req.printing_status === 'Denied'))
      }
      else {
        console.log("Something happen");
      }
    }).catch((err) => {
      console.log(err);
    })
  }, [])

  return (
    <section className="container d-flex flex-column justify-content-center align-items-center mt-5">
      <p className="fs-2 fw-bold">Hàng chờ in</p>
      <ul className="nav nav-tabs my-3">
          <li className="nav-item">
            <div
              role="button"
              className={`mr-2 nav-link ${buttonState[0] ? "active" : ""}`}
              onClick={() => {
                handleTabClick(0);
              }}
            >
              Chờ phê duyệt
            </div>
          </li>
          <li className="nav-item">
            <div
              role="button"
              className={`mr-2 nav-link ${buttonState[1] ? "active" : ""}`}
              onClick={() => {
                handleTabClick(1);
              }}
            >
               Chấp nhận
            </div>
          </li>
          <li className="nav-item">
            <div
              role="button"
              className={`mr-2 nav-link ${buttonState[2] ? "active" : ""}`}
              onClick={() => {
                handleTabClick(2);
              }}
            >
              Từ chối
            </div>
          </li>
        </ul>
        {buttonState[0] && printRequestList.map((printingReq) => (
        <PringtingReqCard id={printingReq.print_request_id} user_name={printingReq.user_name} status={printingReq.printing_status} />
        ))}
        {buttonState[1] && acceptRequestList.map((printingReq) => (
        <PringtingReqCard id={printingReq.print_request_id} user_name={printingReq.user_name} status={printingReq.printing_status} />
        ))}
        {buttonState[2] && rejectRequestList.map((printingReq) => (
        <PringtingReqCard id={printingReq.print_request_id} user_name={printingReq.user_name} status={printingReq.printing_status} />
        ))}
    </section>
  );
};

export default PringtingQueue;
