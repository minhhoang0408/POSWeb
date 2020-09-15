import React, { Component } from "react";
import CTitle from "../../components/pieces/Title";
import CSpacer from "../../components/pieces/Spacer";
import Axios from "axios";
import { Card } from "antd";
import CommentModal from "../../components/part/CommentModal";
import RenderFeedback from "../../components/pieces/RenderFeedback";
import ModalUpdate from "../../components/part/ModalUpdate";
import Tooltip from "@material-ui/core/Tooltip";
import BillTable from "../../components/part/BillTable";
import DeleteCustomer from "./deleteCustomer";
import { Link } from "react-router-dom";
import ChevronLeftTwoToneIcon from "@material-ui/icons/ChevronLeftTwoTone";

// import TableControl from "../../components/part/CustomerTable/TableControls";

class CustomerDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      requesting: false,
      listInQueue: false,
      customerId: null,
      customerInfo: null,
      customerFeedback: null,
      TableHeader: ["Thời gian phản hồi", "Nội dung phản hồi", ""],
      list: [],
      totalElements: "",
      page: "",
      size: "",
      result: "",
      openPopup: false,
    };
  }

  componentDidMount() {
    let state = this.state;
    let customerId = new URLSearchParams(window.location.search).get("id");
    this.setState({ customerId });
    this.callFeedbackList(state);
    this.callCustomerInfo(state);
    this.callCustomerFeedback(state);
  }

  setPageConfig = (config) => {
    this.setState(config);
  };

  callCustomerInfo = () => {
    let customerId = new URLSearchParams(window.location.search).get("id");

    Axios.request({
      url: `http://localhost:9090/api/admin/customer/${customerId}`,
      method: "GET",
    }).then((res) => {
      let item = res.data.data;
      this.setState({ customerInfo: item });
    });
  };

  callFeedbackList = () => {
    this.setState({ requesting: true });
    let customerId = new URLSearchParams(window.location.search).get("id");
    // let { page, size } = state;
    let queryParams = {
      page: 0,
      size: 5,
    };
    Axios.request({
      url: `http://localhost:9090/api/admin/feedback/customer/?id=${customerId}`,
      method: "GET",
      params: queryParams,
    })
      .then((res) => {
        let totalElements = res.data.data.totalElements || 0;
        this.setState({ totalElements: totalElements });
        // console.log("totalElement",totalElements)
      })
      .finally(() => {
        this.setState({ requesting: false });
      });
  };

  callCustomerFeedback = () => {
    let customerId = new URLSearchParams(window.location.search).get("id");

    let queryParams = {
      page: 0,
      size: 5,
    };
    Axios.request({
      url: `http://localhost:9090/api/admin/feedback/customer/?id=${customerId}`,
      method: "GET",
      params: queryParams,
    }).then((res) => {
      let result = res.data.result;
      // console.log(result);
      this.setState({ result: result });
      if (result === "not found") {
        this.setState({
          customerFeedback: "Khách hàng chưa để lại phản hồi nào",
        });
      } else {
        let list = res.data.data.content;
        this.setState({ customerFeedback: list });
      }
    });
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
      this.callCustomerFeedback(newState);
    }
  }

  render() {
    let {
      customerInfo,
      customerId,
      customerFeedback,
      TableHeader,
      result,
      // totalElements,
      // page,
      // size,
    } = this.state;
    // console.log("feedback khách hàng", result);
    return customerInfo ? (
      <div>
        <div
        // style={{ display: "flex", justifyContent: "space-around" }}
        >
          <CTitle>
            <Link to="/CustomerCare/CustomerList">
              <span>
                {" "}
                <ChevronLeftTwoToneIcon />
                Danh sách khách hàng{" "}
              </span>
            </Link>
            <h2>
              <span> {customerInfo.customerName} </span>
            </h2>
          </CTitle>
        </div>

        <div
        // style={{ display: "flex", justifyContent: "space-around" }}
        >
          <Card
            style={{
              width: "100%",
              minHeight: 200,
              // margin: "auto",
              // marginTop: 64,
              // padding: "10px",
              // textAlign: "center",
            }}
            bordered={true}
          >
            <CTitle>
              <h3>Thông tin cá nhân</h3>
            </CTitle>
            <CSpacer />

            <div className="row" style={{ marginRight: "10px" }}>
              <div className="col-sm">
                {customerInfo.customerName === "" ? (
                  <div>
                  <span>
                  Tên khách hàng 
                  </span>
                  <span>
                  : ---
                  </span>
                  </div>
                ) : (
                  <div> <span>
                  Tên khách hàng :
                  </span> 
                  <b>
                   {customerInfo.customerName}
                  </b> 
                  </div>
                )}
                <div><span>
                Mã khách hàng :
                </span> <b>
                 {customerInfo.customerCode}
                </b>
                </div>
              </div>
              <div className="col-sm" style={{ marginRight: "20px" }}>
                {customerInfo.gender === null ? (
                  <div><span>
                  Giới tính
                  </span> 
                  <span>
                  : ---
                  </span> </div>
                ) : (
                  <div>
                  <span>
                  Giới tính :
                  </span>
                  <b>
                   {customerInfo.gender}
                  </b>  
                  </div>
                )}
                {customerInfo.email === null ? (
                  <div><span>
                  Email 
                  </span>
                  <span>
                  : ---
                  </span> </div>
                ) : (
                  <div><span>
                  Email :
                  </span>
                  <b>
                   {customerInfo.email}
                  </b> 
                   </div>
                )}
              </div>
              <div className="col-sm">
                <div>
                <span>
                Số điện thoại :
                </span> <b>
                 {customerInfo.phone}
                </b> 
                </div>
                {customerInfo.dob === null ? (
                  <div>
                  <span>
                  Sinh nhật
                  </span>
                   <span>
                   : ---
                   </span></div>
                ) : (
                  <div>
                  <span>
                  Sinh nhật :
                  </span>
                  <b>
                   {customerInfo.dob}
                  </b>
                 </div>
                )}
              </div>
            </div>
            <CSpacer />
            <div style={{ textAlign: "right" }}>
              <div style={{ display: "inline-block", paddingRight: "10px" }}>
                <DeleteCustomer />
              </div>
              <div style={{ display: "inline-block" }}>
                <ModalUpdate />
              </div>
            </div>
          </Card>

          <div style={{ width: "100%", paddingTop: "50px" }}>
            <Card>
              <CTitle>
                <h3>Phản hồi khách hàng</h3>
              </CTitle>
              <CSpacer />
              {result === "found" ? (
                <div>
                  <RenderFeedback
                    list={customerFeedback}
                    header={TableHeader}
                  />
                  <Tooltip title="Thêm feedback khách hàng" arrow>
                    <CommentModal customerId={customerId} />
                  </Tooltip>
                </div>
              ) : (
                <div>
                  <h7>{customerFeedback}</h7>
                  <CSpacer />
                  <Tooltip title="Thêm feedback khách hàng" arrow>
                    <CommentModal customerId={customerId} />
                  </Tooltip>
                  <CSpacer></CSpacer>
                </div>
              )}
            </Card>
          </div>
          <div style={{ paddingTop: "50px" }}>
            <Card>
              <CTitle>
                <h3>Lịch sử mua hàng</h3>
              </CTitle>
              <CSpacer />
              <BillTable />
            </Card>
          </div>
        </div>
      </div>
    ) : (
      <div>
        <CTitle>Không có khách hàng nào có Id như trên</CTitle>
        <CSpacer />
      </div>
    );
  }
}

export default CustomerDetail;
