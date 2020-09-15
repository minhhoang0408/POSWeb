import React, { Component } from "react";
// import CommentIcon from '@material-ui/icons/Comment';
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Button from "@material-ui/core/Button";
// import Alert from "@material-ui/lab/Alert";
import Axios from "axios";


class UpdateResponseForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      feedbackNote: "",
      customerId: "",
      totalElements: 0,
      //   newFeedback:totalElements+1,
      feedbackCode: "",
      // status: false,
    };
  }

  componentDidMount() {
    let customerId = new URLSearchParams(window.location.search).get("id");
    this.setState({ customerId });

    Axios.request({
      url: `http://localhost:9090/api/admin/feedBack/all?page=0&size=20`,
      method: "GET",
    }).then((res) => {
      let item = res.data.data.totalElements;
      let newFeedback = item + 1;
      let feedbackCode = "FB" + newFeedback;
      // console.log("ITEM", feedbackCode);
      this.setState({ feedbackCode: feedbackCode });
    });
  }

  handleAddFeedback = (e) => {
    e.preventDefault();
    this.setState({ feedbackNote: e.target.value });
  };

  handleClick = () => {
    // console.log(this.props.feedBackId)
  }
  render() {
    // let { status } = this.state;
    // console.log(status)
    return (
      <div className="container">
        <div>
          <TextareaAutosize 
            aria-label="empty textarea"
            value={this.state.feedbackNote}
            placeholder="Viết gì đó vào đây ..."
            style={{
              minHeight: "100px",
              width: "100%",
              marginTop: "10px",
              paddingLeft: "10px",
            }}
            onChange={this.handleAddFeedback}
          />
        </div>
        <Button variant="contained" color="primary" onClick={this.handleClick}>
          Chỉnh sửa
        </Button>
      </div>
    );
  }
}

export default UpdateResponseForm;
