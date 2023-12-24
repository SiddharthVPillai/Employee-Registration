import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../layout/Navbar";
import Home from "./Home";
import AddEmployee from "../employees/AddEmployee";
import EditEmployee from "../employees/EditEmployee";
import ViewEmployee from "../employees/ViewEmployee";
import axios from "axios";
import Err from "./Err";

const Login = () => {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [success, setSuccess] = useState(false);
  const [login, setLogin] = useState([]);
  const [invalid, setInvalid] = useState(false);

  useEffect(() => {
    loadLogin();
  }, []);

  const loadLogin = async () => {
    const result = await axios.get("http://localhost:8080/login");
    setLogin(result.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //const result = await axios.get("http://localhost:8080/login");

    //setLogin(result.data);
    //console.log(result.data);
    if (login[0].user === user && login[0].password === pass) {
      setInvalid(false);
      setSuccess(true);
    } else setInvalid(true);
  };

  if (invalid) {
    return (
      <>
        <h2 className="bg-dark" style={{ color: "red", margin: "0" }}>
          Invalid user id or password
        </h2>
        <div
          className="d-flex justify-content-center align-items-center bg-dark"
          style={{ height: "100vh", width: "100%" }}
        >
          <div className="container">
            <div className="row">
              <div className="  border rounded p-4 mt-2 shadow">
                <form onSubmit={handleSubmit}>
                  <h3 style={{ color: "cyan" }}>Admin Login</h3>
                  <div className="mb-3">
                    <label
                      htmlFor="username"
                      className="form-label"
                      style={{ color: "white" }}
                    >
                      Username
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Enter username"
                      onChange={(e) => setUser(e.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="form-label"
                      style={{ color: "white" }}
                    >
                      Password
                    </label>
                    <input
                      className="form-control"
                      type="password"
                      placeholder="Enter Password"
                      onChange={(e) => setPass(e.target.value)}
                    />
                  </div>
                  <button className="btn btn-success mt-3">Login</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {!success ? (
        <div
          className="d-flex justify-content-center align-items-center bg-dark"
          style={{ height: "100vh", width: "100%" }}
        >
          <div className="container">
            <div className="row">
              <div className="  border rounded p-4 mt-2 shadow">
                <form onSubmit={handleSubmit}>
                  <h3 style={{ color: "cyan" }}>Admin Login</h3>
                  <div className="mb-3">
                    <label
                      htmlFor="username"
                      className="form-label"
                      style={{ color: "white" }}
                    >
                      Username
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Enter username"
                      onChange={(e) => setUser(e.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="form-label"
                      style={{ color: "white" }}
                    >
                      Password
                    </label>
                    <input
                      className="form-control"
                      type="password"
                      placeholder="Enter Password"
                      onChange={(e) => setPass(e.target.value)}
                    />
                  </div>
                  <button className="btn btn-success mt-3">Login</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Router>
          <Navbar />
          {/* <Home /> */}
          {/* <Login /> */}
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/addEmployee" element={<AddEmployee />} />
            <Route
              exact
              path="/editEmployee/:employee_id"
              element={<EditEmployee />}
            />
            <Route
              exact
              path="/viewEmployee/:employee_id"
              element={<ViewEmployee />}
            />
            <Route exact path="/err" element={<Err />} />
          </Routes>
        </Router>
      )}
    </>
  );
};
export default Login;
