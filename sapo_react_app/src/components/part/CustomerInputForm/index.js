import React, { Component } from "react";
import "date-fns";

// import { makeStyles } from '@material-ui/core/styles';
// import Input from '@material-ui/core/Input';
import InputLabel from "@material-ui/core/InputLabel";
// import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import "../../../App.css";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import Axios from "axios";
import { FormHelperText } from '@material-ui/core';

class CustomerInputForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      customerName: "",
      phone: "",
      email: "",
      // address: "",
      // gender: "",
      // dob: "",
      totalElements: 0,
      errors: {
        customerName: "",
        phone: "",
        email: "",
      },
    };
  }

  handleName = (e) => {
    e.preventDefault();
    this.setState({ customerName: e.target.value });
  };

  // handleNumber = (e) => {
  //   this.setState({ phone: e.target.value });
  // };

  // handleEmail = (e) => {
  //   this.setState({ email: e.target.value });
  // };

  // handleAddress = (e) => {
  //   this.setState({ address: e.target.value });
  // };

  // handlePick = (e) => {
  //   this.setState({ gender: e.target.value });
  // };

  // handleDate = (e) => {
  //   this.setState({ dob: e.target.value });
  // };

  componentDidMount = () => {
    Axios.request({
      url: `http://localhost:9090/api/admin/customer/all?page=0&size=20`,
      method: "GET",
    }).then((res) => {
      let item = res.data.data.totalElements;
      let newCustomer = item + 1;
      let customerCode = "CUSN0" + newCustomer;
      // console.log("ITEM", customerCode);
      this.setState({ customerCode: customerCode });
    });
  };

  handleClick = (e) => {
    let newCustomer = {
      customerName: this.state.customerName,
      phone: this.state.phone,
      email: this.state.email,
      // address: this.state.address,
      // gender: this.state.gender,
      // dob: this.state.dob,
      // customerCode: this.state.customerCode,
    };

    // console.log("KH moi info", newCustomer);

    // Axios.post("http://localhost:9090/api/admin/customer/upload", newCustomer)
    //   .then(() => {
    //     alert("Thêm khách hàng thành công");
    //   })
    //   .catch(() => {
    //     alert("Chưa thêm được khách hàng mới");
    //   });
  };

  render() {
    let { errors } = this.state;
    // console.log(errors);
    return (
      <div>
        <TextField
          required
          label="Tên khách hàng"
          id="outlined-required"
          variant="outlined"
          name="customerName"
          onChange={this.handleName}
          noValidate
          error="true"
          helperText="some thing wrong"
        >
          {errors.customerName.length > 0 && (
            <span className="error">{errors.customerName}</span>
          )}
        </TextField>
        <Button onClick={this.handleClick} variant="contained" color="primary">
          Update
        </Button>
      </div>
    );
  }
}

export default CustomerInputForm;
