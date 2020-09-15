import React, { Component } from "react";
import FixFeedBackModal from "../part/FixFeedbackModal";
import { withRouter } from "react-router-dom";
import { Table } from "@material-ui/core";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
// import FixFeedBackModalForm from "../pieces/FixFeedBackModalForm";

class RenderFeedback extends Component {
  handleClick = () => {
    // console.log("feedback", this.state.feedbackId);
  };

  renderHeader(header) {
    return (
      <TableRow>
        {header.map((item, i) => {
          return (
            <TableCell style={{background:"#7abaff" }} key={i}>
              {item}
            </TableCell>
          );
        })}
      </TableRow>
    );
  }

  renderList(list) {
    return list ? (
      list.map((item, i) => {
        let { createOn, feedbackNote, feedbackId } = item;
        var date=new Date(createOn);
        let formattedTime = Intl.DateTimeFormat('vi-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(date);
        // console.log("feed back",feedbackId)
        // let date = createOn.getDay()
        return (
          <TableRow  key={i}>
            <TableCell style={{ width: "350px" }}>{formattedTime}</TableCell>
            <TableCell style={{ width: "900px" }}>{feedbackNote}</TableCell>

            {/* <FixFeedBackModal style={{verticalAlign:"middle"}} feedbackId = {feedbackId}/> */}
            <TableCell>
              <Button
                variant="contained"
                color="primary"
                onClick={() =>
                  this.props.history.push(`/Fixfeedback?id=${feedbackId}`)
                }
              >
                Sửa
              </Button>
            </TableCell>
          </TableRow>
        );
      })
    ) : (
      <div> Khách hàng chưa để lại feedback nào. </div>
    );
  }

  render() {
    let list = this.props.list || [];
    let header = this.props.header || [];
    return (
      <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table"></Table>
        <TableHead>{this.renderHeader(header)}</TableHead>
        <TableBody>{this.renderList(list)}</TableBody>
      </TableContainer>
    );
  }
}

export default withRouter(RenderFeedback);
