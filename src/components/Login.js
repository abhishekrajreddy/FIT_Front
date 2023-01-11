import React, { useState } from "react";
import axios from "axios";
import setAuthToken from "./setAuthToken";
import jwtDecode from "jwt-decode";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const onHandleChange = (e) => {
    setErrorMsg("");
    if (e.target.name == "email") setEmail(e.target.value);
    if (e.target.name == "password") setPassword(e.target.value);
  };

  const onLogin = async (e) => {
    let login_data;
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg("Please Fill The Required Information");
    } else {
      setErrorMsg("");
      // console.log("Login Success");
      login_data = {
        email,
        password,
      };
      onLoginAPI(login_data);
    }
  };

  const onLoginAPI = (data) => {
    console.log(data);
    // axios
    //   .post("http://localhost:5000/register", data)
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    axios
      .post("http://localhost:5000/login", data)
      .then((res) => {
        // if (res.status == 200) {
        const { token } = res.data;
        setAuthToken(token);
        const userData = jwtDecode(token);
        localStorage.setItem("user", token);
        // dispatch(onLoginSuccess(userData))
        console.log("userData");
        console.log(userData);
        props.history.push("/dashboard");
        // }
        // else{
        //     dispatch(onLoginFailure(res.response.data.msg))
        // }
      })
      .catch((err) => {
        setErrorMsg("Invalid User");
        console.log(err.response.data.msg);
        // dispatch(onLoginFailure(err.response.data.msg))
      });
  };
  // export const onRegister = (newUser, history) => {
  //   return (dispatch) => {
  //     axios
  //       .post("http://localhost:5000/register", newUser)
  //       .then((res) => {
  //         if (res.status == 200) {
  //           // console.log(res)
  //           dispatch(onRegisterSuccess(res.data.msg));
  //         }
  //       })
  //       .catch((err) => {
  //         // console.log(err.response.data.msg)
  //         dispatch(onRegisterFailure(err.response.data.msg));
  //       });
  //   };
  // };
  return (
    <div>
      <div className="container w-50 border border-secondary  mt-5">
        <h1 className="text-center">Login</h1>
        <form className="p-5" onSubmit={onLogin}>
          {errorMsg.length > 0 ? (
            <span className="text-danger">{errorMsg}</span>
          ) : (
            ""
          )}
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
                name="email"
                placeholder="Enter Email Address"
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
                name="password"
                value={password}
                onChange={(e) => onHandleChange(e)}
              />
            </div>
          </div>
          <div className="col-sm-12 mb-3">
            <small>
              New User? Click here to{" "}
              <a className="" href="/register">
                Register
              </a>
            </small>
          </div>
          <div className="col-sm-12 text-center">
            <button type="submit" class="col-sm-12 btn btn-primary">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
