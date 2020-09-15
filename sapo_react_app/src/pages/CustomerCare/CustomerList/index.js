import React, { Component } from "react";
import CTitle from "../../../components/pieces/Title";
import CSpacer from "../../../components/pieces/Spacer";
import CustomerTable from "../../../components/part/CustomerTable";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

class Customers extends Component {
  render() {
    return (
      <div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <CTitle>
            <h1>Danh sách khách hàng</h1>{" "}
          </CTitle>
          <div style={{margin:10}}>
            <Link to="/CustomerCare/AddNewCustomer">
              <Button variant="contained" color="primary">
                Thêm khách hàng mới
              </Button>
            </Link>
          </div>
        </div>
        <CustomerTable />
      </div>
    );
  }
}

export default Customers;
