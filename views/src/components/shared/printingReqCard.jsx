import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./printingReqCard.css";
import { Link } from "react-router-dom";

export default function PringtingReqCard({ id, user_name, status }) {
  if (status === "Pending") {
    return (
      <Link
        to={`/printing-queue/printing-request/${id}`}
        className="d-flex justify-content-between align-items-center text-decoration-none card-hover rounded-pill mb-3 p-2 fs-4 w-75 border border-primary float-animation hover:bg-light-blue hover-overlay"
      >
        <p className="text-start ms-2 mb-0">Yêu cầu in {id}</p>
        <p className="m-0 fw-light fs-6 fst-italic">
          từ <span className="fw-bold">{user_name}</span>
        </p>
        <p className="text-end me-2 mb-0 fs-5 fw-semibold">{status}</p>
      </Link>
    );
  } else if (status === "Accepted") {
    return (
      <div className="d-flex justify-content-between align-items-center text-bg-success rounded-pill mb-3 p-2 fs-4 w-75 bg-success">
        <p className="ms-2 mb-0">Yêu cầu in {id}</p>
        <p className="m-0 fw-light fs-6 fst-italic">
          từ <span className="fw-bold">{user_name}</span>
        </p>
        <p className="me-2 mb-0 fs-5 fw-semibold">{status}</p>
      </div>
    );
  } else {
    return (
      <div className="d-flex justify-content-between align-items-center text-bg-danger rounded-pill mb-3 p-2 fs-4 w-75 bg-danger">
        <p className="ms-2 mb-0">Yêu cầu in {id}</p>
        <p className="m-0 fw-light fs-6 fst-italic">
          từ <span className="fw-bold">{user_name}</span>
        </p>
        <p className="me-2 mb-0 fs-5 fw-semibold">{status}</p>
      </div>
    );
  }
}
