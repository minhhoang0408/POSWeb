import React, { useState } from 'react';
import { Modal, Button, message } from 'antd';
import {TextField, InputAdornment } from '@material-ui/core';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import SettingsPhoneIcon from '@material-ui/icons/SettingsPhone';
import { validateInput } from './Validate/Validate';
import axios from 'axios';

AddCustomer.propTypes = {
  
};

const INITIAL_MODAL = {
  loading: false,
  visible: false
};

const INITIAL_VALIDATE = {
  value: "",
  isInputValid: false,
  errorMess: ""
}

const Error = (props) => {
  console.log("Error");
  const {isHidden, errorMess} = props;
  if(isHidden === false){
    console.log("not");
    return null;
  }else{
    console.log("Loi");
    return (
      <span style={{color:"red"}}>
        {errorMess}  
      </span>
    )
  }
}

function AddCustomer(props) {
  
  const [state, setState] = useState(INITIAL_MODAL);
  const {visible, loading} = state;
  
  const [valName, setValName] = useState(INITIAL_VALIDATE);
  const [valPhone, setValPhone] = useState(INITIAL_VALIDATE);

  const {onClickSaveCustomer} = props;
  const [user, setUser] = useState(
    {
      customerId: 0,
      customerName:"",
      customerCode:"",
      phone: "",
      email: "",
      address: "",
      gender: "",
      dob: ""
    }
  )

  const showModal = () => {
    setState({...state, visible: true});
  };

  const handleOk = (data) => {
   
    setState({...state, loading: true});
    const {isInputValidName, errorMessName} = validateInput("name", valName.value);
    const {isInputValidPhone, errorMessPhone} = validateInput("phone", valPhone.value);
    console.log("isName", isInputValidName);
    console.log("isPhone", isInputValidPhone);
    // setTimeout(() => {
    //   if(isInputValidName === true && isInputValidPhone === true) {
    //     setValName({...valName, isInputValid: isInputValidName, errorMess: errorMessName});
    //     setValPhone({...valPhone, isInputValid: isInputValidPhone, errorMess: errorMessPhone});
    //     setState({...state, visible: false, loading: false});
    //   }else{
    //     setValName({...valName, isInputValid: isInputValidName, errorMess: errorMessName});
    //     setValPhone({...valPhone, isInputValid: isInputValidPhone, errorMess: errorMessPhone});
    //     setState({...state, visible: true, loading: false});
    //   }
    // }, 1000);
    if(isInputValidName === false && isInputValidPhone === false) {
      const newUser = {
        ...user,
        customerName: valName.value,
        phone: valPhone.value
      }
      console.log("newUser", newUser);
      // Post data
      axios({
        method: 'post',
        url: 'http://localhost:9090/api/admin/customer/upload',
        data: newUser
      }).then(
        res => {
          console.log(res);
          if (res.data.result === "uploaded") {
            message.success("Thêm thành công khách hàng...");
            onClickSaveCustomer(newUser)
          }else{
            message.error("Không thành công...");
          }
        }
      ).catch(error => {
        console.log(error);
        message.warning("Kiểm tra lại thông tin ...")
      })
     
      setValName({...valName, isInputValid: isInputValidName, errorMess: errorMessName});
      setValPhone({...valPhone, isInputValid: isInputValidPhone, errorMess: errorMessPhone});
      setState({...state, visible: false, loading: false});
    }else{
      setValName({...valName, isInputValid: isInputValidName, errorMess: errorMessName});
      setValPhone({...valPhone, isInputValid: isInputValidPhone, errorMess: errorMessPhone});
      setState({...state, visible: true, loading: false});
    }
  };

  const handleCancel = () => {
    setState({...state, visible: false});
  };

  const handleOnChange = (e) => {
    console.log(e.target.value);
    if(e.target.name === "name"){
      setValName({...valName, value: e.target.value})
    }else{
      setValPhone({...valPhone, value: e.target.value})
    }
  }

  return (
    <div className="search-customer">
      
      <span onClick={showModal}>
        <i className="fa fa-user-plus" aria-hidden="true"></i>   
        Thêm mới khách hàng
      </span>
      
      <Modal
        visible={visible}
        title="Thêm mới khách hàng"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Hủy
          </Button>,
          <Button key="back" type="primary" loading={loading} onClick={handleOk}>
            Lưu
          </Button>,
        ]}
      >
        <form >
        <TextField
              key={1}
              autoFocus="true"
              margin="dense"
              id="normal"
              label="Tên Khách Hàng*"
              type="text"
              name="name"
              fullWidth
              error={valName.isInputValid}
              onChange={handleOnChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SupervisorAccountIcon color="primary"/>
                  </InputAdornment>
                ),
              }}  
            />
            <Error isHidden={valName.isInputValid} errorMess={valName.errorMess}/>
            <TextField
              key={2}
              autoFocus="false"
              margin="dense"
              id="phone"
              label="Số điện thoại*"
              type="text"
              name="phone"
              error={valPhone.isInputValid}
              fullWidth
              onChange={handleOnChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SettingsPhoneIcon color="primary" />
                  </InputAdornment>
                ),
              }}
            />
            <Error isHidden={valPhone.isInputValid} errorMess={valPhone.errorMess} />
            </form>
      </Modal>
    </div>
  );
}

export default AddCustomer;