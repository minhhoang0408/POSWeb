/* eslint-disable no-unused-expressions */
/* eslint-disable no-restricted-globals */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
// import CDropdown from "../../pieces/Dropdown";
import CTable from "../../pieces/Table";
import SearchForm from "./SearchForm";
import axios from "axios";
import Pagination from "react-js-pagination";
import createBrowserHistory from "history/createBrowserHistory";
import QueryString from "query-string";
const history = createBrowserHistory();

class CustomerTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      requesting: false,
      listInQueue: false,
      activePage: 1,
      TableHeader: [
        "Mã khách hàng",
        "Tên khách hàng",
        "Email",
        "Số điện thoại",
      ],
      list: [],
      totalElements: 0, // Table Controls
      page: 0,
      size: 10,
      pageRangeDisplayed: 3,
      name: "",
      // filter: {
      //   categoryId: "", //dropdown
      // },
      // optionCategories: [{ value: "", text: "Select category" }],
    };
  }

  componentDidMount() {
    let page = parseInt(QueryString.parse(location.search).page);
    page = isNaN(page) ? 1 : page;
    this.onHandlePageChange(page);
  }

  setPageConfig = (config) => {
    this.setState(config);
  };

  onHandlePageChange = (data) => {
    if (this.state.name !== "") {
      axios
        .get(
          "http://localhost:9090/api/admin/customer?page=" +
            String(data - 1) +
            "&size=" +
            String(this.state.size) +
            "&name=" +
            String(this.state.name)
        )
        .then((res) => {
          this.setState({
            activePage: data,
            list: res.data.data.content,
            totalElements: res.data.data.totalElements,
          });
          history.push(
            "/CustomerCare/CustomerList/?page=" +
              data +
              "&name=" +
              this.state.name
          );
        });
    } else {
      axios
        .get(
          "http://localhost:9090/api/admin/customer/all-active?page=" +
            String(data - 1) +
            "&size=" +
            String(this.state.size)
        )
        .then((res) => {
          this.setState({
            activePage: data,
            list: res.data.data.content,
            totalElements: res.data.data.totalElements,
          });
          history.push("/CustomerCare/CustomerList/?page=" + data);
        });
    }
  };
  onSearch = (e) => {
    //  e.preventDefault()

    this.setState({ name: e }, () => {
      this.onHandlePageChange(1);
    });
  };

  render() {
    let {
      list,
      TableHeader,
      totalElements,
      // activePage,
      size,
      pageRangeDisplayed,
      name,
    } = this.state;
    return (
      <div className="c-table-group">
        <div style={{ marginBottom: "10px" }}>
          <SearchForm
            value={name}
            onChange={this.onSearch}
            placeholder="Nhập tên khách hàng hoặc số điện thoại"
          />
        </div>
        <div>
          <CTable list={list} header={TableHeader} />
        </div>

        <div style={{padding:"10px",display:"flex",justifyContent:"center"}}>
          {
          totalElements < size 
          ? ""
          :
          <Pagination
            style={{ textAlign: "center" }}
            activePage={this.state.activePage}
            itemsCountPerPage={size}
            totalItemsCount={totalElements}
            pageRangeDisplayed={pageRangeDisplayed}
            onChange={this.onHandlePageChange}
            itemClass="page-item"
            linkClass="page-link"
          />}
        </div>
      </div>
    );
  }
}

export default CustomerTable;
