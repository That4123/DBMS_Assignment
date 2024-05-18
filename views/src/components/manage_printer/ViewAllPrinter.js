// client/src/App.js
import React from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link, NavLink, Outlet, Navigate, useNavigate } from "react-router-dom";
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios'
import { useState, useEffect } from "react";
import Header from '../shared/header';
import Cookies from "universal-cookie";
import './ViewAllPrinter.css'
import '../../styles/themify-icons/themify-icons.css';
import { useParams } from 'react-router-dom';

const cookies = new Cookies();

function ViewAllPrinter() {
  const [printers, setPrinters] = useState([]);
  const navigate = useNavigate();
  const [reFresh, setReFresh] = useState(0)
  const [message,setMessage] = useState(null)
  const [message2,setMessage2] = useState(null)
  const [removePrinterId, setRemovePrinterId] = useState(null);
  const [filter, setFilter] = useState()
  const [searchCriteria, setSearchCriteria] = useState({
    printer_id: '',
    campusName: '',
    buildingName: '',
    roomNumber: '',
    printer_status: ''
  });
  const [addNewPrinter, setAddNewPrinter] = useState(null);
  const [newPrinterContent, setNewPrinterContent] = useState({
    brand: '',
    model: '',
    description: '',
    campusName: '1',
    roomNumber: '',
    buildingName: '',
    printer_status: 'Không hoạt động',
  });
  const resetForm = () => {
    setNewPrinterContent({
      brand: '',
      model: '',
      description: '',
      campusName: '1',
      roomNumber: '',
      buildingName: '',
      printer_status: 'Không hoạt động',
    });
  };
  useEffect(() => {
    // lấy danh sách máy in từ backend
    axios.post('/api/viewAllPrinter')
      .then(response => {
        setPrinters(response.data)
        if(response.data.length === 0) setPrinters(null)
      })
      .catch(error => console.error('Error fetching printers:', error));
  }, [reFresh]); 
  //Hàm lưu thông tin máy in 
  const handleSaveNewPrinter = (printer) =>{
    // nội dung máy in mới được lưu trong newPrinterContent
    console.log(printer)
    axios.post('/api/viewAllPrinter/add', printer)
  .then(response => {
    // Xử lý khi lệnh POST thành công
    console.log(response.data.message);
    
    // Thực hiện các hành động cần thiết khi thành công
    setReFresh(prev => prev + 1);
    resetForm();
    setMessage(null);
    console.log('Thêm máy in thành công');
    setAddNewPrinter(null);
  })
  .catch(error => {
    // Xử lý khi lệnh POST không thành công
    setMessage(error.response.data.message);
    console.error('Lỗi khi thêm máy in:', error.response.data.message);
  });
  }
  //Hàm handleToggle dùng để switch trạng thái máy in
  const handleToggle = (printer) => {
      if (printer.printer_status==="Đang hoạt động") {
        // disable
        axios.post('/api/viewAllPrinter/disable', printer)
      .then(response =>console.log(response.data.message))
      .catch(error => console.error('Error fetching printers:', error));
      }
      else {
        //enable
        axios.post('/api/viewAllPrinter/enable', printer)
        .then(response =>console.log(response.data.message))
        .catch(error => console.error('Error fetching printers:', error));
      }
      setReFresh(prev=>prev+1)
  };
  const handleConfirmRemove = (id) => {
    //Thực hiện việc xoá máy in thông qua id máy in
    //
    axios.post('/api/viewAllPrinter/remove', {printer_id: id})
    .then(response => console.log(response.data.message))
    .catch(error => console.error('Error fetching printers:', error));
    //Trả về trang View All Printer
    setRemovePrinterId(null)
    setReFresh(prev=>prev+1)

  }
  const handleSearch = () => {
    // Thực hiện tìm kiếm dựa trên searchCriteria

    setFilter(1);
    axios.post('/api/viewAllPrinter/search', searchCriteria)
  .then(response => {
    // Xử lý khi lệnh POST thành công
    setPrinters(response.data);
    console.log(response.data.message);
    setMessage2(null)
    // Thực hiện các hành động cần thiết khi thành công
    console.log('Tìm kiếm máy in thành công');

  })
  .catch(error => {
    // Xử lý khi lệnh POST không thành công
    setMessage2(error.response.data.message);
    setPrinters(null);
    console.error('Lỗi khi thêm máy in:', error.response.data.message);
  });

  };
  const setColorByStatus = (status)=> {
    const colorMap = {
        'Đang hoạt động': 'Green',
        'Không hoạt động': 'Red',
    };
    return {backgroundColor: `${colorMap[status]}`};
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchCriteria((prevCriteria) => ({ ...prevCriteria, [name]: value }));
  };
  const handleAddNewPrinter =() => {
     setAddNewPrinter(1)
  };
  const handleViewDetail = (PrinterId) => {
   navigate(`/ViewPrinterInformation/${PrinterId}`);
  };
  const handleInputChangeNewPrinter = (e) => {
    const { name, value } = e.target;
    setNewPrinterContent((prevCriteria) => ({ ...prevCriteria, [name]: value }));
  };
  const handleCancel = () => {
    resetForm()
    setMessage(null)
    setAddNewPrinter(null)

  };
  const handleRemovePrinter =(id)=>{
    setRemovePrinterId(id);
  }
  const handleClearFilter =() =>{
    setFilter(null)
    setReFresh(prev=>prev+1)
  }
    
    return (
    <div >
      <h1 style={{color: "black", marginLeft: "40%"}}>Danh sách máy in</h1>
      <div>
        <button className='btn add-btn' onClick={()=>handleAddNewPrinter()}>
          <i className='ti-plus'></i>
          Add new printer
        </button>
        <div className='search-box'>
      <label>
        Printer ID: 
        <input type="text"name="printer_id" placeholder = 'Eg: 123' value={searchCriteria.id} onChange={handleInputChange}/>
      </label>
      <label>
        Campus:
        <select name="campusName" value={searchCriteria.campusName} onChange={handleInputChange}>
        <option value="">All</option>
          <option value="1">1</option>
          <option value="2">2</option>
        </select>
      </label>
      <label>
        Building Name:
        <input type="text"name="buildingName" placeholder='Eg: B1' value={searchCriteria.buildingName} onChange={handleInputChange}/>
      </label>
      <label>
        Room Number:
        <input type='text' name="roomNumber" placeholder='Eg: 301' value={searchCriteria.roomNumber} onChange={handleInputChange}/>
      </label>
      <label>
        Status:
        <select name="printer_status" value={searchCriteria.printer_status} onChange={handleInputChange}>
          <option value="">All</option>
          <option value="Đang hoạt động">On</option>
          <option value="Không hoạt động">Off</option>
        </select>
      </label>
      <button  onClick={handleSearch}> <i className='ti-filter'></i> Filter</button>
        </div>
        {filter? <button  className='close-filter' onClick={handleClearFilter}> <i className='ti-close'></i> Clear Filter </button>: ''}
      </div>
      {printers?(
        <div>
      <ul className='Printer-List'>
        {printers.map(printer => (
          <li key={printer.id} className='Printer-Block'>
            <i className='ti-printer'></i>
            <p id='Printer-header'> Printer ID: {printer.printer_id}</p>
            <div className='status-dot' style={setColorByStatus(printer.printer_status)}></div>
            <div className='Printer-body'>
              Campus: {printer.campusName}<br></br> 
              Building: {printer.buildingName} <br></br>
              Room: {printer.roomNumber} <br></br>
              Status: {printer.printer_status==='Đang hoạt động' ? 'On' : 'Off'}
            </div>
            <button  className ='Switch-status-btn' onClick={() => handleToggle(printer)}>
              {printer.printer_status ==='Đang hoạt động' ? 'Disable' : 'Enable'}
            </button>
            <button className='Switch-status-btn' onClick={()=>handleViewDetail(printer.printer_id)}>
              Detail
            </button>
            <button className='delete-btn' onClick={()=>handleRemovePrinter(printer.printer_id)}>
              <i className='ti-trash'/> Delete Printer
            </button>
            
          </li>
        ))}
      </ul>
      </div>
      ):
        <p id='error-message2'> {message2?message2:'Hiện không có máy in nào trong danh sách'} </p>
      }
      {removePrinterId && (
        <div className='overlay'>  
        <div className="confirm-dialog">
          <div className="confirm-content">
            <i className='ti-alert'></i>
            <i>Cảnh báo</i>
            <p>Bạn có chắc chắn muốn xoá máy in này?</p>
            <button className = "btn1 huy"onClick={()=>handleConfirmRemove(removePrinterId)}>Xác nhận</button>
            <button className= "btn1 "onClick={()=> setRemovePrinterId(null)}>Không</button>
          </div>
        </div>
        </div>
      )}

      {addNewPrinter&&(
        <div className='overlay'>
          <div className='confirm-dialog'>
          <h5>Thêm máy in mới</h5>
          <i className='ti-printer'></i>
          <div className='Add-printer-form'>
              <div>
                <label>Thương hiệu:</label>
                <input type="text" name="brand" value={newPrinterContent.brand} placeholder='Canon'  onChange={handleInputChangeNewPrinter} />
              </div>
              <div>
                <label>Mẫu máy:</label>
                <input type="text" name="model" value={newPrinterContent.model} placeholder='LPB 3060'  onChange={handleInputChangeNewPrinter} />
              </div>
              <div>
                <label>Mô tả:</label>
                <input type="text" name="description" value={newPrinterContent.description} placeholder='Mới, mực còn'  onChange={handleInputChangeNewPrinter} />
              </div>
              <div>
                <label>Cơ sở:</label>
                <select name="campusName" value={newPrinterContent.campusName} onChange={handleInputChangeNewPrinter}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                </select>
              </div>
              <div>
                <label>Toà:</label>
                <input type="text" name="buildingName" value={newPrinterContent.buildingName} placeholder='H6'  onChange={handleInputChangeNewPrinter} />
              </div>
              <div>
                <label>Phòng:</label>
                <input type="text" name="roomNumber" value={newPrinterContent.roomNumber} placeholder='602'  onChange={handleInputChangeNewPrinter} />
              </div>
              <div>
              <label>Trạng thái:</label>
                <select name="printer_status" value={newPrinterContent.printer_status} onChange={handleInputChangeNewPrinter}>
                  <option value="Không hoạt động">Không hoạt động</option>
                  <option value="Đang hoạt động">Đang hoạt động</option>
                </select>
              </div>
                <p>{message? message : '' }</p>
                <button className='btn1 huy' onClick={()=> handleCancel()}>Huỷ</button>
                <button className='btn1' onClick={()=> handleSaveNewPrinter(newPrinterContent)}>Thêm</button>
          </div>  
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewAllPrinter;
