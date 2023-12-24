import { Link } from "react-router-dom";

const Err = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center bg-dark"
      style={{ height: "100vh", width: "100%" }}
    >
      <div className="container">
        <div className="row">
          <h2 className="bg-dark" style={{ color: "red", margin: "0" }}>
            The department is full
          </h2>
        </div>
        <div className="row justify-content-center align-items-center">
          <div className="col-4">
            <Link className="btn btn-success" to="/">
              Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Err;
