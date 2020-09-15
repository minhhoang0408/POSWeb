import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {TextField} from '@material-ui/core'
import Popup from 'reactjs-popup';
import axios from 'axios'
import { InputAdornment } from '@material-ui/core';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import AddCustomer from './AddCustomer'

SearchCustomer.propTypes = {
  onClickSaveCustomer: PropTypes.func,
};

SearchCustomer.default = {
  onClickSaveCustomer: null
}


function SearchCustomer(props) {
  
  const {onClickSaveCustomer} = props;

  const [open, setOpen] = useState(false);
  const [listCustomer, setListCustomer] = useState([]);

  const handleOnChangeOpen = (event) => {
    
    const config = {
      name: event.target.value,
      page: 0,
      size: 5
    }
    // get data
    axios.get(`http://localhost:9090/api/admin/customer?name=${config.name}&page=${config.page}&size=${config.size}`)
    .then( res => {
      if(res.data.result === "found") {
        const newList = res.data.data.content;
        console.log(newList);
        setListCustomer(newList);
      }else {
        setListCustomer([]);
      }
    })
    .catch(error => {
      console.log(error);
    })

    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }
  
  const onClickCustomer = (customer) => {
    onClickSaveCustomer(customer);
    setOpen(false);
    //setValueText("");
  }
  
  return (
    <div className="search-customer-bill">
      <Popup
        trigger={
          <TextField
              
              margin="dense"
              id="name"
              label="Tìm Kiếm Khách hàng*"
              type="text"
              
              fullWidth 
              onChange={handleOnChangeOpen}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SupervisorAccountIcon color="primary"/>
                  </InputAdornment>
                ),
                // endAdornment: (
                //   <InputAdornment position="end">
                //     <YoutubeSearchedForIcon color="primary"/>
                //   </InputAdornment>
                // ),
              }}  
          />
        }
        on="focus"
        closeOnDocumentClick
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        position="bottom right"
        contentStyle={{width: "90%"}}
      >
      
        <button key={"add-cus"} type="button" id="btn-prod-bill-item" className="list-group-item list-group-item-action">
              <AddCustomer onClickSaveCustomer={onClickSaveCustomer} />
        </button>
        {
            (listCustomer.map((customer, key) => {
              return (
                <button key={key} onClick={() => onClickCustomer(customer)} type="button" id="btn-prod-bill-item" class="list-group-item list-group-item-action">
                  <p> { `Tên: ${customer.customerName} - Sđt: ${customer.phone}`} </p>
                </button>
              ) 
            }))
        }
      </Popup>
      
    </div>
  );
}

export default SearchCustomer;