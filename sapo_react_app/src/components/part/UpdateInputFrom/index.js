import React, { Component } from "react";
import "date-fns";
// import { makeStyles } from '@material-ui/core/styles';
// import Input from '@material-ui/core/Input';
import InputLabel from "@material-ui/core/InputLabel";
// import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
// import Grid from '@material-ui/core/Grid';
// import AccountCircle from '@material-ui/icons/AccountCircle';
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import "../../../App.css";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import Axios from "axios";

class CustomerInputForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      customerId: null,
      customerName: "",
      phone: "",
      email: "",
      address: "",
      gender: "",
      dob: "",
      totalElements: 0,
    };
  }
  handleName = (e) => {
    e.preventDefault();
    this.setState({ customerName: e.target.value });
  };

  handleNumber = (e) => {
    this.setState({ phone: e.target.value });
  };

  handleEmail = (e) => {
    this.setState({ email: e.target.value });
  };

  handleAddress = (e) => {
    this.setState({ address: e.target.value });
  };

  handlePick = (e) => {
    this.setState({ gender: e.target.value });
  };

  handleDate = (e) => {
    this.setState({ dob: e.target.value });
  };

  componentDidMount = () => {
    let customerId = new URLSearchParams(window.location.search).get("id");
    // console.log(customerId);
    this.setState({ customerId });
    let customerCode = "KH" + customerId
    this.setState({customerCode})
    Axios.request({
      url:`http://localhost:9090/api/admin/customer/${customerId}`,
      method:"GET"
    }).then((res)=>{
      let item = res.data.data
      let {customerName,phone,email,address,gender,dob} = item
      this.setState({customerName})
      this.setState({phone})
      this.setState({email})
      this.setState({address})
      this.setState({gender})
      this.setState({dob})
    })
    
  };

  handleClick = () => {
    // let { customerId } = this.state;
    // console.log("id kh",customerId)
    let newCustomer = {
      customerId:this.state.customerId,
      customerName: this.state.customerName,
      phone: this.state.phone,
      email: this.state.email,
      address: this.state.address,
      gender: this.state.gender,
      dob: this.state.dob,
      customerCode: this.state.customerCode,
      deleted:false
    };
    // console.log("KH moi info", newCustomer);

    Axios.put("http://localhost:9090/api/admin/customer/update",newCustomer)
      .then(() => {
        alert("Chỉnh sửa thông tin khách hàng thành công");
        window.location.reload()
      })
      .catch((error) => {
        alert("Chưa chỉnh sửa được thông tin khách hàng mới",error);
      });
  };

  render() {
    let { customerId } = this.state;
    // console.log(customerId);
    return (
      <div>
        <FormControl
          fullWidth
          className="form-input"
          variant="outlined"
          style={{ margin: "10px" }}
          required
        >
          <InputLabel htmlFor="outlined-adornment-amount">Tên Khách Hàng</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            // startAdornment={<InputAdornment position="start"></InputAdornment>}
            labelWidth={130}
            // placeholder="Ex : Nguyễn Văn A "
            value={this.state.customerName}
            onChange={this.handleName}
          />
        </FormControl>
        <br />

        <FormControl
          fullWidth
          className="form-input"
          variant="outlined"
          style={{ margin: "10px" }}
          required
        >
          <InputLabel htmlFor="outlined-adornment-amount">Số điện thoại</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            // startAdornment={<InputAdornment position="start"></InputAdornment>}
            labelWidth={110}
            type="number"
            // placeholder="Ex : 0123456789"
            value={this.state.phone}
            onChange={this.handleNumber}
          />
        </FormControl>
        <br />

        <FormControl
          fullWidth
          className="form-input"
          variant="outlined"
          style={{ margin: "10px" }}
        >
          <InputLabel htmlFor="outlined-adornment-amount">Email</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            // startAdornment={<InputAdornment position="start"></InputAdornment>}
            labelWidth={60}
            value={this.state.email}
            // placeholder="Ex : abc@cde.com.vn"
            onChange={this.handleEmail}
          />
        </FormControl>
        <br />

        <FormControl
          fullWidth
          className="form-input"
          variant="outlined"
          style={{ margin: "10px" }}
        >
          <InputLabel htmlFor="outlined-adornment-amount">Địa chỉ</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            // startAdornment={<InputAdornment position="start"></InputAdornment>}
            labelWidth={60}
            value={this.state.address}
            // placeholder="Ex : Street A, CityB, Country C,...."
            onChange={this.handleAddress}
          />
        </FormControl>
        <br />

        <FormControl
          className="form-input"
          component="fieldset"
          style={{ margin: "10px" }}
        >
          <FormLabel component="legend">Giới tính</FormLabel>
          <RadioGroup
            aria-label="gender"
            name="gender1"
            value={this.state.gender}
            onChange={this.handlePick}
          >
            <FormControlLabel value="Nam" control={<Radio />} label="Nam" />
            <FormControlLabel value="Nữ" control={<Radio />} label="Nữ" />
            <FormControlLabel value="Khác" control={<Radio />} label="Khác" />
          </RadioGroup>
        </FormControl>
        <br />

        <form noValidate style={{ margin: "0px 10px 30px 10px " }}>
          <FormLabel style={{ marginTop: "7px" }}>
            Sinh nhật khách hàng
          </FormLabel>
          <TextField
            id="date"
            type="date"
            defaultValue="2017-05-24"
            InputLabelProps={{
              shrink: true,
            }}
            value={this.state.dob}
            onChange={this.handleDate}
            style={{
              marginLeft: "10px",
            }}
          />
        </form>

        <Link to="/CustomerCare/CustomerList">
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleClick}
          >
            Cập nhật
          </Button>
        </Link>
      </div>
    );
  }
}

export default CustomerInputForm;
