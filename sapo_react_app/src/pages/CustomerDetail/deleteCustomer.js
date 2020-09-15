import React, { Component } from "react";
import { Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import Tooltip from "@material-ui/core/Tooltip";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { Alert } from "@material-ui/lab";

class DeleteCustomer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      customerId: null,
      customerInfo: null,
      customerName: "",
      phone: "",
      email: "",
      address: "",
      gender: "",
      dob: "",
      createOn: "",
      deleted: false,
      open: false,
      err: "",
    };
  }

  componentDidMount() {
    let customerId = new URLSearchParams(window.location.search).get("id");
    this.setState({ customerId: customerId });

    axios
      .request({
        url: `http://localhost:9090/api/admin/customer/${customerId}`,
        method: "GET",
      })
      .then((res) => {
        let customerInfo = res.data.data;
        this.setState({ customerInfo: customerInfo });
        this.setState({ customerName: customerInfo.customerName });
        this.setState({ phone: customerInfo.phone });
        this.setState({ email: customerInfo.email });
        this.setState({ address: customerInfo.address });
        this.setState({ gender: customerInfo.gender });
        this.setState({ dob: customerInfo.dob });
        this.setState({ createOn: customerInfo.createOn });
      });
  }

  handleClick = () => {
    let deleteCustomer = {
      customerId: this.state.customerId,
      customerName: this.state.customerName,
      phone: this.state.phone,
      email: this.state.email,
      address: this.state.address,
      gender: this.state.gender,
      dob: this.state.dob,
      createOn: this.state.createOn,
      deleted: true,
    };
    // console.log("xoá KH", deleteCustomer);

    axios
      .put("http://localhost:9090/api/admin/customer/update", deleteCustomer)
      .then(() => {
        this.setState({ open: true });
        window.location.replace("/CustomerCare/CustomerList");
      })
      .catch((err) => {
        this.setState({ open: true, err: err });
      });
  };

  handleClose = (e, reason) => {
    e.preventDefault();
    if (reason === "clickaway") {
      return;
    }
    this.setState({ open: false });
  };

  render() {
    let { open, err } = this.state;
    // console.log("err",err)
    return (
      <div>
        <Button variant="outlined" onClick={this.handleClick} color="secondary">
          Xoá
        </Button>
        {err ? (
          <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={this.handleClose}
          >
            <Alert onClose={this.handleClose} severity="error">
              Không thể xoá khách hàng
            </Alert>
          </Snackbar>
        ) : (
          <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={this.handleClose}
          >
            <Alert onClose={this.handleClose} severity="success">
              Xoá khách hàng thành công
            </Alert>
          </Snackbar>
        )}
      </div>
    );
  }
}

export default DeleteCustomer;
