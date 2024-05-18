import './App.css';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link, NavLink, Outlet } from "react-router-dom";
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Header from './components/shared/header'
import Homepage from './components/homepage/homepage';
import NoPage from './components/nopage/nopage';
import SignIn from './components/signin/signin'
import axios from 'axios'
import PrivateRoutes from './components/shared/private_routes';
import ProtectedTest from './components/(test_only)protected_test/protected_test';
import PublicTest from './components/(test_only)public_test/public_test';
import SignUp from './components/signup/signup';
import PringtingQueue from './components/printing-queue/printing-queue';
import ViewAllPrinter from './components/manage_printer/ViewAllPrinter';
import ViewPrinterInformation from './components/manage_printer/ViewPrinterInformation'
import FileUpload from './components/print_file/file_upload/file_upload.js';
import ChoosePrinter from './components/print_file/choose_printer/choose_printer.js';
import PrintFile from './components/print_file/print_file/print_file.js'
import PrintingRequest from './components/printing-request/printingRequest.jsx';
import ViewPermittedFileType from './components/permitted_file_type/ViewPermittedFileType';
import PrintingStatus  from './components/printing_status/printing_status';
import PrintingLog from './components/printing-log/printing-log.jsx';
import BuyPaper from './components/buyPage/buyPaper.js';
import Report from './components/report/report.jsx';
function App() {
  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route index element={<Homepage />} />
        <Route path='signin' element={<SignIn />} />
        <Route path='signup' element={<SignUp />} />
        <Route path='printFile' element={<PrintFile />} />
        <Route path='printingStatus' element={<PrintingStatus/>} />
        <Route path='publicTest' element={<PublicTest />} />
        <Route path='buyPaper' element={<BuyPaper />} />
        <Route element={<PrivateRoutes validateRole={"spso"} />} >
          <Route path='protectedTest' element={<ProtectedTest />} />
          <Route path='printing-queue' element={<PringtingQueue />} />
          <Route path='printing-queue/printing-request/:request_id' element={<PrintingRequest />} />
          <Route path='printing-log' element={<PrintingLog />} />
          <Route path='report' element={<Report />} />
        </Route>
        <Route path='viewAllPrinter' element={<ViewAllPrinter />} />
        <Route path='viewPrinterInformation/:PrinterId' element={<ViewPrinterInformation />} />
        <Route path='viewPermittedFileType' element={<ViewPermittedFileType />} />
        <Route path="*" element={<NoPage />} />
      </Route>
    </Routes>
  );
}

export default App;

