/* eslint-disable jsx-a11y/alt-text */
import { Button } from "@material-ui/core";
import React, { Component } from "react";
import Popup from "reactjs-popup";

import axios from "axios";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FormControl from "@material-ui/core/FormControl";
import CategoyInputForm from "../../pieces/CategoyInputForm";
import "../../css/image.css";
import ImgUpload from "../../pieces/ImgUpload";
import { message } from "antd";
import QueryString from "query-string";

class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDelete: false,
      prodName: "",
      prodCode: "",
      prodCode1: "",
      quantity: 0,
      priceIn: 0,
      priceOut: 0,
      discount: 0,
      imageLink: "",
      prodId: "",
      catId: 0,
      catName: "",
      hasError: false,
      prodCodeError: false,
      prodCodeErrorMess: "",
    };
  }
  componentDidMount() {
    var { product } = this.props;

    this.setState({
      prodId: product.prodId,
      prodName: product.prodName,
      prodCode: product.prodCode,
      prodCode1: product.prodCode,
      quantity: product.quantity,
      priceIn: product.priceIn,
      priceOut: product.priceOut,
      discount: product.discount,
      imageLink: product.imageLink,
      catName: product.category.catName + " " + product.category.brand,
      catId: product.category.catId,
    });
  }

  onDelete = () => {
    var page = QueryString.parse(window.location.search).page;
    axios
      .delete(
        `http://localhost:9090/api/admin/product/delete/${this.state.prodId}`
      )
      .then((res) => {
        message.success("xóa thành công");
        window.location.replace("/WarehouseStaff/ProductList/?page=" + page);
      });
  };
  onUpdate = () => {
    if (
      (this.state.prodName === "") |
      (this.state.catId === 0) |
      (this.state.catId === void 0)
    )
      this.setState({ hasError: true });
    else {
      var confirm = window.confirm("Bạn có muốn chỉnh sửa sản phẩm này không");
      if (confirm) {
        axios
          .put("http://localhost:9090//api/admin/product/update", {
            prodId: this.state.prodId,
            prodName: this.state.prodName,
            prodCode: this.state.prodCode,
            quantity: this.state.quantity,
            priceIn: this.state.priceIn,
            priceOut: this.state.priceOut,
            discount: this.state.discount,
            imageLink: this.state.imageLink,
            catId: this.state.catId,
          })
          .then((res) => {
            if (res.data.result === "updated") {
              message.success("Chỉnh sửa thành công");
              window.location.reload();
            } else alert(res.data);
          });
      }
    }
  };
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onProdCodeChange = (e) => {
    this.setState(
      {
        prodCode: e.target.value,
      },
      () => {
        if (isNaN(this.state.prodCode.substr(3))) {
          this.setState({
            prodCodeError: true,
            prodCodeErrorMess: "Mã Sản Phẩm Không Được Có  Kí Tự Đi Sau 'SKU'",
          });
        } else if (this.state.prodCode === "") {
          this.setState({
            prodCodeError: false,
            prodCodeErrorMess: "",
            prodCode : this.state.prodCode1
          });
        } else if (this.state.prodCode.substr(0, 3) !== "SKU") {
          this.setState({
            prodCodeError: true,
            prodCodeErrorMess: "Mã Sản Phẩm Bắt Buộc Bắt Đầu Bằng SKU",
          });
        }
        
        else if (this.state.prodCode !== this.state.prodCode1) {
          axios
            .get(
              "http://localhost:9090//api/admin/product/product-code?product_code=" +
                this.state.prodCode
            )
            .then((response) => {
              if (response.data === true)
                this.setState({
                  prodCodeError: true,
                  prodCodeErrorMess: "Mã Sản Phẩm Đã Tồn Tại",
                });
              else
                this.setState({
                  prodCodeError: false,
                  prodCodeErrorMess: "",
                });
            })
            .catch((error) => console.log(error));
        } else
          this.setState({
            prodCodeError: false,
            prodCodeErrorMess: "",
          });
      }
    );
  };
  render() {
    var { product } = this.props;
    var numeral = require("numeral");
    return (
      <div>
        <h3 className="mt-3 mb-2 " style={{ marginLeft: "8.5%" }}>
          Chi Tiết Sản Phẩm
        </h3>
        <div className="container">
          <div className="row">
            <div className="col-lg-1"></div>
            <div className="col-lg-4 mt-2" style={{ marginLeft: "-1%" }}>
              <div className="hovereffect">
                <img
                  style={{ width: "100%", height: "auto", maxHeight: "500px" }}
                  src={this.state.imageLink}
                  className="image"
                />
                <div className="overlay">
                  <div className="info">
                    <ImgUpload
                      name="Đổi Ảnh"
                      onChange={(e) => this.setState({ imageLink: e })}
                    ></ImgUpload>
                  </div>

                  <div className="info">
                    {" "}
                    <label
                      style={{
                      
                        color: "white",
                       
                        borderRadius: 4,
                        cursor: "pointer",
                      }}
                    > Xóa Ảnh
                      <Button
                        hidden
                        style={{ padding: "0px", height: "30px", margin: "0" }}
                        onClick={(e) =>
                          this.setState({
                            imageLink:
                              "https://vignette.wikia.nocookie.net/tu-chan-lieu-thien-quan/images/1/12/No-image-news.png/revision/latest?cb=20191022055835&path-prefix=vi",
                          })
                        }
                      >
                       
                      </Button>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <FormControl
                fullWidth
                className="form-input"
                variant="outlined"
                style={{ margin: "10px" }}
              >
                <InputLabel htmlFor="outlined-adornment-amount">
                  Tên Sản Phẩm <span style={{ color: "red" }}>*</span>
                </InputLabel>{" "}
                <OutlinedInput
                  id="outlined-adornment-amount"
                  labelWidth={130}
                  name="prodName"
                  value={this.state.prodName}
                  placeholder="Ex : Áo Dài Truyền thống "
                  onChange={this.onChange}
                  error={this.state.hasError & (this.state.prodName === "")}
                />{" "}
              </FormControl>{" "}
              <span
                style={{
                  color: "red",
                  float: "left",
                  marginLeft: "2%",
                  marginTop: "-2%",
                }}
              >
                {this.state.hasError & (this.state.prodName === "")
                  ? "Vui Lòng Điền Tên Sản Phẩm"
                  : ""}
              </span>
              <FormControl
                fullWidth
                className="form-input"
                variant="outlined"
                style={{ margin: "10px" }}
              >
                <InputLabel htmlFor="outlined-adornment-amount">
                  Mã Sản Phẩm <span style={{ color: "red" }}>*</span>
                </InputLabel>{" "}
                <OutlinedInput
                  id="outlined-adornment-amount"
                  labelWidth={130}
                  name="prodCode"
                  value={this.state.prodCode}
                  placeholder="Ex : SKU123 "
                  onChange={this.onProdCodeChange}
                  error={this.state.prodCodeError}
                />
              </FormControl>{" "}
              {this.state.prodCodeError ? (
                <span
                  style={{
                    color: "red",
                    float: "left",
                    marginLeft: "5%",
                    marginTop: "-1%",
                  }}
                >
                  {this.state.prodCodeErrorMess}
                </span>
              ) : (
                ""
              )}
              <br />
              <FormControl
                fullWidth
                className="form-input"
                variant="outlined"
                style={{ margin: "10px" }}
              >
                <InputLabel htmlFor="outlined-adornment-amount">
                  Danh Mục Sản Phẩm<span style={{ color: "red" }}>*</span>
                </InputLabel>
                <CategoyInputForm
                  width="550px"
                  onChange={(e) => {
                    this.setState({ catId: e.catId });
                  }}
                  error={
                    this.state.hasError &&
                    (this.state.catId === 0) | (this.state.catId === void 0)
                  }
                  catName={
                    this.props.product.category.catName +
                    " " +
                    product.category.brand
                  }
                ></CategoyInputForm>
              </FormControl>
              {this.state.hasError &
              ((this.state.catId === 0) | (this.state.catId === void 0)) ? (
                <span
                  style={{
                    color: "red",
                    float: "left",
                    marginLeft: "2%",
                    marginTop: "-2%",
                  }}
                >
                  Vui Lòng nhập Danh Mục Sản Phẩm
                </span>
              ) : (
                ""
              )}
              <br />
              <FormControl
                fullWidth
                className="form-input"
                variant="outlined"
                style={{ margin: "10px" }}
              >
                <InputLabel htmlFor="outlined-adornment-amount">
                  Giá Nhập
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-amount"
                  labelWidth={80}
                  name="priceIn"
                  endAdornment={
                    <span style={{ textDecoration: "underline" }}>đ</span>
                  }
                  value={numeral(this.state.priceIn).format("0,0")}
                  placeholder="Ex : 50000 "
                  onChange={(e) => {
                    var value = numeral(e.target.value);
                    this.setState({ [e.target.name]: value._value });
                  }}
                />
              </FormControl>
              <br />
              <FormControl
                fullWidth
                className="form-input"
                variant="outlined"
                style={{ margin: "10px" }}
              >
                <InputLabel htmlFor="outlined-adornment-amount">
                  Giá Bán
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-amount"
                  labelWidth={70}
                  name="priceOut"
                  endAdornment={
                    <span style={{ textDecoration: "underline" }}>đ</span>
                  }
                  value={numeral(this.state.priceOut).format("0,0")}
                  placeholder="Ex : 50000 "
                  onChange={(e) => {
                    var value = numeral(e.target.value);
                    this.setState({ [e.target.name]: value._value });
                  }}
                />
              </FormControl>
              <br />
              <FormControl
                fullWidth
                className="form-input"
                variant="outlined"
                style={{ margin: "10px" }}
              >
                <InputLabel htmlFor="outlined-adornment-amount">
                  Số Lượng
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-amount"
                  labelWidth={80}
                  name="quantity"
                  placeholder="Ex : 250 "
                  value={numeral(this.state.quantity).format("0,0")}
                  onChange={(e) => {
                    var value = numeral(e.target.value);
                    if (value._value === null) value._value = 0;
                    this.setState({ [e.target.name]: value._value });
                  }}
                />
              </FormControl>
              <br />
              <FormControl
                fullWidth
                className="form-input"
                variant="outlined"
                style={{ margin: "10px" }}
              >
                <InputLabel htmlFor="outlined-adornment-amount">
                  Chiết Khấu
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-amount"
                  labelWidth={90}
                  name="discount"
                  endAdornment={
                    <span style={{ textDecoration: "underline" }}>đ</span>
                  }
                  value={numeral(this.state.discount).format("0,0")}
                  placeholder="Ex : 50000"
                  onChange={(e) => {
                    var value = numeral(e.target.value);
                    if (value._value === null) value._value = 0;
                    this.setState({ [e.target.name]: value._value });
                  }}
                />
              </FormControl>
              <br />
            </div>
          </div>
          <div
            className="pb-5"
            style={{ textAlign: "center", paddingRight: "8%" }}
          >
            <Popup
              trigger={
                <Button
                  variant="contained"
                  style={{
                    width: "120px",
                    border: "1px solid red",
                    backgroundColor: "white",
                    color: "red",
                    float: "left ",
                    marginLeft: "8%",
                  }}
                >
                  Xóa
                </Button>
              }
              modal
              closeOnDocumentClick
              open={this.state.isDelete}
              onOpen={() => {
                this.setState({ isDelete: true });
              }}
              onClose={() => {
                this.setState({ isDelete: false });
              }}
            >
              <div className="header">
                <h4>Xóa Sản Phẩm</h4>
              </div>
              <div className="content">
                <p
                  style={{
                    fontWeight: "bolder",
                    color: "red",
                    fontSize: "16px",
                  }}
                >
                  Lưu ý: thao tác này sẽ xóa vĩnh viễn sản phẩm và không bao giờ
                  khôi phục dưới mọi hình thức.
                </p>
                <p style={{ fontWeight: "bolder", fontSize: "16px" }}>
                  Bạn có chắc muốn xóa {product.prodName} ?
                </p>
              </div>
              <Button
                className="button"
                variant="contained"
                style={{
                  width: "120px",
                  marginRight: "50px",
                  border: "1px solid red",
                  backgroundColor: "white",
                  color: "red",
                }}
                onClick={this.onDelete}
              >
                Xóa
              </Button>
              <Button
                className="button"
                variant="contained"
                style={{ width: "120px" }}
                onClick={() => {
                  this.setState({ isDelete: false });
                }}
              >
                Hủy
              </Button>
            </Popup>
            <Button
              variant="contained"
              color="primary"
              style={{ width: "120px", marginLeft: "20px", float: "right" }}
              onClick={this.onUpdate}
            >
              Cập Nhật
            </Button>
            <Button
              variant="contained"
              style={{ width: "120px", marginLeft: "0px", float: "right" }}
              onClick={this.props.onClick}
            >
              Hủy
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
export default ProductDetail;
