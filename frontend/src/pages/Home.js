import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Home = () => {
  const [employees, setEmployee] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    loadEmployee();
  }, []);

  const loadEmployee = async () => {
    const result = await axios.get("http://localhost:8080/employees");
    setEmployee(result.data);
  };

  const deleteEmployee = async (id) => {
    await axios.delete(`http://localhost:8080/employee/${id}`);
    loadEmployee();
  };
  return (
    <div className="container">
      <div className="py-4">
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">Employee id</th>
              <th scope="col">Title</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Email</th>
              <th scope="col">Department</th>
              <th scope="col">Image</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => (
              <tr>
                <th scope="row" key={index}>
                  {employee.employee_id}
                </th>
                <td>{employee.title}</td>
                <td>{employee.first_name}</td>
                <td>{employee.last_name}</td>
                <td>{employee.email}</td>
                <td>{employee.department.name}</td>
                <td>
                  <img
                    src={employee.photograph_path}
                    style={{ height: "10rem", width: "10rem" }}
                    alt="profile"
                  />
                </td>
                <td>
                  <Link
                    className="btn btn-dark mx-2"
                    to={`/viewEmployee/${employee.employee_id}`}
                  >
                    View
                  </Link>
                  <Link
                    className="btn btn-info mx-2"
                    to={`/editEmployee/${employee.employee_id}`}
                  >
                    Edit
                  </Link>
                  <buttton
                    className="btn btn-danger mx-2"
                    onClick={() => deleteEmployee(employee.employee_id)}
                  >
                    Delete
                  </buttton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Home;
