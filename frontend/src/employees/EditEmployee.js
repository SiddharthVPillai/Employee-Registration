import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

let cur = 0;

const EditEmployee = () => {
  let navigate = useNavigate();

  const { employee_id } = useParams();
  const [dept, setDept] = useState([]);
  const [d, setD] = useState([]);
  useEffect(() => {
    loadDept();
  }, []);

  const loadDept = async () => {
    const result = await axios.get("http://localhost:8080/depts");
    setDept(result.data);
  };

  const loadCurr = async () => {
    console.log(d);
    const result = await axios.get(
      `http://localhost:8080/deptcap/${d.dept_id}`
    );
    // console.log(result.data);
    // setCurr(++result.data);
    cur = result.data + 1;
    console.log("res: ", result.data);
    console.log("from load ", cur, d.capacity);
    console.log("from load +1 ", cur + 1, d.capacity);
  };

  const [employees, setEmp] = useState({
    first_name: "",
    last_name: "",
    email: "",
    title: "",
    photograph_path: "",
    department: {},
  });

  const { first_name, last_name, email, title, photograph_path, department } =
    employees;
  const { dept_id, name, capacity } = department;

  const profile = async (file) => {
    const fd = new FormData();
    fd.append("file", file, file.name);
    await axios
      .post("http://localhost:8080/upload", fd)
      .then((res) => console.log(res));
  };

  const onIpchange = (e) => {
    if (e.target.name === "department") {
      let s = e.target.value;
      let dp = parseInt(s);
      setD(dept[dp - 1]);
      console.log(dept[dp - 1]);
      setEmp({ ...employees, [e.target.name]: dept[dp - 1] });
    } else if (e.target.name === "photograph_path") {
      let path = "http://localhost:8080/images/";

      path += e.target.files[0].name;
      profile(e.target.files[0]);
      console.log(path);

      setEmp({ ...employees, [e.target.name]: path });
    }
    //  else if (e.target.name === "photograph_path") {
    //   let s = e.target.value;
    //   let p = String(s);

    //   let l = p.length;
    //   console.log(l);
    //   let pos = l - 1;
    //   for (; pos >= 0; pos--) {
    //     if (p[pos] === "\\") break;
    //   }
    //   pos++;
    //   let im = "/image/";
    //   for (; pos < l; pos++) im += p[pos];
    //   console.log(im);
    //   setEmp({ ...employees, [e.target.name]: im});
    // }
    else setEmp({ ...employees, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await loadCurr();
    if (cur <= d.capacity) {
      console.log(employee_id);
      await axios.put(
        `http://localhost:8080/employee/${employee_id}`,
        employees
      );
      navigate("/");
    } else {
      // navigate("/err");
      alert("Department is already full");
    }
  };

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
          <h3>Edit Employee</h3>
          {/* col-md-6 offset-md-3 */}
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Title"
                  name="title"
                  value={title}
                  onChange={(e) => onIpchange(e)}
                />
              </div>
              <p>
                <label htmlFor="first-name" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter first name"
                  name="first_name"
                  value={first_name}
                  onChange={(e) => onIpchange(e)}
                />
              </p>
            </div>
            <div className="mb-3">
              <label htmlFor="last-Name" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter last name"
                name="last_name"
                value={last_name}
                onChange={(e) => onIpchange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                name="email"
                value={email}
                onChange={(e) => onIpchange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="photo" className="form-label">
                Photo
              </label>
              <input
                class="form-control"
                type="file"
                id="formFile"
                name="photograph_path"
                onChange={(e) => onIpchange(e)}
              />
            </div>
            {/* <div className="mb-3">
              <label htmlFor="photo" className="form-label">
                Photo
              </label>
              <input
                class="form-control"
                type="file"
                id="formFile"
                name="photograph_path"
                value={photograph_path}
                onChange={(e) => onIpchange(e)}
              />
            </div> */}
            <div className="mb-3">
              <label htmlFor="Department" className="form-label">
                Department
              </label>
              <div class="input-group mb-3">
                <label class="input-group-text" for="inputGroupSelect01">
                  Department
                </label>
                <select
                  class="form-select"
                  id="inputGroupSelect01"
                  name="department"
                  value={department}
                  onChange={(e) => onIpchange(e)}
                >
                  <option selected>{name}</option>
                  {dept.map((dep, ind) => (
                    <option>
                      {dep.dept_id} : {dep.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button type="submit" className="btn btn-success">
              Submit
            </button>
            <Link className="btn btn-danger mx-2" to="/">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};
export default EditEmployee;
