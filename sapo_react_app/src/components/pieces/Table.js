import React, { Component } from "react";
import { withRouter } from "react-router-dom";
// import { makeStyles } from '@material-ui/core/styles';
import {Table} from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
// import {Card} from '@material-ui/core'

class TableContent extends Component {
  renderHeader(header) {
    return (
      <TableRow >
        {header.map((item, i) => {
          return <TableCell key={i}>{item}</TableCell>;
        })}
      </TableRow>
    );
  }

  renderList = (list) => {
    return list.map((item, i) => {
      let { customerCode, customerName, email, phone, customerId } = item;
      // console.log(customerId)
      return (
        <TableRow
          onClick={() =>
            this.props.history.push(
              `/CustomerDetail?id=${customerId}`
            )
          }
          key={i}
          hover={true}
          style={{cursor:"pointer"}}
        >
          <TableCell>{customerCode}</TableCell>
          <TableCell>{customerName}</TableCell>
          <TableCell>{email}</TableCell>
          <TableCell>{phone}</TableCell>
        </TableRow>
      );
    });
  }

  render() {
    let list = this.props.list || [];
    let header = this.props.header || [];
    return (
      <TableContainer component={Paper}>
        <Table size="medium" aria-label="a dense table">
        <TableHead style={{background:"#7abaff"}}>{this.renderHeader(header)}</TableHead>
        <TableBody>{this.renderList(list)}</TableBody>
        </Table>
      </TableContainer>
    );
  }
}

export default withRouter(TableContent);
