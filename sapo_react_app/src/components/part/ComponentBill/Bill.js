import React, {useState} from 'react';
import PropTypes from 'prop-types';
import ProductBill from './ProductBill/ProductBill';
import CustomerBill from './CustomerBill/CustomerBill';
import PayBill from './PayBill/PayBill';
import axios from 'axios';
import { message, Col, Row } from 'antd';
import {Dialog, DialogContent, DialogContentText, DialogActions, TextField} from '@material-ui/core'
import ComponentToPrint from '../ComponentBill/ComponentToPrint'
import {Button} from '@material-ui/core'
import { useHistory, useLocation } from 'react-router-dom';
Bill.propTypes = {
  
};

const getTotalPrice = (newBillDetails) => {
  let newTotalPrice = 0;
  for(let i = 0; i < newBillDetails.length; i++){
    newTotalPrice += newBillDetails[i].totalPrice;
  }
  return newTotalPrice;
}


function Bill(props) {
  
  const [billDetails, setBillDetails] = useState([]);
  const [table, setTable] = useState([]);
  const [billAfter, setBillAfter] = useState({});
  const [customer, setCustomer] = useState({});
  
  const [percent, setPercent] = useState(false);
  const [valuePercent, setValuePercent] = useState();
  
  const [openPrint, setOpenPrint] = useState(false); 
  const [data, setData] = useState(
    {
      customerId: -1,
      totalPrice: 0,
      discount: 0,
      cashIn: 0,
      cashOut: 0,
      billNote: "",
      billItemsModel: []
    }
  )

  const history = useHistory();
  const location = useLocation();

  const onClickSave = (cus) => {
    const newCustomer = {...cus}
    console.log("newCustomer", newCustomer);
    setCustomer(newCustomer);
    setData({
      ...data,
      customerId: newCustomer.customerId
    })
  }

  const getBillDetail = (product) => {
    
    // check product trong gio hang
    let index = -1;
    for(let i = 0; i < billDetails.length; i++) {
      if(product.prodId === billDetails[i].prodId){
        index = i;
      }
    }

    if(index !== -1) {
      message.info({
        content: "Đã có trong giỏ hàng !",
        style: {
          marginLeft: 10
        }
      })
    }
    else {
      const newBillDetail = {}
      newBillDetail.prodId = product.prodId;
      newBillDetail.priceOut = product.priceOut;
      newBillDetail.quantity = 1;
      newBillDetail.totalPrice = product.priceOut;
      newBillDetail.discount = product.discount;

      const newBillDetails = [...billDetails, newBillDetail];
      const newTotalPrice = getTotalPrice(newBillDetails);
      
      let newDiscount = data.discount;
      if(percent === true){
        newDiscount = Math.ceil(newTotalPrice * (valuePercent / 100));
      }else{
        newDiscount = data.discount;
      }

      const newCashOut = data.cashIn - (newTotalPrice - newDiscount);

      const newItemTable = {...newBillDetail, prodCode: product.prodCode, prodQuantity: product.quantity, prodName: product.prodName}
      const newTable = [...table, newItemTable]
      setTable(newTable);

      setBillDetails(newBillDetails);
      setData({
        ...data,
        billItemsModel: newBillDetails,
        totalPrice: newTotalPrice,
        cashOut: newCashOut,
        discount: newDiscount
      })
    } 
  }

  const deleteBillDetail = (prodId) => {
    
    const newBillDetails = billDetails.filter(billDetail => billDetail.prodId !== prodId);
    const newTable = table.filter(billDetail => billDetail.prodId !== prodId);
    const newTotalPrice = getTotalPrice(newBillDetails);

    let newDiscount = data.discount;
    if(percent === true){
      newDiscount = Math.ceil(newTotalPrice * (valuePercent / 100))
    }else{
      newDiscount = data.discount;
    }

    const newPriceAfterDiscount = newTotalPrice - newDiscount;
    const newCashOut = data.cashIn - newPriceAfterDiscount;
    
    setTable(newTable);
    setBillDetails(newBillDetails);
    setData({
      ...data,
      billItemsModel: newBillDetails,
      totalPrice: newTotalPrice,
      cashOut: newCashOut,
      discount: newDiscount
    })
  }

  const onUpdateBillDetail = (billDetail, type, value) => {
    console.log("billDetail",billDetail);
    let newBillDetails = [...billDetails]
    let newTable = [...table];
    let index = -1;
    let i = 0;
    for(let i = 0; i < newBillDetails.length; i++){
      if(billDetail.prodId === newBillDetails[i].prodId){
        index = i;
      }
    }  
    if(index !== -1) {
      console.log("Ok");
      // get api tim so luong test
      const test = 9;
      // console.log("index", index);
      // console.log("list :", newBillDetails[index])
      //if(billDetail.quantity <= 9){
        //console.log(billDetail);
        
        let totalPriceItem;
        if(type === "quantity"){
          totalPriceItem = (newBillDetails[index].priceOut - newBillDetails[index].discount) * value;
          newBillDetails[index].quantity = value;
          newBillDetails[index].totalPrice = totalPriceItem;
        }
        else{
          if(type === "priceOut"){
            totalPriceItem = (value - newBillDetails[index].discount) * newBillDetails[index].quantity;
            newBillDetails[index].priceOut = value;
            newBillDetails[index].totalPrice = totalPriceItem;
          }else{
            totalPriceItem = (newBillDetails[index].priceOut - value) * newBillDetails[index].quantity;
            newBillDetails[index].discount = value;
            newBillDetails[index].totalPrice = totalPriceItem;
          }
        }
        
        //console.log("Code",newBillDetails[index]);
        
        const newTotalPrice = getTotalPrice(newBillDetails);
        // update data
        let newPriceAfterDiscount;
        let newDiscount = data.discount;

        if(percent === true) {
          newDiscount = Math.ceil(newTotalPrice * (valuePercent / 100));
          newPriceAfterDiscount = Math.ceil(newTotalPrice - newDiscount);
        }else{
          newDiscount = data.discount;
          newPriceAfterDiscount = newTotalPrice - data.discount;
        }
        
        const newCashOut = data.cashIn - newPriceAfterDiscount; 
        
        console.log(newTotalPrice);
        // set tableProd
        if(type === "quantity"){
          totalPriceItem = (newBillDetails[index].priceOut - newBillDetails[index].discount) * value;
          newTable[index].quantity = value;
          newTable[index].totalPrice = totalPriceItem;
        }
        else{
          if(type === "priceOut"){
            totalPriceItem = (value - newBillDetails[index].discount) * newBillDetails[index].quantity;
            newTable[index].priceOut = value;
            newTable[index].totalPrice = totalPriceItem;
          }else{
            totalPriceItem = (newBillDetails[index].priceOut - value) * newBillDetails[index].quantity;
            newTable[index].discount = value;
            newTable[index].totalPrice = totalPriceItem;
          }
        }
        setTable(newTable);
        //
        setBillDetails(newBillDetails);
        setData({
          ...data,
          billItemsModel: newBillDetails,
          totalPrice: newTotalPrice,
          cashOut: newCashOut,
          discount: newDiscount
        })
      // }
      // else {
      //   alert("Qua so luong")
      // }
    }
    else{
      console.log("not");
    }
  }
  // Save Bill
  const onClickSaveBill = async () => {
    console.log(data);
    await axios({
        method: 'post',
        url: 'http://localhost:9090/api/admin/bill/upload',
        data: data
      }).then(
        res => {
          if (res.data.result === "uploaded") {
            console.log("res:", res.data.data);
            message.success("Thêm thành công đơn hàng...")
            setBillAfter(res.data.data);
            setTimeout(() => {
              setOpenPrint(true);
            }, 1000)
           
            
            
          }else{
            message.error("Không thành công !")
          }
        }
      ).catch(error => {
        console.log(error);
        message.warning("Chưa nhập thông tin khách hàng")
      })
  } 

  const handleChangePayForm = (value, type) => {
    console.log("....a", value);
    switch (type) {
      case "money": {
        const newPriceAfterDiscount = Math.ceil(data.totalPrice - value);
        const newCashOut = data.cashIn - newPriceAfterDiscount;
        setData({
          ...data,
          cashOut: newCashOut,
          discount: value
        })
        setPercent(false);
        break;
      }
      case "percent": {
        const newDiscount = Math.ceil(data.totalPrice * (value / 100));
        const newPriceAfterDiscount = Math.ceil(data.totalPrice - newDiscount);
        const newCashOut = data.cashIn - newPriceAfterDiscount;
        setData({
          ...data,
          cashOut: newCashOut,
          discount: newDiscount
        })
        setPercent(true);
        setValuePercent(value);
        break;
      }
      case "cashIn": {
        const newCashOut = value - (data.totalPrice - data.discount);
        setData({
          ...data,
          cashOut: newCashOut,
          cashIn: value
        })
        break;
      }
      case "billNote": {
        setData({
          ...data,
          billNote: value
        })
        break;
      }
      default:
        break;
    }
  }

  const handleOnClickClosePrint = () =>{
    setOpenPrint(false);
  
    
    console.log(history);
    //history.push("/BillList/" + billAfter.billCode + "." + billAfter.billId);
   // history.push("/Bill")
   console.log(location);
   window.location.reload();

    
  }
  const handleOnClickClosePrintAndPrint = () => {
    window.print();
    setOpenPrint(false);
    //history.push("/BillList/" + billAfter.billCode + "." + billAfter.billId);
    window.location.reload();
  }

  return (
    <div className="bill">
      <div className="header-bill mb-3">
        <span>Tạo Hóa Đơn Bán Hàng</span>
      </div>
      <br/>
      <div className="bill-main-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-8">
                <ProductBill 
                  getBillDetail={getBillDetail}
                  deleteBillDetail={deleteBillDetail}
                  billDetails={table}
                  onUpdateBillDetail={onUpdateBillDetail}
                />
            </div>
            <div className="col-4"  style={{background:"white"}}>
              <Col>
                <Row 
                  justify="space-around"
                style={{ marginTop: 8, marginBottom: 5 }}
                >
                <CustomerBill 
                  onClickSave={onClickSave}
                />
                </Row>
                <hr id="cus-pay"/>

                <PayBill 
                  data={data} 
                  onClickSaveBill={onClickSaveBill}
                  handleChangePayForm={handleChangePayForm}
                  dataTable={table}
                  customer={customer}
                />
                </Col>
                <Dialog open={openPrint} onClose={handleOnClickClosePrint} aria-labelledby="form-dialog-title">
        
                  <DialogContent>
                  <ComponentToPrint billAfter={billAfter}/>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleOnClickClosePrint} color="primary">
                      Quay lại
                    </Button>
                    <Button onClick={handleOnClickClosePrintAndPrint} color="primary">
                      In
                    </Button>
                  </DialogActions>
                </Dialog>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Bill;