/* eslint-disable no-unused-expressions */
/* eslint-disable no-restricted-globals */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import CreateProduct from "./CreateProduct";
import ProductItem from "../../components/pieces/ProductItem";

import Popup from "reactjs-popup";
import ProductSearch from "../../components/part/Product/ProductSearch";
import Pagination from "react-js-pagination";
import Button from "@material-ui/core/Button";
import { Empty } from "antd";
import createBrowserHistory from "history/createBrowserHistory";

import axios from "axios";

import QueryString from "query-string";
const history = createBrowserHistory();
class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      Products: [],
      itemsCountPerPage: 10,
      totalItemsCount: 0,
      pageRangeDisplayed: 10,
      prodKey: "",
      cateKey: "",
      quantity: "",
      isShow: -1,
      isCreate: false,


      search: "",
    
  }}
  componentDidMount() {
    var page = parseInt(QueryString.parse(location.search).page);
    var prodName = QueryString.parse(location.search).product_name;
    var quantity = QueryString.parse(location.search).quantity;
    var cateKey = QueryString.parse(location.search).category_key;
    this.setState(
      {
        activePage: isNaN(page) ? 1 : page,
        prodKey: prodName === void 0 ? "" : prodName,
        cateKey: cateKey === void 0 ? "" : cateKey,
        quantity: quantity === void 0 ? "" : quantity,
      },

      () => {
       if (this.state.prodKey !== "") {
          axios
            .get(
              "http://localhost:9090//api/admin/product/?page=" +
                (this.state.activePage - 1) +
                "&size=" +
                this.state.itemsCountPerPage +
                "&name=" +
                this.state.prodKey
            )
            .then((response) => {
              if (
                response.data.result === "not found" &&
                this.state.activePage > 1
              ) {
                location.replace(
                  "/WarehouseStaff/ProductList/?page=" +
                    (this.state.activePage - 1) +
                    "&product_name=" +
                    this.state.prodKey
                );
              } else {
                this.setState({
                  keyword: this.state.prodKey,
                  Products: response.data.data.content,
                  totalItemsCount: response.data.data.totalElements,
                });
              }
            })
            .catch((error) => console.log(error));
        } else {
          axios
            .get(
              "http://localhost:9090//api/admin/product/all/?page=" +
                String(this.state.activePage - 1) +
                "&size=" +
                String(this.state.itemsCountPerPage)
            )
            .then((response) => {
              if (
                response.data.result === "not found" &&
                this.state.activePage > 1
              )
                location.replace(
                  "/WarehouseStaff/ProductList/?page=" +
                    (this.state.activePage - 1)
                );
              else {
                this.setState({
                  Products: response.data.data.content,
                  totalItemsCount: response.data.data.totalElements,
                });
            
              }
            })
            .catch((error) => console.log(error));
        }
      }
    );
  }
  onSearchChange = (e) => {
    this.setState({ prodKey: e.target.value,activePage:1 });
    axios
      .get(
        "http://localhost:9090/api/admin/product/?page=0&size=10&name=" +
          e.target.value
      )
      .then((response) => {
        this.setState({
          Products: response.data.data.content,
          totalItemsCount: response.data.data.totalElements,
        });
      })
      .catch((error) => console.log(error));
  };
  onHandlePageChange = (data) => {
   
    if (this.state.prodKey !== "") {
      axios
        .get(
          "http://localhost:9090//api/admin/product/?page=" +
          (data - 1) +
          "&size=" +
          this.state.itemsCountPerPage +
          "&name=" +
          this.state.prodKey
        )
        .then((response) => {
          this.setState({
            activePage: data,
            Products: response.data.data.content,
            totalItemsCount: response.data.data.totalElements,
          });
          history.push(
            "/WarehouseStaff/ProductList/?page=" +
              data +
              "&product_name=" +
              this.state.prodKey
          );
        });
    } 
    else {
      axios
        .get(
          "http://localhost:9090//api/admin/product/all/?page=" +
            String(data - 1) +
            "&size=" +
            String(this.state.itemsCountPerPage)
        )
        .then((response) => {
          this.setState({
            activePage: data,
            Products: response.data.data.content,
            totalItemsCount: response.data.data.totalElements,
          });
          history.push("/WarehouseStaff/ProductList/?page=" + data);
        })
        .catch((error) => console.log(error));
    }
  };
  onShowDetail = (data) => {
    this.setState({ isShow: this.state.isShow === data ? -1 : data });
  };

  render() {
    var { Products } = this.state;
console.log(history)
    if (Products === undefined) {
      var element = (
        <td colSpan={8} style={{ textAlign: "center" }}>
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="Không có sản phẩm"
          />
        </td>
      );
    } else {
      element = Products.map((product, index) => {
        return (
          <ProductItem
            onShowDetail={this.onShowDetail}
            key={index}
            index={index}
            product={product}
            page={this.state.activePage}
          />
        );
      });
    }

    let {
   

      itemsCountPerPage,
      totalItemsCount,
      pageRangeDisplayed,
    } = this.state;
    return (
      <div>
        <div className="row mt-15">
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <div>
              <Popup
                trigger={
                  <Button
                    color="primary"
                    variant="contained"
                    component="span"
                    style={{ float: "right" }}
                  >
                    Thêm Mới
                  </Button>
                }
                modal
                closeOnDocumentClick
                contentStyle={{
                  width: "75%",
                  minHeight: "100vh",
                  marginLeft: "20%",
                }}
                open={this.state.isCreate}
                onOpen={() => {
                  this.setState({ isCreate: true });
                }}
          
              >
                <CreateProduct
                  onChange={(e) => {
                    this.setState({ isCreate: false });
                  }}
                />
              </Popup>

              <h4 style={{ marginTop: "20px", marginBottom: "40px" }}>
                Danh Sách Sản Phẩm
              </h4>
            </div>

            <ProductSearch
              onChange={this.onSearchChange}
              keyword={this.state.prodKey}
              placeholder="Tìm kiếm theo tên hoặc mã sản phẩm"
            />
            <div style={{ float: "right", marginTop: "2%" }}>
              Tổng số{" "}
              {this.state.itemsCountPerPage < this.state.totalItemsCount
                ? this.state.itemsCountPerPage
                : this.state.totalItemsCount}{" "}
              trong số {this.state.totalItemsCount} Sản Phẩm
            </div>
            <table
              className="c-table table  mt-5"
              style={{ textAlign: "center", background: "white" }}
            >
              <thead className="table-primary" style={{ fontWeight: "bolder" }}>
                <tr>
                  <td>STT</td>
                  <td>Hình Ảnh</td>
                  <td>Mã Sản Phẩm</td>

                  <td>Tên Sản Phẩm</td>

                  <td style={{ width: "15%" }}>Số Lượng Tồn Kho</td>
                  <td style={{ width: "15%", textAlign: "right" }}>Giá Nhập</td>
                  <td style={{ width: "15%", textAlign: "right" }}>Giá Bán</td>
                  <td style={{ width: "10%", textAlign: "right" }}>
                    Chiết Khấu
                  </td>
                </tr>
              </thead>

              <tbody>{element}</tbody>
            </table>
            {this.state.totalItemsCount < this.state.itemsCountPerPage ||
            Products === undefined ? (
              ""
            ) : (
              <div className="pagination" style={{ justifyContent: "center" }}>
                <Pagination
                  activePage={this.state.activePage}
                  itemsCountPerPage={itemsCountPerPage}
                  totalItemsCount={totalItemsCount}
                  pageRangeDisplayed={pageRangeDisplayed}
                  onChange={this.onHandlePageChange}
                  itemClass="page-item"
                  linkClass="page-link"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default ProductList;