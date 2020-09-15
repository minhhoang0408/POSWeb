import React, { Component } from "react";
import '../BillList/index.css';
import {Descriptions, Row } from "antd";
import { Table, Col, Space } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import axios from 'axios'
import {Button} from '@material-ui/core'

class BillListItem extends Component {
  constructor(props) {
    
    super(props);
    this.state = {
      data: {},
      list: [],
      customer: {},
      isFix: false,
      isUpdate: false,
      text: ""
    };

  }
  

  componentDidMount() {
    const billId = this.props.match.params.id;
    console.log("billId", billId);
    axios({
      method: 'get',
      url: `http://localhost:9090/api/admin/bill/full/${billId}`
    }).then(
      res => {
        if(res.data.result === "found"){
          this.setState({
            data: res.data.data,
            list: res.data.data.billItemsList,
            customer: res.data.data.customer
          })
        }else{
          console.log("res.data.data");
        }
      }
    ).catch(error => {
      console.log(".....",error);
    })
  }

  onChangeBillText = (event) => {
    console.log(event.target.value);
    this.setState({
      text: event.target.value
    })
  }
  onClickFix = () => {
    this.setState({
      isFix: true
    })
  }
  onClickBack = () => {
    this.setState({
      isFix: false
    })
  }
  onClickSave = () => {

    const newData = {
      ...this.state.data,
      billNote: this.state.text
    }
    this.setState({
      isFix: false,
      data: newData
    })
  }

  render() {
    const { data, list, customer, isFix, isUpdate } = this.state;
    console.log(data);
    const columns = [
      {
        title: "STT",
        dataIndex: "product",
        key: "prodCode",
        render: (product) => <p>{product.prodCode}</p>,
      },
      {
        title: "Tên sản phẩm",
        dataIndex: "product",
        key: "productName",
        render: (product) => <p>{product.prodName}</p>,
      },
      {
        title: "Giá bán",
        dataIndex: "priceOut",
        key: "priceOut",
        render: (text) => <p>{`${text}₫`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>,
      },
      {
        title: "Số lượng",
        dataIndex: "quantity",
        key: "quantity",
        render: (text) => <p>{text}</p>,
      },
      {
        title: "Chiết khấu",
        dataIndex: "discount",
        key: "discount",
        render: (text) => <p>{`${text}₫`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>,
      },
      {
        title: "Thành Tiền",
        dataIndex: "totalPrice",
        key: "totalPrice",
        render: (text) => <p>{`${text}₫`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>,
      },
    ];
    console.log("this.props", this.props);
    return (
      <div>
        {/* <Header {...this.props} title="Chi tiết hóa đơn">
          <Button danger onClick={this.showModalDelete}>
            Xóa hóa đơn
          </Button>
        </Header> */}

        <Space
          align="baseline"
          size="large"
          style={{ marginTop: 16, marginLeft: 16 }}
        >
          <Row
            align="center"
            onClick={() => this.props.history.push("/BillList")}
            className="title"
          >
            <ArrowLeftOutlined style={{cursor:"pointer"}}/>
          </Row>
          <h3 className="title" style={{ marginBottom: -8 }}>
            Chi tiết hóa đơn
          </h3>
          
        </Space>
        <Button variant="contained" color="primary" onClick={this.onClickFix} style={{float: "right", marginTop:"10px", marginRight:"30px"}}>Sửa </Button>
        <Row style={styles.groupView} justify="space-between">
          <Descriptions size="small" column={4}>
            <Descriptions.Item
              label="Mã hóa đơn"
              style={{ fontSize: 18, fontWeight: "bold" }}
            >
              {data.billCode}
            </Descriptions.Item>
            <Descriptions.Item
              label="Tổng tiền"
              style={{ fontSize: 18, fontWeight: "bold" }}
            >
              {`${data.totalPrice}₫`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            </Descriptions.Item>
            <Descriptions.Item
              label="Giảm giá"
              style={{ fontSize: 18, fontWeight: "bold" }}
            >
              {`${data.discount}₫`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            </Descriptions.Item>
            <Descriptions.Item
              label="Ngày tạo"
              style={{ fontSize: 18, fontWeight: "bold" }}
            >
              {new Date(data.createOn).toLocaleDateString("vi")}
            </Descriptions.Item>
            <Descriptions.Item
              label="Tên khách hàng"
              style={{ fontSize: 18, fontWeight: "bold" }}
            >
              {customer.customerName}
            </Descriptions.Item>
            <Descriptions.Item
              label="Số điện thoại"
              style={{ fontSize: 18, fontWeight: "bold" }}
            >
              {customer.phone}
            </Descriptions.Item>
            <Descriptions.Item
              label="Email"
              style={{ fontSize: 18, fontWeight: "bold" }}
            >
              {customer.email}
            </Descriptions.Item>
            <Descriptions.Item
              label="Địa chỉ"
              style={{ fontSize: 18, fontWeight: "bold" }}
            >
              {customer.address}
            </Descriptions.Item>
            {!isFix ?
            <Descriptions.Item
              label="Ghi chú"
              style={{ fontSize: 18, fontWeight: "bold" }}
            >
              {data.billNote}
            </Descriptions.Item>
            :
            <Descriptions.Item
              label="Ghi chú"
              style={{ fontSize: 18, fontWeight: "bold" }}
            >
              <textarea className="form-control" defaultValue={data.billNote} rows="5" id="comment" onChange={(event) => this.onChangeBillText(event, "billNote")} ></textarea>
            </Descriptions.Item> 
            }
            
          </Descriptions>
        </Row>
        <Col>
          <h6 style={{ marginLeft: 16, padding: 0 }}>Chi tiết đơn hàng</h6>
          <div
            style={{
              backgroundColor: "white",
              margin: 16,
            }}
          >
            <Table
              columns={columns}
              dataSource={list}
              rowKey={(list) => list.product.productId}
              style={{ marginTop: 16 }}
              pagination={false}
            />
          </div>
        </Col>
        {isFix ?
          <Row style={{width: "100%", display: "flex"}} justify="space-between" >
            <Button variant="contained" onClick={this.onClickBack} style={{marginLeft: "40px"}}>Quay Lại</Button>
            <Button variant="contained" color="primary" style={{marginRight: "40px"}} onClick={this.onClickSave}>
              Lưu
            </Button>
          </Row>
          :
          null
        }
        
        
      </div>
    );
  }
}
export default BillListItem;

const styles = {
  groupView: {
    background: "white",
    padding: "16px",
    margin: "16px",
  },
};
