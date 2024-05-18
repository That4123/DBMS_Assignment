import "./file_upload.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import {useState, useEffect } from "react";
import Modal from 'react-modal'
import axios from "axios";

function FileUpload({ sharedState, setSharedState }){
    const [selectedFileName, setSelectedFileName] = useState('Chưa có file được chọn');
    const [permittedFileType, setPermittedFileType] = useState([])
    const getExtension = (filename) => {
        return filename.split('.').pop()
      }
    const [errorMessage, setErrorMessage] = useState(null);
    const [checkFileType, setCheckFileType] = useState(true);
    const [checkFileSize, setCheckFileSize] = useState(true);
    const [fileType, setFileType] = useState("")
    const handleChange = (event,name) => setSharedState(name, event.target.value);
    useEffect(() => {
        axios.get('/api/uploadFile/permittedFileType')
          .then((respond) => {
            setPermittedFileType(respond.data.list)
          })
          .catch((error) => {
            console.error("Error!!!!!!", error)
          })
      }, []);
    const handleFileChange = (event) => {
        const files = event.target.files;
        const obj = {file_type: getExtension(files[0].name), file_size: files[0].size}
        axios.post("/api/uploadfile/permittedFileType", {
            obj,
          })
              .then((response) => {
                  console.log(response.data.message)
                  if (response.data.message === "Loại tệp tin không hợp lệ"){
                    event.target.files = null;
                    setCheckFileType(false);
                  }
                  else if (response.data.message === "Kích thước tệp đạt quá giới hạn"){
                    event.target.files = null;
                    setCheckFileSize(false);
                    setFileType(obj.file_type)
                  }
                  else {
                    setSharedState('file_name', files[0].name);
                    setSharedState('file_path', files[0].name);
                    setSelectedFileName(files[0].name);
                    handleChange(event,"file_path");
                  }
                    
              })
              .catch((error) => {
                if (error.response) {
                  setErrorMessage(error.response.data.message);
                }
              })
    
    };
    const handleToClose = () => {
        setCheckFileType(true);
        setCheckFileSize(true);
    };
    return(
        <div>
            <div className="mb-3" style = {{margin: "45px"}}>
                <div className="input-group">
                    <label className="input-group-text" htmlFor="formFileMultiple">
                    Chọn file
                    </label>
                    <input
                    type="file"
                    className="form-control"
                    id="formFileMultiple"
                    multiple
                    onChange={(e)=>{handleFileChange(e);}}
                    style={{ display: 'none' }}
                    />
                    <span className="input-group-text" style = {{minWidth: '400px', backgroundColor: 'white'}}>{sharedState.file_name !=='' ? sharedState.file_name : selectedFileName}</span>
                </div>
            </div>
            <Modal
                isOpen={!checkFileType}
                contentLabel="Example Modal"
                onRequestClose={handleToClose}
                className={"popup-complete-config"} overlayClassName={"complete-config-ctn"}
                ariaHideApp={false}
            >
                <div>Thông báo</div>
                <div>Loại tệp tin không hợp lệ</div>
                <div>Các loại tệp tin hợp lệ: </div>
                <div style = {{display: 'flex', justifyContent: 'space-around', width: '50%', marginLeft: '25%'}}>
                    {permittedFileType.map((fileType, index) => (
                        <div key={index}>{fileType.file_type}</div>
                    ))}
                </div>
            </Modal>
            <Modal
                isOpen={!checkFileSize}
                contentLabel="Example Modal"
                onRequestClose={handleToClose}
                className={"popup-complete-config"} overlayClassName={"complete-config-ctn"}
                ariaHideApp={false}
            >
                <div>Thông báo</div>
                <div>Kích thước đã đạt quá giới hạn 
                {permittedFileType.map((file_Type, index) => (
                  <div key={index}>
                    {file_Type.file_type === fileType && (
                      <div>
                        Loại file {file_Type.file_type} được phép kích thước tối đa {file_Type.max_file_size} MB
                      </div>
                    )}
                  </div>
                ))}
                </div>
                
               
            </Modal>
</div>
        )
}
export default FileUpload;