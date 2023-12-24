import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const ViewEmployee = () => {
  const { employee_id } = useParams();
  const [employee, setEmp] = useState({
    first_name: "",
    last_name: "",
    email: "",
    title: "",
    photograph_path: "",
    department: {},
  });
  const { first_name, last_name, email, title, photograph_path, department } =
    employee;

  useEffect(() => {
    loadEmployee();
  }, []);
  const loadEmployee = async () => {
    const result = await axios.get(
      `http://localhost:8080/employee/${employee_id}`
    );
    setEmp(result.data);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="  border rounded p-4 mt-2 shadow">
          <h3>Employee Detail</h3>
          <div className="card">
            <div className="card-header">
              Employee id : {employee_id}
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <img
                    style={{
                      height: "25rem",
                      width: "25rem",
                      borderRadius: "10px",
                    }}
                    src={photograph_path}
                    alt="profile"
                  />
                </li>
                <li className="list-group-item">
                  <b>Title: </b>
                  {title}
                </li>
                <li className="list-group-item">
                  <b>First Name: </b>
                  {first_name}
                </li>
                <li className="list-group-item">
                  <b>Last Name: </b>
                  {last_name}
                </li>
                <li className="list-group-item">
                  <b>Email: </b>
                  {email}
                </li>
                <li className="list-group-item">
                  <b>Department: </b>
                  {department.name}
                </li>
              </ul>
            </div>
          </div>
          <Link className="btn btn-dark my-2" to={"/"}>
            Go Back
          </Link>
        </div>
      </div>
    </div>
  );
};
export default ViewEmployee;
