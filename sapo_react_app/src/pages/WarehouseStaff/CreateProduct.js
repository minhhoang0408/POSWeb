/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import axios from "axios";
import InputLabel from "@material-ui/core/InputLabel";

import FormControl from "@material-ui/core/FormControl";

import OutlinedInput from "@material-ui/core/OutlinedInput";
import ImgUpload from "../../components/pieces/ImgUpload";
import { message } from 'antd';
import { Button } from "@material-ui/core";
import CategoyInputForm from "../../components/pieces/CategoyInputForm";


class CreateProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prodName: "",
      prodCode: "",
      prodCodeCopy:"",
      quantity: 0,
      priceIn: 0,
      priceOut: 0,
      discount: 0,
      imageLink:
        "https://vignette.wikia.nocookie.net/tu-chan-lieu-thien-quan/images/1/12/No-image-news.png/revision/latest?cb=20191022055835&path-prefix=vi",
      catId: 0,
      hasError: false,
      prodCodeError: false,
      prodCodeErrorMess: "",
    };
  }
  componentDidMount() {
    axios
      .get(
        "http://localhost:9090//api/admin/category/?page=0&size=10&name=" +
          this.props.value
      )
      .then((response) => {
        this.setState({
          searchList: response.data.data.content,
        });
      })
      .catch((error) => console.log(error));

    axios
      .get("http://localhost:9090//api/admin/product/product-code/new")
      .then((response) => {
        this.setState({
          prodCode: response.data,
          prodCodeCopy: response.data
        });
      })
      .catch((error) => console.log(error));
  }
  handleClick = () => {
    if (
      (this.state.prodName === "") |
      (this.state.catId === 0) |
      (this.state.catId === void 0) |
      this.state.prodCodeError
    ) {
      this.setState({ hasError: true });
      message.error("Thông Tin Bạn Nhập Không Hợp Lệ. Vui Lòng Nhập Lại");
    } else {
      var confirm = window.confirm("Bạn có muốn thêm sản phẩm này không");
      if (confirm) {
        axios
          .post("http://localhost:9090//api/admin/product/upload", {
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
            if (res.data.result === "uploaded") {
              message.success("Thêm thành công");
              window.location.replace("/WarehouseStaff/ProductList");
            } else alert(res.data);
          });
      }
    }
  };
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
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
            prodCode:this.state.prodCodeCopy
          });
        } else if (this.state.prodCode.substr(0, 3) !== "SKU") {
          this.setState({
            prodCodeError: true,
            prodCodeErrorMess: "Mã Sản Phẩm Bắt Buộc Bắt Đầu Bằng SKU",
          });
        } else {
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
        }
      }
    );
  };
  render() {
    var numeral = require("numeral");
    return (
      <div style={{ textAlign: "center" }}       onScroll={()=>{const scrollY = window.scrollY }}>
        <h4 style={{ marginTop: "20px", marginLeft: "5%" }}>
          {" "}
          Thêm Sản Phẩm{" "}
        </h4>{" "}
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
             
              {this.state.imageLink==="https://vignette.wikia.nocookie.net/tu-chan-lieu-thien-quan/images/1/12/No-image-news.png/revision/latest?cb=20191022055835&path-prefix=vi"?
              (   <div className="overlay"><div className="info">
                    <ImgUpload
                      name="Thêm Ảnh"
                      onChange={(e) => this.setState({ imageLink: e })}
                    ></ImgUpload>
                  </div> </div>):(   <div className="overlay"><div className="info">
                    <ImgUpload
                      name="Đổi Ảnh"
                      onChange={(e) => this.setState({ imageLink: e })}
                    ></ImgUpload>
                  </div>

                  <div className="info">
                    
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
                  )
              }
                </div>
              </div>
            
            <div className="col-lg-6">
        <FormControl
          className="form-input"
          variant="outlined"
          style={{ margin: "10px", width: "90%" }}
        >
          <InputLabel htmlFor="outlined-adornment-amount">
            Tên Sản Phẩm <span style={{ color: "red" }}> * </span>{" "}
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
            marginLeft: "5%",
            marginTop: "-1%",
          }}
        >
          {this.state.hasError & (this.state.prodName === "")
            ? "Vui Lòng Điền Tên Sản Phẩm"
            : ""}{" "}
        </span>{" "}
        <br />
        <FormControl
          className="form-input"
          variant="outlined"
          style={{ margin: "10px", width: "90%" }}
        >
          <InputLabel htmlFor="outlined-adornment-amount">
            Mã Sản Phẩm <span style={{ color: "red" }}> * </span>{" "}
          </InputLabel>{" "}
          <OutlinedInput
            id="outlined-adornment-amount"
            labelWidth={130}
            name="prodCode"
            value={this.state.prodCode}
            placeholder="Ex : SKU123 "
            onChange={this.onProdCodeChange}
            error={this.state.prodCodeError}
          />{" "}
        </FormControl>{" "}
        <span
          style={{
            color: "red",
            float: "left",
            marginLeft: "5%",
            marginTop: "-1%",
          }}
        >
          {this.state.prodCodeError ? this.state.prodCodeErrorMess : ""}{" "}
        </span>{" "}
        <br />
        <FormControl
          className="form-input"
          variant="outlined"
          style={{ margin: "10px", width: "90%" }}
        >
          <InputLabel htmlFor="outlined-adornment-amount">
            Danh Mục Sản Phẩm <span style={{ color: "red" }}> * </span>{" "}
          </InputLabel>{" "}
          <CategoyInputForm
            width="100%"
            onChange={(e) => {
              this.setState({ catId: e.catId });
            }}
            error={
              this.state.hasError &
              ((this.state.catId === 0) | (this.state.catId === void 0))
            }
          >
            {" "}
          </CategoyInputForm>{" "}
        </FormControl>{" "}
        <span
          style={{
            color: "red",
            float: "left",
            marginLeft: "5%",
            marginTop: "-1%",
          }}
        >
          {this.state.hasError &
          ((this.state.catId === 0) | (this.state.catId === void 0))
            ? "Vui Lòng nhập Danh Mục Sản Phẩm"
            : ""}{" "}
        </span>{" "}
        <br />
        <FormControl
          className="form-input"
          variant="outlined"
          style={{ margin: "10px", width: "90%" }}
        >
          <InputLabel htmlFor="outlined-adornment-amount">
            {" "}
            Giá Nhập{" "}
          </InputLabel>{" "}
          <OutlinedInput
            id="outlined-adornment-amount"
            labelWidth={80}
            name="priceIn"
            // eslint-disable-next-line no-undef
            value={numeral(this.state.priceIn).format("0,0")}
            placeholder="Ex : 500000 "
            endAdornment={
              <span style={{ textDecoration: "underline" }}> đ </span>
            }
            onChange={(e) => {
              var value = numeral(e.target.value);
              this.setState({
                [e.target.name]: value._value,
              });
            }}
          />{" "}
        </FormControl>{" "}
        <br />
        <FormControl
          className="form-input"
          variant="outlined"
          style={{ margin: "10px", width: "90%" }}
        >
          <InputLabel htmlFor="outlined-adornment-amount"> Giá Bán </InputLabel>{" "}
          <OutlinedInput
            id="outlined-adornment-amount"
            labelWidth={70}
            name="priceOut"
            value={numeral(this.state.priceOut).format("0,0")}
            placeholder="Ex : 50000 "
            endAdornment={
              <span style={{ textDecoration: "underline" }}> đ </span>
            }
            onChange={(e) => {
              var value = numeral(e.target.value);
              this.setState({
                [e.target.name]: value._value,
              });
            }}
          />{" "}
        </FormControl>{" "}
        <br />
        <FormControl
          className="form-input"
          variant="outlined"
          style={{ margin: "10px", width: "90%" }}
        >
          <InputLabel htmlFor="outlined-adornment-amount">
            {" "}
            Số Lượng{" "}
          </InputLabel>{" "}
          <OutlinedInput
            id="outlined-adornment-amount"
            labelWidth={80}
            name="quantity"
            placeholder="Ex : 250 "
            value={numeral(this.state.quantity).format("0,0")}
            onChange={(e) => {
              var value = numeral(e.target.value);
              if (value._value === null) value._value = 0;
              this.setState({
                [e.target.name]: value._value,
              });
            }}
          />{" "}
        </FormControl>{" "}
        <br />
        <FormControl
          className="form-input"
          variant="outlined"
          style={{ margin: "10px", width: "90%" }}
        >
          <InputLabel htmlFor="outlined-adornment-amount">
            Chiết Khấu{" "}
          </InputLabel>{" "}
          <OutlinedInput
            id="outlined-adornment-amount"
            labelWidth={90}
            name="discount"
            value={numeral(this.state.discount).format("0,0")}
            placeholder="Ex : 5000 "
            endAdornment={
              <span style={{ textDecoration: "underline" }}> đ </span>
            }
            onChange={(e) => {
              var value = numeral(e.target.value);
              if (value._value === null) value._value = 0;
              this.setState({
                [e.target.name]: value._value,
              });
            }}
          />{" "}
        </FormControl>{" "}
        <br />
    
        <Button
          variant="contained"
          color="primary"
          style={{ width: "120px", marginRight: "5%", float: "right" }}
          onClick={this.handleClick}
        >
          Thêm Mới{" "}
        </Button>{" "}
        <Button
          variant="contained"
          style={{ width: "120px", marginRight: "50px", float: "right" }}
          onClick={() => {
            this.props.onChange();
          }}
        >
          Hủy{" "}
        </Button>{" "}
        </div>
        </div>
        </div>
      </div>
    );
  }
}
export default CreateProduct;
