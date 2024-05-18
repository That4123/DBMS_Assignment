import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import format from "date-fns/format";
import { IoIosSearch } from "react-icons/io";

const PrintingLog = () => {
  const [defaultPrintingLog, setDefaultPrintingLog] = useState([]);
  const [printingLog, setPrintingLog] = useState([]);
  const [searchType, setSearchType] = useState("");
  const [searchValue, setSearchValue] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchType==="end_time") {
      const newLog = defaultPrintingLog.filter((log) => {if (log[searchType].search(searchValue)!==-1) return true; return false})
      setPrintingLog(newLog);
    }
    else {
      const newLog = defaultPrintingLog.filter((log) => log[searchType].toString()===searchValue);
      setPrintingLog(newLog);
    }
  };

  useEffect(() => {
    axios
      .get("/api/printingLog")
      .then((res) => {
        if (res.status === 200) {
          setDefaultPrintingLog(res.data);
          setPrintingLog(res.data);
        } else {
          console.log("Something happen");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <section className="container d-flex flex-column justify-content-center align-items-center mt-5">
      <p className="fs-2 fw-bold">Lịch sử in ấn</p>
      <form className="d-flex flex-row mb-3" onSubmit={handleSubmit}>
        <p className="me-2 mb-0 mt-1">Tìm kiếm theo</p>
        <div>
          <select value={searchType} class="form-select" aria-label="Default select example" onChange={(e) => {setSearchType(e.target.value)}}>
            <option selected>Lựa chọn</option>
            <option
              value="user_name"
            >
              Người yêu cầu
            </option>
            <option
              value="printer_id"
            >
              Máy in
            </option>
            <option
              value="end_time"
            >
              Thời gian
            </option>
          </select>
        </div>
        <div>
          <input
            class="form-control ms-2"
            value={searchValue}
            type="text"
            placeholder="Nhập giá trị tìm kiếm"
            aria-label="default input example"
            onChange={(e) => {setSearchValue(e.target.value)}}
          ></input>
        </div>
        <button className="btn btn-outline-dark px-2 ms-3" type="submit">
          <IoIosSearch size={23}/>
        </button>
      </form>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Người yêu cầu</th>
            <th scope="col">Máy in</th>
            <th scope="col">Thời gian gửi</th>
            <th scope="col">Thời gian duyệt</th>
            <th scope="col">Số trang in</th>
            <th scope="col">Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {printingLog.map((log) => (
            <tr>
              <th scope="row">{log.log_id}</th>
              <td>{log.user_name}</td>
              <td>{log.printer_id}</td>
              <td>{format(new Date(log.start_time), "HH:mm:ss dd-MM-yyyy")}</td>
              <td>{format(new Date(log.end_time), "HH:mm:ss dd-MM-yyyy")}</td>
              <td>{log.num_of_page_to_print}</td>
              <td>{log.printing_status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default PrintingLog;
