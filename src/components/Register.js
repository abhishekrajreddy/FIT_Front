import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from 'axios'



function Register(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useHistory();

  const onHandleChange = (e) => {
    setErrorMsg("");
    if (e.target.name == "firstName") setFirstName(e.target.value);
    if (e.target.name == "lastName") setLastName(e.target.value);
    if (e.target.name == "email") setEmail(e.target.value);
    if (e.target.name == "password") setPassword(e.target.value);
    if (e.target.name == "confirmPassword") setConfirmPassword(e.target.value);
  };

  const onRegister = (e) => {
    let register_data;
    e.preventDefault();
    if (!email || !password || !firstName || !lastName || !confirmPassword) {
      setErrorMsg("Please Fill The Required Information");
    } else if (password !== confirmPassword) {
      setErrorMsg("Please check the password");
    } else {
      console.log("Register Success");
      register_data = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      };
      onRegisterAPI(register_data);
    }
  };

  const onRegisterAPI = (data) => {
    console.log(data);
    axios
      .post("http://localhost:5000/register", data)
      .then((res) => {
        console.log("success");
        console.log(res);
        props.history.push("/login");
      })
      .catch((err) => {
        console.log(err);
        setErrorMsg(err.response.data.msg)
      });
  };

  return (
    <div>
      <div className="container w-50 border border-secondary mt-5">
        <h1 className="text-center">Register</h1>
        <form className="p-5" onSubmit={onRegister}>
          {errorMsg.length > 0 ? (
            <span className="text-danger">{errorMsg}</span>
          ) : (
            ""
          )}
          <div className="form-group">
            <label for="firstName" className="col-sm-12 col-form-label">
              First Name
            </label>
            <div className="col-sm-12">
              <input
                type="text"
                readonly
                className="form-control"
                id="firstName"
                value={firstName}
                name={"firstName"}
                placeholder="Enter First Name"
                onChange={(e) => onHandleChange(e)}
              />
            </div>
          </div>
          <div className="form-group">
            <label for="lastName" className="col-sm-12 col-form-label">
              Last Name
            </label>
            <div className="col-sm-12">
              <input
                type="text"
                readonly
                className="form-control"
                id="lastName"
                value={lastName}
                name={"lastName"}
                placeholder="Enter Last Name"
                onChange={(e) => onHandleChange(e)}
              />
            </div>
          </div>
          <div className="form-group">
            <label for="staticEmail" className="col-sm-12 col-form-label">
              Email
            </label>
            <div className="col-sm-12">
              <input
                type="text"
                readonly
                className="form-control"
                id="staticEmail"
                value={email}
                placeholder="Enter Email Address"
                name={"email"}
                onChange={(e) => onHandleChange(e)}
              />
            </div>
          </div>
          <div className="form-group ">
            <label for="inputPassword" className="col-sm-12 col-form-label">
              Password
            </label>
            <div className="col-sm-12">
              <input
                type="password"
                className="form-control"
                id="inputPassword"
                placeholder="Password"
                value={password}
                name={"password"}
                onChange={(e) => onHandleChange(e)}
              />
            </div>
          </div>
          <div className="form-group ">
            <label
              for="inputConfirmPassword"
              className="col-sm-12 col-form-label"
            >
              Confirm Password
            </label>
            <div className="col-sm-12">
              <input
                type="password"
                name="confirmPassword"
                className="form-control"
                id="inputConfirmPassword"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => onHandleChange(e)}
              />
            </div>
          </div>
          <div className="col-sm-12 mb-3">
            <small>
              Already registered? Click here to{" "}
              <a className="" href="/login">
                Login
              </a>
            </small>
          </div>
          <div className="col-sm-12 form-group text-center ">
            <button type="submit" class="col-sm-12 btn btn-primary">
              Register
            </button>
          </div>
        </form>
        {/* <div className="row justify-content-center text-center ">
          <button
            type="submit"
            class="col-sm-8 btn btn-primary"
            onClick={(e) => onRegister(e)}
          >
            Register
          </button>
        </div> */}
      </div>
    </div>
  );
}

export default Register;
