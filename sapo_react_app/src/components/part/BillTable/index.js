import React, { Component } from "react";
import BTable from "../../pieces/BillTable";
import axios from "axios";

class BillTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      requesting: false,
      listInQueue: false,
      customerId: null,
      customerBill: null,
      TableHeader: [
        "Mã đơn hàng",
        "Giá trị đơn hàng",
        // "Discount",
        "Nhận vào",
        "Trả lại",
        "Ghi chú",
        "Ngày tạo đơn"
      ],
      list: [],
      totalElements: "",
      page: "",
      size: "",
      result: "",
    };
  }

  componentDidMount() {
    let state = this.state;
    let customerId = new URLSearchParams(window.location.search).get("id");
    this.setState({ customerId });
    this.callCustomerBill(state);
  }

  setPageConfig = (config) => {
    this.setState(config);
  };

  componentWillUpdate(newProps, newState) {
    let oldState = this.state;
    let mustCallList = false;
    // let mustCallCount = false;
    if (newState.page !== oldState.page) {
      mustCallList = true;
    }
    if (newState.size !== oldState.size) {
      mustCallList = true;
    }
    if (mustCallList) {
      this.callCustomerBill(newState);
    }
  }

  callCustomerBill = () => {
    this.setState({ requesting: true });
    let customerId = new URLSearchParams(window.location.search).get("id");
    let queryParams = {
      page: 0,
      size: 5,
    };
    axios
      .request({
        url: `http://localhost:9090/api/admin/bill/customer?id=${customerId}`,
        method: "GET",
        params: queryParams,
      })
      .then((res) => {
        let result = res.data.result;
        // console.log(result);
        this.setState({ result: result });
        if (result === "not found") {
          this.setState({
            customerBill: "Khách hàng chưa thực hiện giao dịch nào",
          });
        } else {
          let list = res.data.data.content;
          this.setState({ customerBill: list });
        }
      });
  };

  render() {
    let { TableHeader, customerBill, result } = this.state;
    // console.log(customerBill);
    return (
      <div className="c-table-group">
        {result === "found" ? (
          <div>
            <BTable header={TableHeader} list={customerBill} />
          </div>
        ) : (
          <div>
            <h7>{customerBill}</h7>
          </div>
        )}
      </div>
    );
  }
}

export default BillTable;
