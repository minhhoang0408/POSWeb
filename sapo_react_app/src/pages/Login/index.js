/* eslint-disable react/jsx-no-undef */
import React, { Component } from "react";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";

import Typography from "@material-ui/core/Typography";
import { message } from "antd";
import axios from "axios";

import Container from "@material-ui/core/Container";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      usernameError: false,
      passwordError: false,
      usernameErrorMess: "",
      passwordErrorMess: "",
      error: false,
      errorMess: "",
    };
  }
  onChange = (e) => {
    var error = e.target.name + "Error";
    this.setState({ [e.target.name]: e.target.value, [error]: false ,error:false});
  };
  onLogin = (e) => {
    e.preventDefault();
    if ((this.state.username === "") | (this.state.password === "")) {
      if (this.state.username === "") {
    
        this.setState({
          usernameError: true,
          usernameErrorMess: "Vui lòng nhập tên đăng nhập",
        });
      }
      if (this.state.password === "") {
    
        this.setState({
          passwordError: true,
          passwordErrorMess: "Vui lòng nhập mật khẩu",
        });
      }
    } else {
      axios
        .post("http://localhost:9090/api/admin/app-user/login", {
          username: this.state.username,
          password: this.state.password,
        })
        .then((res) => {
          if (
            res.data.data === "Invalid Authentication Information not existed"
          ) {
            message.error("Tên đăng nhập/mật khẩu không đúng");
            this.setState({
              error: true,
            });
          } else {
            sessionStorage.setItem("user", JSON.stringify(res.data.data));
            sessionStorage.setItem("siderNumber",null)
            sessionStorage.setItem("siderNumber1",null)
            window.location.replace("/");
          }
        });
    }
  };
  render() {
    return (
      <Container
        component="main"
        maxWidth="sm"
        style={{
          marginTop: "10%",
          border: "1px solid",
          padding: "30px 50px",
          borderRadius: "5px",
          textAlign: "center",
        }}
      >
        <CssBaseline />
        <div>
          <Typography component="h1" variant="h5">
            Đăng Nhập
          </Typography>
          <form noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Tên Đăng Nhập"
              name="username"
              onChange={this.onChange}
              error={this.state.error | this.state.usernameError}
              autoComplete="username"
              autoFocus
            />
            {this.state.usernameError?(<div style={{textAlign:"left",color: "red"}}>{this.state.usernameErrorMess}</div>):""}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Mật Khẩu"
              type="password"
              id="password"
              error={this.state.error | this.state.passwordError}
              onChange={this.onChange}
              autoComplete="current-password"
            />
                     {this.state.passwordError?(<div style={{textAlign:"left",color: "red"}}>{this.state.passwordErrorMess}</div>):""}
            {this.state.error |
            this.state.passwordError |
            this.state.usernameError ? (
              <div style={{ color: "red", marginBottom: "10px" }}>
                {this.state.errorMess}
              </div>
            ) : (
              ""
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className="btn btn-block"
              onClick={this.onLogin}
              style={{
                marginTop: " 10px",
                border: "hidden",
                backgroundColor: "rgb(42,211,139)",
                borderRadius: "20px",
                width: "150px",
                cursor: "pointer",
              }}
            >
              Đăng Nhập
            </Button>
          </form>
        </div>
      </Container>
    );
  }
}
export default Login;
