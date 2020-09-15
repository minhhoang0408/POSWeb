import React, { Component } from "react";
import { Button } from "@material-ui/core";
import Popup from "reactjs-popup";
import axios from "axios";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";

import FormControl from "@material-ui/core/FormControl";

class CategoyInputForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchList: [],
      name: "",
      catName: "",
      brand: "",
      isCreateCat: false,
      isChange: false,
      isOpen: false,
      error: "",
      catCreateError:false,
    };
  }
  componentDidMount() {
    this.setState({ name: this.props.catName });
    axios
      .get(
        "http://localhost:9090/api/admin/category/?page=0&size=5&name=" +
          this.state.name
      )
      .then((response) => {
        this.setState({
          searchList: response.data.data.content,
        });
      })
      .catch((error) => console.log(error));
  }
  onChange = (e) => {
    this.setState({ name: e.target.value });

    axios
      .get(
        "http://localhost:9090/api/admin/category/?page=0&size=5&name=" +
          e.target.value
      )
      .then((response) => {
        this.setState({
          searchList: response.data.data.content,
        });
      })
      .catch((error) => console.log(error));
    this.props.onChange(e);
  };
  onClick = (e) => {
    this.setState({ name: e.catName + " " + e.brand, isOpen: false });
    this.props.onChange(e);
  };
  onChangeCat = (e) => {
    e.preventDefault();

    this.setState({
      [e.target.name]: e.target.value,
    error:""
    });
  };
  onAddCat = () => {
    if ((this.state.catName === "") | (this.state.brand === ""))
      this.setState({ error: "Vui lòng nhập đủ thông tin" });
    else {
      var confirm = window.confirm("Bạn có muốn thêm category này không");
      if (confirm) {
     
        axios
          .post("http://localhost:9090/api/admin/category/upload", {
            catName: this.state.catName,
            brand: this.state.brand,
            catNote: "",
          })
          .then((res) => {
            if (res.data.result === "uploaded") {
              alert("Thêm thành công");
              this.setState({ isCreateCat: false });
            } else alert("error");
         
          })
          .catch((error) =>{
            if(error.response.data.data==="Save category fail!"){this.setState({catCreateError:true})}
          })
          ;
    
    }}
  };

  render() {
    var { searchList } = this.state;
    var SearchElement =
      searchList === void 0
        ? null
        : searchList.map((category, index) => {
            return (
              <div
                className="cateList"
                key={index}
                style={{
                  textAlign: "left",
                  margin: "10px 10px",
                  cursor: "pointer",
                }}
                onClick={(e) => {
                  e.preventDefault();
                  e.target.value = category.catID;
                  this.setState({
                    name: category.catName + " " + category.brand,
                  });
                  this.onClick(category);
                }}
              >
                <span
                  onClick={(e) => {
                    e.preventDefault();
                    e.target.value = category.catID;
                    this.setState({
                      name: category.catName + " " + category.brand,
                    });
                    this.onClick(category);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  Loại: {category.catName} - Thương Hiệu:{category.brand}
                </span>
              </div>
            );
          });

    return (
      <Popup
        trigger={
          <OutlinedInput
            id="outlined-adornment-amount"
            labelWidth={180}
            name="catId"
            placeholder="Ex : Áo Dài Truyền thống "
            value={this.state.name}
            onChange={this.onChange}
            error={this.props.error}
            autoComplete="off"
          />
        }
        on="focus"
        position="bottom center"
        contentStyle={{ width: this.props.width, textAlign: "center" }}
        open={this.state.isOpen}
        onOpen={() => {
          this.setState({ isOpen: true });
        }}
        closeOnDocumentClick
      >
        <span>
          <div>
            <div style={{ color: "red" }}>
              Lưu ý: Tìm theo loại (Quần , áo...) hoặc thương hiệu (Adidas).{" "}
            </div>{" "}
          </div>
          <Popup
            trigger={
              <span>
                {" "}
                <i class="fa fa-plus-circle fa-2x" aria-hidden="true" style={{color: "blue",cursor:"pointer" }}></i> 
              </span>
            }
            modal
            closeOnDocumentClick
            open={this.state.isCreateCat}
            onOpen={() => {
              this.setState({ isCreateCat: true });
            }}
            onClose={() => {
              this.setState({ isCreateCat: false });
            }}
          >
            <div className="header">
              <h4> Thêm Loại Sản Phẩm</h4>
              <div style={{ color: "red" }}>{this.state.error}</div>
            </div>
            <div className="content">
              <FormControl
                className="form-input"
                variant="outlined"
                style={{ margin: "10px", width: "90%" }}
              >
                <InputLabel htmlFor="outlined-adornment-amount">
                  Loại
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-amount"
                  labelWidth={30}
                  value={this.state.catName}
                  name="catName"
                  error={this.state.error&&(this.state.catName==="")}
                  onChange={this.onChangeCat}
                  placeholder="Ex : Quần "
                />
              </FormControl>
              <br />
              <FormControl
                className="form-input"
                variant="outlined"
                style={{ margin: "10px", width: "90%" }}
              >
                <InputLabel htmlFor="outlined-adornment-amount">
                  {" "}
                  Nhãn Hàng
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-amount"
                  labelWidth={80}
                  value={this.props.brand}
                  name="brand"
                  error={this.state.error&&(this.state.brand==="")}
                  onChange={this.onChangeCat}
                  placeholder="Ex : Quần "
                />
              </FormControl>
              
              <br />
{this.state.catCreateError?(<div style={{textAlign:"center",color: "red",fontSize:"16px" ,marginBottom:"10px"}}>Danh mục đã tồn tại</div>):""}
              <Button
                onClick={this.onAddCat}
                className="button"
                variant="contained"
                color="primary"
                style={{ width: "160px" }}
              >
                Thêm mới
              </Button>
            </div>
          </Popup>

          {SearchElement !== null ? SearchElement : ""}
        </span>
      </Popup>
    );
  }
}
export default CategoyInputForm;