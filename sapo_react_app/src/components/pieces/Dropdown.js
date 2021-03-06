import React, { Component } from 'react'

class Dropdown extends Component {
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
  }
  onChange(e) {
    if (this.props.onChange instanceof Function) {
      let value = e.target.value
      this.props.onChange(value)
    }
  }
  render() {
    let { options, value } = this.props
    //  console.log("opt",options)
    return (
      <select
        variant="success"
        id="dropdown-basic"
        className="c-dropdown"
        value={value}
        onChange={this.onChange}
        style={{ marginTop: "-5px", marginRight: "10px", width: "150px", height: "30px" }}>
        {options.map((option, i) => {
          let optValue, optText
          if (typeof option == 'string') {
            optValue = option
            optText = option
          }
          else {
            optValue = option.value
            optText = option.text
          }
          return (
            <option key={i} value={optValue}>{optText}</option>
          )
        })}

      </select>
    )
  }
}

export default Dropdown
