import React from 'react';
import PropTypes from 'prop-types';
import Search from './Search';
import TableProd from './TableProd';
 
ProductBill.propTypes = {
  getBillDetail: PropTypes.func,
  deleteBillDetail: PropTypes.func,
  billDetails: PropTypes.array,
  onUpdateBillDetail: PropTypes.func,
};

ProductBill.defaultProps = {
  getBillDetail: null,
  deleteBillDetail: null,
  billDetails:[],
  onUpdateBillDetail: null
}

function ProductBill(props) {
  
  const {getBillDetail, deleteBillDetail, billDetails, onUpdateBillDetail} = props;
  
  return (
    <div>
      <div className="search-prod">
      
        <Search 
          onClickGetProductItem={getBillDetail} 
        />
        <br/>
        <TableProd 
          options={billDetails}
          onClickDeleteProductItem={deleteBillDetail}
          onUpdateBillDetail={onUpdateBillDetail}
        />
        
      </div>
    </div>
  );
}

export default ProductBill;