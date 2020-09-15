/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import ProductDetail from "../../components/part/Product/ProductDetail";
import Popup from "reactjs-popup";

class ProductItem extends Component {
  constructor(props) {
    super(props);
    this.state = { isShow: false };
  }
  onClick = () => {
    this.props.onShowDetail(this.props.index);
  };


  render() {
    var { product } = this.props;
var numeral= require("numeral");
    return (
      <Popup
      trigger={
      <tr style={{cursor:"pointer", height:"80px"}}>
        <td> {this.props.index + 1 + (this.props.page - 1) * 10} </td>{" "}
        <td>
          <img
            style={{ width: "40px", height: "fixed" , maxHeight:"60px" ,margin:"auto 0" }}
            alt="product-img"
         
            src={product.imageLink}
          />{" "}
        </td>{" "}
        <td>{product.prodCode}</td>
     
        <td>
       
              <div style={{ color: "black" }} onClick={this.onClick}>
                {" "}
                {product.prodName}{" "}
              </div>
           
        </td>{" "}
    
        <td> {numeral(product.quantity).format("0,0")} </td> 
         
        <td style={{textAlign: "right"}}> {numeral(product.priceIn).format("0,0")}  <span style={{textDecoration: "underline"}}>đ</span></td>
         <td style={{textAlign: "right"}}>{ numeral(product.priceOut).format("0,0")} <span style={{textDecoration: "underline"}}>đ</span> </td>
         <td style={{textAlign: "right"}}> {numeral(product.discount).format("0,0")} <span style={{textDecoration: "underline"}}>đ</span></td>
      </tr>
       }
            modal
            closeOnDocumentClick
            contentStyle={{ width: "75%", height: "100vh", marginLeft: "20%" }}
            open={this.state.isShow}
            onOpen={() => {
              this.setState({ isShow: true });
            }}
          >
            <ProductDetail
              product={this.props.product}
              onClick={() => {
                this.setState({ isShow: false });
              }}
            />{" "}
          </Popup>
    );
  }
}

export default ProductItem;
