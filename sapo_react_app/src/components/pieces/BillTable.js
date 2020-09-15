import React, { Component } from "react";
import { Table } from "@material-ui/core";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Button } from "@material-ui/core";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {withRouter} from 'react-router-dom'

class BTable extends Component {
  renderHeader(header) {
    return (
      <TableRow>
        {header.map((item, i) => {
          return (
            <TableCell style={{ background:"#7abaff" }} key={i}>
              {item}
            </TableCell>
          );
        })}
      </TableRow>
    );
  }

  renderList(list) {
    return list.map((item, i) => {
      let {
        billCode,
        totalPrice,
        // discount,
        cashOut,
        cashIn,
        createOn,
        billNote,
        billId
      } = item;
      var date=new Date(createOn);
      let formattedTime = Intl.DateTimeFormat('vi-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(date);
      return (
        <TableRow key={i} onClick ={()=>{
          console.log(this.props)
          this.props.history.push("/BillList/" + billCode + "." + billId)
        }}>
          <TableCell>{billCode}</TableCell>
          <TableCell style={{width:"150px"}}>{totalPrice}</TableCell>
          {/* <TableCell style={{width:"150px"}}>{discount}</TableCell> */}
          <TableCell style={{width:"150px"}}>{cashIn}</TableCell>
          <TableCell>{cashOut}</TableCell>
          {billNote === null ? (
            <TableCell style={{width:"550px"}}>Không có lưu ý gì cụ thể </TableCell>
          ) : (
            <TableCell style={{width:"550px"}}>{billNote}</TableCell>
          )}
          <TableCell>{formattedTime}</TableCell>
        </TableRow>
      );
    });
  }

  render() {
    let header = this.props.header || [];
    let list = this.props.list || [];
    return (
      <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table"></Table>
        <TableHead style={{background:"#7abaff"}}>{this.renderHeader(header)}</TableHead>
        <TableBody>{this.renderList(list)}</TableBody>
      </TableContainer>
    );
  }
}

export default withRouter(BTable);
