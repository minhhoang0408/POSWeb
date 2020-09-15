import React from "react";
import { Row, Input, Table, Col, Space } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import '../BillList/index.css';
import Pagination from 'react-js-pagination';
import axios from 'axios';
const { Search } = Input;

export default class BillList extends React.PureComponent {
  constructor (props) {
    super(props);
    this.state = {
      data: [],
      searchText: "",
      page: {
        activePage: 1, 
        itemsCountPerPage: 8,
        totalItemsCount: 0,
        pageRangeDisplayed: 4,
        
      },
    };
  }
  

  componentDidMount() {
    //
    this.getAllBill();
  }

  getAllBill = async () => {

    const {activePage, itemsCountPerPage} = this.state.page;
    await axios({
      method: 'get',
      url: `http://localhost:9090/api/admin/bill/all?page=${activePage-1}&size=${itemsCountPerPage}`
    }).then(
      res => {
        console.log("res", res);
        if(res.data.result === "found"){
          console.log("total",res.data.data.totalElements);
          this.setState({data: res.data.data.content, page: {...this.state.page, totalItemsCount: res.data.data.totalElements}})
        }else{
          console.log("Not found");
        }
      }
    ).catch(error => {
      console.log(error);
    })

  }

   searchBill = (event) => {
    console.log(event.target.value);
    let config = {
      code: event.target.value,
      page: 0,
      size: 8
    }

    axios({
      method: "get",
      url: `http://localhost:9090/api/admin/bill?code=${config.code}&page=${config.page}&size=${config.size}`
    }).then(
      res => {
        console.log("res", res);
        if(res.data.result === "found"){
          console.log("total",res.data.data.totalElements);
          this.setState({data: res.data.data.content, page: {...this.state.page, totalItemsCount: res.data.data.totalElements}})
        }else{
          console.log("Not found");
          this.setState({data: [], page: {...this.state.page, totalItemsCount: res.data.data.totalElements}})
        }
      }
    ).catch(error => {
      console.log(error);
    })
    
  };

  onChangePage = async (data) => {
    console.log("data", data);
    const {itemsCountPerPage} = this.state.page;
    // this.props.location.replace(
    //   `http://localhost:9090/api/admin/bill/all?page=${data-1}&size=${itemsCountPerPage}`
    // )
    await axios({
      method: 'get',
      url: `http://localhost:9090/api/admin/bill/all?page=${data-1}&size=${itemsCountPerPage}`
    }).then(
      res => {
        if(res.data.result === "found"){
          console.log("data", data);
          this.setState({data: res.data.data.content, page: {...this.state.page, activePage: data}})
        }else{
          console.log("Not found");
        }
      }
    ).catch(error => {
      console.log(error);
    })

  };
  onRow = (data) => ({
    onClick: () => {
      console.log(data);
      //console.log(this.props.history);
      this.props.history.push("/BillList/" + data.billCode + "." + data.billId);

      //this.props.history.push("/order/detail/", {response: customerID})
    },
   
  });

  render() {
    console.log();
    const columns = [
      {
        title: "Mã Hóa Đơn",
        dataIndex: "billCode",
        key: "billCode",
        render: (text) => <a>{text}</a>,
      },
      {
        title: "Tên Khách Hàng",
        dataIndex: "customer",
        key: "customer",
        render: (customer) => <a>{customer.customerName}</a>,
      },
      {
        title: "Ngày Tạo Đơn",
        dataIndex: "createOn",
        key: "createOn",
        render: (text) => <a>{new Date(text).toLocaleDateString("vi")}</a>,
      },
      {
        title: "Tổng Tiền",
        dataIndex: "totalPrice",
        key: "totalPrice",
        render: (totalPrice) => <p>{`${totalPrice}₫`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>,
      },
    ];
    return (
      <Col>
        {/* <Header {...this.props} title="Danh sách đơn hàng" /> */}
        <Space
          align="baseline"
          size="large"
          style={{ marginTop: 16, marginLeft: 16 }}
        >
          <Row
            align="center"
            onClick={() => {
              this.props.history.push("/Bill")
            }}
            className="title"
          >
            <ArrowLeftOutlined style={{cursor:"pointer"}}/>
          </Row>
          <h3 className="title" style={{ marginBottom: -8 }}>
            Danh sách đơn hàng
          </h3>
        </Space>
        <Row align="middle" justify="space-between" style={{ margin: 16 }}>
          <input onChange={(event) => this.searchBill(event)} className="form-control form-control-sm fl w-100" style={{padding: "2px"}} type="text" placeholder="Tìm kiếm hóa đơn"
            aria-label="Search" 
            />
        </Row>
        <Table
          columns={columns}
          dataSource={this.state.data}
          rowKey={(data) => data.billId}
          style={{ marginTop: 16, backgroundColor: "rgb(184, 218, 255)"
          }}
          onRow={this.onRow}
          pagination={false}
        />
        
          <div className="pagination" style={{ justifyContent: "center" }}>
            <Pagination
              activePage={this.state.page.activePage}
              itemsCountPerPage={this.state.page.itemsCountPerPage}
              totalItemsCount={this.state.page.totalItemsCount}
              pageRangeDisplayed={this.state.page.pageRangeDisplayed}
              onChange={this.onChangePage}
              itemClass="page-item"
              linkClass="page-link"
            />
          </div>
       
      </Col>
    );
  }
}
