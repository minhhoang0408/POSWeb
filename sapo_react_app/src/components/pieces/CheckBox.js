import React, { Component } from "react";
class Checkbox extends Component {

  onClick=(data)=>{this.props.onClick(data.target)

  }
  render() {
  
    return (
      <div style={{ marginLeft: "20px" }}>
        <input
          type="checkbox"
          id={this.props.name}
          name={this.props.name}
         value={this.props.checked}
          defaultChecked={this.props.checked}
          onClick={this.onClick}
        />
        <label  style={{ marginLeft: "5px" }}>
          Tên Sản Phẩm
        </label>
        <br />
      </div>
    );
  }
}

export default Checkbox;
