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
import {useParams} from 'react-router-dom';
function ViewPrinterInfomation () {
    const {PrinterId} = useParams();
    const [printers, setPrinters] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [removePrinterId, setRemovePrinterId] = useState(null);
    const [selectedPrinter,setSelectedPrinter] = useState()
    const [printerStatus, setPrinterStatus] = useState()
    const [reFresh, setReFresh] = useState(0)
    const [message, setMessage] = useState()
    const [editContent, setEditContent] = useState({
    brand: '',
    model: '',
    description: '',
    campusName: '',
    roomNumber: '',
    buildingName: '',
    printer_id:'',
  })
    
    const navigate = useNavigate();
    useEffect(() => {
        // lấy danh sách máy in từ backend
        axios.post('/api/viewPrinterInfo/', {printer_id: parseInt(PrinterId)})
          .then(response => setSelectedPrinter(response.data.printer))
          .catch(error => console.error('Error fetching printers:', error));
      }, [reFresh]);
      useEffect(() => {
        if (selectedPrinter) {
          setPrinterStatus(selectedPrinter.printer_status);
        }
      }, [selectedPrinter]);
    const handleConfirmRemove = (id) => {
      //Thực hiện việc xoá máy in thông qua id máy in
      //
      axios.post('/api/viewPrinterInfo/remove', {printer_id: id})
      .then(response => console.log(response.data.message))
      .catch(error => console.error('Error fetching printers:', error));
      //Trả về trang View All Printer
      navigate('/viewAllPrinter')
    }
    const handleSaveClick = (printer) => {
      // Thực hiện lưu thông tin máy in, ví dụ: gọi API để cập nhật thông tin máy in
      axios.post('/api/viewPrinterInfo/edit', printer)
      .then(response => { console.log(response.data.message)
        setReFresh(prevKey => prevKey + 1);
        console.log('Đã lưu thông tin máy in:', printer.printer_id);
        setMessage(null)
        // Kết thúc chế độ chỉnh sửa
      setIsEditing(false);
      })
      .catch(error => {
        console.error('Error fetching printers:', error); 
      setMessage(error.response.data.message)

    });
     
      
    };
    const handleChangeStatus = (printer) => {
      if (printerStatus === 'Đang hoạt động') {
        setPrinterStatus('Không hoạt động')
      axios.post('/api/viewPrinterInfo/disable', {printer_id: printer.printer_id})
      .then(response => console.log(response.data.message))
      .catch(error => console.error('Error fetching printers:', error));
      //local render
      }
      else {
        setPrinterStatus('Đang hoạt động')
        axios.post('/api/viewPrinterInfo/enable', {printer_id: printer.printer_id})
      .then(response => console.log(response.data.message))
      .catch(error => console.error('Error fetching printers:', error));
      }
      


    }
    const handleEditClick = (printer) => {
      let editPrinter = {
        brand: printer.brand,
        model: printer.model,
        description: printer.description,
        campusName: printer.campusName,
        roomNumber: printer.roomNumber,
        buildingName: printer.buildingName,
        printer_id: printer.printer_id
    };
      setReFresh(prevKey=>prevKey+1)
      setEditContent(editPrinter);
      setIsEditing(true);

    };
    const handleRemovePrinter =(id)=>{
      setRemovePrinterId(id);
    }
    const handleReturnBack= () => {
      navigate('/viewAllPrinter')
    }
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setEditContent((prevPrinter) => ({ ...prevPrinter, [name]: value }));
    };
    
    
    return (
      <div>
        {selectedPrinter&&(
          <div className='view-information'>
            <h1>Thông tin máy in {selectedPrinter.printer_id}</h1>
            <i className='ti-printer'></i>
            <div className='printer-information'>
              <div>
                <label>Printer ID:</label> {selectedPrinter.printer_id}
              </div>
              <div>
                <label>Thương hiệu:</label> {isEditing ? (
                <input type="text" name="brand" value={editContent.brand} onChange={handleInputChange} />
                ) : (
                  <span>{selectedPrinter.brand}</span>
                )}
              </div>
              <div>
                <label>Loại máy in:</label> {isEditing ? (
                <input type="text" name="model" value={editContent.model} onChange={handleInputChange} />
                ) : (
                  <span>{selectedPrinter.model}</span>
                )}
              </div>
              <div>
                <label>Cơ sở:</label> {isEditing ? (
                <select name="campusName" value={editContent.campusName} onChange={handleInputChange}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                </select>
                ) : (
                  <span>{selectedPrinter.campusName}</span>
                )}
              </div>
              <div>
                <label>Toà:</label> {isEditing ? (
                  <input type="text" name="buildingName" value={editContent.buildingName} onChange={handleInputChange} />
                ) : (
                  <span>{selectedPrinter.buildingName}</span>
                )}
              </div>
              <div>
                <label>Phòng:</label> {isEditing ? (
                  <input type="text" name="roomNumber" value={editContent.roomNumber} onChange={handleInputChange} />
                ) : (
                  <span>{selectedPrinter.roomNumber}</span>
                )}
              </div>
              <div>
                <label>Mô tả:</label> {isEditing ? (
                  <input type="text" name="description"  value={editContent.description} onChange={handleInputChange} />
                ) : (
                  <span>{selectedPrinter.description}</span>
                )}
              </div>
              <div>
                <label>Trạng thái:</label> 
                  <div className='Edit-status'>
                    <span>{printerStatus}</span>
                    <button  className ='btn1' onClick={() => handleChangeStatus(selectedPrinter)}>
                      {printerStatus ==='Đang hoạt động' ? 'Tắt' : 'Bật'}
                    </button>
                  </div>
              </div>
              <p>{message ? message: ''}</p>
              {isEditing ? (
                  <button className= "btn1" onClick={() => handleSaveClick(editContent)}>Lưu</button>
                ) : (
                  <button className= "btn1" onClick={() => handleEditClick(selectedPrinter)}>Chỉnh sửa</button>
                )}
              
              <button className='btn1' onClick={()=>handleReturnBack()}>Trở về</button>
              <button className= "btn1 huy" onClick={()=> handleRemovePrinter(selectedPrinter.printer_id)}> Xoá</button>
              
            </div>
          </div>
        )}
        {removePrinterId && (
        <div className='overlay'>  
        <div className="confirm-dialog">
          <div className="confirm-content">
          <i className='ti-alert'></i>
            <i>Cảnh báo</i>
            <p>Bạn có chắc chắn muốn xoá máy in này?</p>
            <button className = "btn1 huy"onClick={()=>handleConfirmRemove(selectedPrinter.printer_id)}>Xác nhận</button>
            <button className= "btn1 "onClick={()=> setRemovePrinterId(null)}>Không</button>
          </div>
        </div>
        </div>
      )}
      </div>
    );
}
export default ViewPrinterInfomation;