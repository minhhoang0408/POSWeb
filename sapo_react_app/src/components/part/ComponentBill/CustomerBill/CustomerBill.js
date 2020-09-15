import React, {useState} from 'react';
import PropTypes from 'prop-types';
import SearchCustomer from './SearchCustomer'
import {Row} from 'antd'

CustomerBill.propTypes = {
  onClickSave: PropTypes.func,
};

CustomerBill.defaultProps = {
  onClickSave: null,
}

const RowInfo = ({ title, content, styleContent }) => (
  <Row justify="space-between" >
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

function CustomerBill(props) {
  
  const {onClickSave} = props;
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
  
  const onClickSaveCustomer = (customer) => {
    
    const newCustomer = {
      ...user,
      customerId: customer.customerId,
      customerName: customer.customerName,
      phone: customer.phone,
      email: customer.email,
      address: customer.address,
      gender: customer.gender,
      dob: customer.dob
    };
    onClickSave(newCustomer);
    setUser(newCustomer);
    
  }


  return (
    <div className="customer-bill">
      <div className="customer-bill-header">
        <h4> Khách hàng </h4>
        {/* <AddCustomer onClickSaveCustomer={onClickSaveCustomer} /> */}
      </div>
      <div className="main-customer-bill">
        
        <SearchCustomer 
          onClickSaveCustomer={onClickSaveCustomer} 
        />
        
        <RowInfo
              title="Tên khách hàng"
              content={user.customerName}
            />
        <RowInfo title="Số điện thoại" content={user.phone} />
      </div>
    </div>
  );
}

export default CustomerBill;