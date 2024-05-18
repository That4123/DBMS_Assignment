import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const PrintingRequest = () => {
  const [buttonState, setButtonState] = useState([true, false, false]);
  const {request_id} = useParams();
  const [request, setRequest] = useState({});
  const navigate = useNavigate();

  const handleTabClick = (index) => {
    const newButtonStates = buttonState.map((state, i) => i === index);
    setButtonState(newButtonStates);
  };

  const handleButtonClick = (type) => {
    axios.post(`/api/printRequest/${request_id}`, {type: type}).then((res) => {
      navigate('/printing-queue')
    }
    ).catch((err) => {
      console.log(err);
    })
  }

  useEffect(() => {
    axios.get(`/api/printRequest/${request_id}`).then((res) => {
      if (res.status === 200) {
        console.log(res)
        setRequest(res.data[0]);
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
      <div className="w-100">
        <div className="d-flex justify-content-between">
        <p className="mb-1 fs-2 fw-bold">Yêu cầu in {request.request_id}</p>
        <div>
          <button type="button" className="p-2 me-3 btn btn-danger" onClick={() => {handleButtonClick('Denied')}}>Từ chối</button>
          <button type="button" className="p-2 btn btn-success" onClick={() => {handleButtonClick('Accepted')}}>Chấp nhận</button>
        </div>
        </div>
        <div className="border-top border-dark-subtle"></div>
      </div>
      <div className="w-100">
        <p className="mt-2 fs-3 fw-bold">File in</p>
        <p className="fs- fw-semibold">{request.file_name}</p>
      </div>
      <div className="w-100">
        <p className="mt-2 fs-3 fw-bold">Thông tin</p>
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <div
              role="button"
              className={`mr-2 nav-link ${buttonState[0] ? "active" : ""}`}
              onClick={() => {
                handleTabClick(0);
              }}
            >
              Máy in
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
              Người yêu cầu
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
              Cấu hình
            </div>
          </li>
        </ul>
        {buttonState[0] && (<ul class="list-group list-group-flush">
          <li class="list-group-item fw-bold">ID: {request.printer_id}</li>
          <li class="list-group-item">Trạng thái: {request.printer_status}</li>
          <li class="list-group-item">Thương hiệu: {request.brand}</li>
          <li class="list-group-item">Tên máy: {request.model}</li>
          <li class="list-group-item">Cơ sở: {request.campusName}</li>
          <li class="list-group-item">Tòa: {request.buildingName}</li>
          <li class="list-group-item">Phòng: {request.roomNumber}</li>
          <li class="list-group-item">Miêu tả: {request.description}</li>
        </ul>)}
        {buttonState[1] && (<ul class="list-group list-group-flush">
          <li class="list-group-item fw-bold">ID: {request.user_id}</li>
          <li class="list-group-item">Họ và tên: {request.user_name}</li>
          <li class="list-group-item">Email: {request.email}</li>
        </ul>)}
        {buttonState[2] && (<ul class="list-group list-group-flush">
          <li class="list-group-item">Cỡ giấy: {request.paper_size}</li>
          <li class="list-group-item">Số trang in: {request.pages_to_print}</li>
          <li class="list-group-item">In hai mặt: {request.is_double_side ? 'Có' : 'Không'}</li>
          <li class="list-group-item">Số bản in: {request.number_of_copies}</li>
          <li class="list-group-item">Loại in: {(request.print_type === 'color') ? 'In màu' : 'In trắng đen'}</li>
        </ul>)}
      </div>
    </section>
  );
};

export default PrintingRequest;
