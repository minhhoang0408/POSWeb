import React, { Component } from "react";
import { Button } from "@material-ui/core";

class TableControls extends Component {
  genpageNumbers(page, maxPage) {
    let result = [page];
    for (let i = 1; i < 3; i++) {
      let pageNumber = page + i;
      if (pageNumber > maxPage) {
        break;
      } else {
        result.push(pageNumber);
      }
    }
    return result;
  }

  toPage(newpage, maxPage) {
    console.log(newpage);
    let currentpage = this.props.page;
    if (newpage !== currentpage && newpage >= 0 && newpage <= maxPage) {
      this.props.setPageConfig({ page: newpage });
      // this.props.callApiList()
      // setTimeout(this.props.callApiList(),1)
    }
  }
  render() {
    let { totalElements, page, size } = this.props;
    let maxPage = Math.ceil(totalElements / size - 1);
    let pageNumbers = this.genpageNumbers(page, maxPage);
    return (
      <div className="table-controls">
        <Button 
        variant="outlined" color="primary"
        onClick={() => this.toPage(page - 1, maxPage)}>&lt;&lt;</Button>
        {pageNumbers.map((number) => {
          let isCurrentpage = number === page;
          let clickHandler = () => this.toPage(number, maxPage);
          return isCurrentpage ? (
            <Button
              variant="contained"
              color='primary'
              key={number}
              onClick={clickHandler}
            >
              {number + 1}
            </Button>
          ) : (
            <Button
            variant="outlined" color="primary"
            key={number} onClick={clickHandler}>
              {number + 1}
            </Button>
          );
        })}
        <Button
        variant="outlined" color="primary"
        onClick={() => this.toPage(page + 1, maxPage)}>&gt;&gt;</Button>
      </div>
    );
  }
}

export default TableControls;
