import React, { Component } from "react";
import { DebounceInput } from "react-debounce-input";

class SearchForm extends Component {
  onChange = (e) => {
    // console.log(e.target.value);
    if (this.props.onChange instanceof Function) {
      let value = e.target.value;
      this.props.onChange(value);
    }
  };

  render() {
    let { value, placeholder } = this.props;
    return (
      <form
        className="search-form"
        style={{ width: "calc(100% - 0px)"}}
      >
        <DebounceInput
          minLength={1}
          debounceTimeout={500}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
          value={value}
          placeholder={placeholder}
          style={{
            width: "100%",
            border: "0.5px solid #ced4da ",
            height: "30px",
            borderRadius: "3px",
          }}
        />
      </form>
    );
  }
}

export default SearchForm;
