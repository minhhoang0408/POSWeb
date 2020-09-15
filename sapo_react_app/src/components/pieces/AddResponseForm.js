import React, { Component } from "react";
// import CommentIcon from '@material-ui/icons/Comment';
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Button from "@material-ui/core/Button";
// import Alert from "@material-ui/lab/Alert";
import Axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import{Alert} from "@material-ui/lab"

class AddResponseForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      feedbackNote: "",
      customerId: "",
      totalElements: 0,
      //   newFeedback:totalElements+1,
      feedbackCode: "",
      // status: false,
      open: false,
      err: "",
    };
  }
  Alert (props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  };
  componentDidMount() {
    let customerId = new URLSearchParams(window.location.search).get("id");
    this.setState({ customerId });

    Axios.request({
      url: `http://localhost:9090/api/admin/feedback/all?page=0&size=20`,
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
    let FeedbackForm = {
      feedbackNote: this.state.feedbackNote,
      customerId: this.state.customerId,
      feedbackCode: this.state.feedbackCode,
    };
    // console.log(FeedbackForm);
    Axios.request({
      url: "http://localhost:9090/api/admin/feedback/upload",
      method: "POST",
      data: FeedbackForm,
    })
      .then(() => {
        // alert("Thêm feedback thành công");
        this.setState({ open: true });
        window.location.reload();
        // this.setState({ status: true });
      })
      .catch((err) => {
        this.setState({ open: true, err: err });
        // this.setState({ status: false });
      });
  };
  // handleClick=()=>{
  //   this.setState({open:true})
  // }
  handleClose = (e, reason) => {
    e.preventDefault();
    if (reason === "clickaway") {
      return;
    }
    this.setState({ open: false });
  };
  render() {
    let { open, err } = this.state;
    // let { status } = this.state;
    // console.log(status)
    return (
      <div className="container">
        <div>
          <TextareaAutosize
            aria-label="empty textarea"
            placeholder="Thêm phản hồi"
            style={{
              minHeight: "100px",
              width: "100%",
              marginTop: "10px",
              paddingLeft: "10px",
            }}
            onChange={this.handleAddFeedback}
          />
        </div>
        <Button variant="contained" color="primary" onClick={this.handleClick} style={{display:"flex",justifyContent:"flex-end"}}>
          Thêm
        </Button>
        {err ? (
          <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={this.handleClose}
        >
          <Alert onClose={this.handleClose} severity="error">
            Không thể thêm phản hồi
          </Alert>
        </Snackbar>
        ) : (
          <Snackbar
            open={open}
            autoHideDuration={10000}
            onClose={this.handleClose}
          >
            <Alert onClose={this.handleClose} severity="success">
              Thêm phản hồi thành công
            </Alert>
          </Snackbar>
        )}
      </div>
    );
  }
}

export default AddResponseForm;
