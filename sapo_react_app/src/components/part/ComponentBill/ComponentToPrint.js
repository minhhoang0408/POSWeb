import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Row, Table, Col } from 'antd';

ComponentToPrint.propTypes = {
  billAfter: PropTypes.object,
};

ComponentToPrint.defaultValue ={
  billAfter: {}
}


const RowInfo = ({ title, content, styleContent }) => (
  <Row justify="space-between">
    <p style={{ width: "40%" }}>{title}</p>
    <p
      style={{
        fontSize: 16,
        fontWeight: 600,
        ...styleContent,
      }}
    >
      {content}
    </p>
  </Row>
);

function ComponentToPrint(props) {
  
  const {billAfter} = props;
  const [billItemsList, setBillItemsList] = useState(billAfter.billItemsList)
  const columns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "product",
      key: "prodName",
      render: (product) => <p> {product.prodName} </p>
    },
    {
      title: "Giá bán",
      dataIndex: "product",
      key: "priceOut",
      render: (product) => <p> {`${product.priceOut}₫`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} </p>
    },
    {
      title: "SL",
      dataIndex: "quantity",
      key: "quantity",
      render: (text) => <p> {text} </p>
    },
    {
      title: "Thành tiền",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (text) => <p> {`${text}₫`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} </p>
    },

  ]

  
  return (
    <div>
      <h4>Hóa đơn thanh toán</h4>
      <p> Mã : {billAfter.billCode} </p>
      <p> Ngày: {new Date(billAfter.createOn).toLocaleDateString("vi")} </p>
      <p> Khách hàng: {billAfter.customer.customerName}</p>
      <p> Số điện thoại: {billAfter.customer.phone} </p>

      <br/>
      <Table
        dataSource={billItemsList}
        columns={columns}
        pagination={false}
        rowKey={(data) => data.billId}
      />
      <br/>
      <Col>
        <RowInfo
          title={"Tổng tiền khách phải trả"}
          content={`${billAfter.totalPrice} ₫`.replace(
            /\B(?=(\d{3})+(?!\d))/g,
            ","
          )}
        />
        <RowInfo
          title={"Chiết khấu"}
          content={`${billAfter.discount} ₫`.replace(
            /\B(?=(\d{3})+(?!\d))/g,
            ","
          )}
        />
        <RowInfo
          title={"Khách đưa"}
          content={`${billAfter.cashIn} ₫`.replace(
            /\B(?=(\d{3})+(?!\d))/g,
            ","
          )}
        />
        <RowInfo
          title={"Trả lại khách hàng"}
          content={`${billAfter.cashOut} ₫`.replace(
            /\B(?=(\d{3})+(?!\d))/g,
            ","
          )}
        />
      </Col>
      <p><i> Hẹn gặp lại quý khách </i></p>
    </div>
  );
}

export default ComponentToPrint;