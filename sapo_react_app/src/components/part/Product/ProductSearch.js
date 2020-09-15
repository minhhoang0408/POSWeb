import React, { Component } from "react";
import Popup from "reactjs-popup";
import axios from "axios";
import { DebounceInput } from "react-debounce-input";

class ProductSearch extends Component {
  onChange = (e) => {
    this.props.onChange(e);
  };
  onKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      window.location =
        "/WarehouseStaff/ProductList/?page=1&product_name=" + e.target.value;
    }
  };

  render() {
    return (
      <form
        className="search-form"
        style={{ display: "inline-block", width: "100%" }}
      >
        <DebounceInput
          minLength={1}
          debounceTimeout={500}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
          value={this.props.keyword}
      
          placeholder={this.props.placeholder}
          style={{ width: "100%",border:"0.5px solid #ced4da ",height: "30px" ,borderRadius: "3px"}}
        />
      </form>
    );
  }
}

export default ProductSearch;
