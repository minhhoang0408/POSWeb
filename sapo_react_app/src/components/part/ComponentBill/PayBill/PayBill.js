import React, { useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {Button} from '@material-ui/core'
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import {Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField} from '@material-ui/core'
import {InputNumber, Input, message, Col , Row, Select, Space} from 'antd'
import RowSelect from './RowSelect';



PayBill.propTypes = {
  data: PropTypes.object,
  onClickSaveBill: PropTypes.func,
  handleChangePayForm: PropTypes.func,
  dataTable: PropTypes.array,
  customer: PropTypes.object,
};

PayBill.defaultProps = {
  data: {},
  onClickSaveBill: null,
  handleChangePayForm: null,
  dataTable: [],
  customer: {}
}

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const INITIAL_PAY = {
  totalPrice: 0,
  discount: 0,
  priceAfterDiscount: 0,
  cashIn: 0,
  cashOut: 0,
  billNote: ""
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

const RowNote = ({title, onChange, type }) => {
  const {TextArea} = Input;
 
  return (
  <Row justify="space-between">
    <p style={{ width: "40%" }}>{title}</p>
    <textarea className="form-control" rows="4" id="comment" onChange={(event) => onChange(event.target.value, "billNote")} ></textarea>
  </Row>
  )
}

const RowInput = ({ title, onChange, formatter, type, max, valueDefault}) => (
  <Row justify="space-between">
    <p style={{ width: "40%" }}>{title}</p>
    <InputNumber
      defaultValue={`${valueDefault} ₫`.replace(/\B(?=(\d{3})+(?!\d))/g,",")}
      formatter={formatter}
      style={{ width: "40%", textAlign:"right", float:"right" }}
      onChange={(value) => onChange(value, type)}
      min={0}
      max={max}
      value={valueDefault}
    />
  </Row>
);

function PayBill(props) {
  
  const {data, onClickSaveBill, handleChangePayForm} = props;
  const classes = useStyles();

  const [openDelete, setOpenDelete] = useState(false);
  
  const handleOnClickOpenDelete = () => {
    setOpenDelete(true);
  }

  const handleOnClickCloseDelete = () => {
    setOpenDelete(false);
  }
 

  const onClickSave = async () => {

    if(data.cashOut < 0  ){
      message.warning("Số tiền khách đưa chưa đủ");
    }else{
      if(data.billItemsModel.length === 0){
        message.error("Không có sản phẩm nào trong giỏ hàng !")
      }
      else{
        if(data.customerId === -1){
          message.error("Chưa có thông tin khách hàng !");
        }
        else{
          onClickSaveBill();
        }   
      }
    }
  }



  const handleOnClickCloseDeleteAll = () => {
    window.location.reload();
  }
  
  
  const onChangeTotalPrice = (value, type) => {
    if(type === "cashIn" && data.totalPrice === 0){
      value = 0;
    }
    
    handleChangePayForm(value, type);
  }

  return (
    <div className="pay-bill">
      <Col>
      <h4 > Thanh Toán </h4>
      <br/>
            <RowInfo
              title="Tổng tiền"
              content={`${data.totalPrice} ₫`.replace(
                /\B(?=(\d{3})+(?!\d))/g,
                ","
              )}
            />
            <RowSelect
              title="Chiết khấu đơn"
              onChange={onChangeTotalPrice}
              max={data.totalPrice}
            />
            <RowInfo
              title="Tổng tiền sau chiết khấu"
              content={`${data.totalPrice - data.discount} ₫`.replace(
                /\B(?=(\d{3})+(?!\d))/g,
                ","
              )}
            />
            <RowInput
              title="Khách đưa"
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              onChange={onChangeTotalPrice}
              type="cashIn"
              min={0}
              valueDefault={data.totalPrice - data.discount}
            />
            {data.cashOut < 0 ? 
              <RowInfo 
              title="Số tiền khách hàng phải trả"
              content={`${- data.cashOut} ₫`.replace(
                /\B(?=(\d{3})+(?!\d))/g,
                ","
              )}/>
              :
              <RowInfo 
              title="Trả lại khách hàng"
              content={`${data.cashOut} ₫`.replace(
                /\B(?=(\d{3})+(?!\d))/g,
                ","
              )}/>
              }
              <RowNote
              title="Ghi chú"
              onChange={onChangeTotalPrice}
              type="billNote"
            />
        </Col>
      
          <div className="btn-huy" style={{float:"left"}}>
            <Button
              variant="outlined"
              color="secondary"
              size="large"
              className={classes.button}
              startIcon={<DeleteIcon />}
              onClick={handleOnClickOpenDelete}
            >
            Hủy
            </Button>
            <Dialog open={openDelete} onClose={handleOnClickCloseDelete} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Bạn Có Muốn Xóa Đơn Hàng Này ???</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Xóa Xong Thì Tạo Lại nhé !!! 
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleOnClickCloseDeleteAll} color="primary">
                  Hủy
                </Button>
                <Button onClick={handleOnClickCloseDelete} color="primary">
                  Quay lại
                </Button>
              </DialogActions>
            </Dialog>
          </div>
            
          <div className="btn-luu fr" style={{float:"right"}}>
            <Button
            variant="contained"
            color="primary"
            size="large"
            className={classes.button}
            startIcon={<SaveIcon />}
            onClick={onClickSave}
            >
             Lưu
            </Button>
          </div>
          
    </div>
  );
}

export default PayBill;