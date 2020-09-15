import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Empty, InputNumber, message} from 'antd';
import {useForm, Controller} from 'react-hook-form'


TableProd.propTypes = {
  options: PropTypes.array,
  onClickDeleteProductItem: PropTypes.func,
  onUpdateBillDetail: PropTypes.func,
};

TableProd.propTypes = {
  options: [],
  onClickDeleteProductItem: null,
  onUpdateBillDetail: null
}

function TableProd(props) {
  
  const {options, onClickDeleteProductItem, onUpdateBillDetail} = props;

  const [valueDis, setValueDis] = useState();
  

  const {control} = useForm({
    mode: "onChange"
  }
  );
  
  const onClickDelete = (prodId) => {
    console.log("prodId delete", prodId)
    onClickDeleteProductItem(prodId);
  }

  const onChangeProduct = (value, billDetail, type) => {
    
    console.log("value", value);
    if(type === "quantity"){
      if(value > billDetail.prodQuantity){
        message.error(`Số lượng còn lại trong kho hàng là ${billDetail.prodQuantity}`);
        value = billDetail.prodQuantity;
      }
    }else{
      if(type === "discount"){
        if(value > billDetail.priceOut) {
          message.error("Chiết khấu vượt quá giá trị sản phẩm !");
          value = billDetail.priceOut;
        }
      }
    }
    onUpdateBillDetail(billDetail, type, value);
    if(type === "priceOut" && valueDis > value){
      onUpdateBillDetail(billDetail, "discount", value);
      setValueDis(value);
    } 

    if(type === "discount"){
      setValueDis(value);
    }
  }


  return (
    <div className="table-wrapper-scroll-y my-custom-scrollbar" style={{background:"white",minHeight:"82.5vh", height:"82.5vh", overflowY:"scroll"}}>
     <table className="table table-striped " >
        <thead style={{fontWeight: "bolder", backgroundColor:"#b8daff"}}>
          <tr>
            <th scope="col">STT</th>
            <th scope="col">Mã sản phẩm</th>
            <th scope="col">Giá sản phẩm</th>
            <th scope="col" id="input-prod">Số lượng</th>
            <th scope="col" id="input-prod">Chiết khấu</th>
            <th scope="col">Thành tiền</th>
            <th scope="col"></th>
            
          </tr>
        </thead>
        <tbody style={{minHeight: "80vh !important", overflow:"scroll"}}>
          {options.length === 0 ? <th colSpan={7} rowSpan={3} style={{alignItems: "center", justifyItems:"center"}}><Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Không có sản phẩm" /></th> :

            options.map((product,key) => {
              let max = product.priceOut;
              return (
                <tr key={key}>
                  <th scope="row"> {key + 1} </th>
                  <td> {product.prodCode} </td>
                  <td> 
                    <Controller
                      render={(name, onBlur) =>
                        <InputNumber
                          defaultValue={product.priceOut}
                          formatter={(value) =>
                            `${value} đ`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                          }
                          onBlur={onBlur}
                          onChange={value => {
  
                              onChangeProduct(value, product, "priceOut")
                            }
                          }
                          min={0}
                          style={{
                            width: "120px"
                          }}
                  
                        />    
                      }
                      defaultValue={product.priceOut}
                      name="priceOut"
                      control={control}
                      rules={{
                        pattern:{
                          value: /^[0-9]$/i,
                          message: "ErrorsDiscount"
                        },
  
                      }}
                    />

                  </td>
                  <td> 
                      <Controller
                        render={(name, onBlur) =>
                        <InputNumber
                          defaultValue={product.quantity}
                          onChange={value => onChangeProduct(value, product, "quantity")}
                          onBlur={onBlur}
                          min={1}
                          max={product.prodQuantity}
                          style={{
                            width:"60px"
                          }}
                        />
                        }
                        defaultValue={product.quantity}
                        name="quantity"
                        control={control}
                        rules={{
                          min: 1,
                          max: product.prodQuantity
                        }}
                      />
                      
                  </td>
                  <td> 
                  {/* <InputNumber
                      defaultValue={product.discount}
                      min={0}
                      onChange={value => onChangeProduct(value, product, "discount")}
                      max={product.priceOut}
                      // onBlur={}
                      
                      /> */}
                    <Controller
                      render={(name, onBlur) =>
                        <InputNumber
                          defaultValue={product.discount}
                          formatter={(value) =>
                            `${value} đ`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                          }
                          onBlur={onBlur}
                          onChange={value => onChangeProduct(value, product, "discount")}
                          min={0}
                          value={product.discount}
                          style={{
                            width:"120px"
                          }}
                        />    
                      }
                      defaultValue={product.discount}
                      value={valueDis}
                      name="discount"
                      control={control}
                      rules={{
                        max: max
                      }}
                    />
                    {/* <form>
                      <input 
                        type="number" 
                        name="discount" 
                        ref={register({min: {value: 0, message: "Không nhỏ hơn 0"}})} 
                        onChange={e => {
                          if(e.target.value <= product.priceOut){
                            onChangeProduct(e.target.value, product, "discount");
                            setValue(value);
                          }
                          else{
                            setValue(0);
                          }
                        }} 
                        style={{width: "90px", height: "32px", float:"left", borderRadius:"2px", fontFamily:"inherit", fontSize:"inherit"}} 
                        className="form-control mb-2 mr-sm-2" 
                        placeholder="discount" 
                        defaultValue={product.discount}
                        value={value}
                      />
                    </form> */}
                  </td>
                  <td> {`${product.totalPrice}₫`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} </td>
                  <td> <span onClick={() => onClickDelete(product.prodId)}  style={{padding: "0px", border:"none" ,cursor:"pointer"}} type="button"><i className="fa fa-trash" style={{color:"red"}}></i></span> </td>
              </tr>
              )
            })
          }
          
        </tbody>
      </table>
    </div>
  );
}

export default TableProd;