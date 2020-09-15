import React, { Component } from "react";
import axios from "axios";
import CTitle from "../../components/pieces/Title";
import CSpacer from "../../components/pieces/Spacer";
import { Input } from "antd";
import { Button } from "@material-ui/core";
// import{Alert} from "@material-ui/"
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
const { TextArea } = Input;

class Fixfeedback extends Component {
  constructor(props) {
    super(props);

    this.state = {
      feedbackId: null,
      feedbackNote: null,
      customerId: null,
      open:false
    };
  }

  componentDidMount() {
    let feedbackId = new URLSearchParams(window.location.search).get("id");
    this.setState({
      feedbackId,
    });

    axios
      .request({
        url: `http://localhost:9090/api/admin/feedback/${feedbackId}`,
        method: "GET",
      })
      .then((res) => {
        let customerId = res.data.data.customer.customerId;
        this.setState({ customerId: customerId });
        let item = res.data.data.feedbackNote;
        this.setState({ feedbackNote: item });
        // console.log(item);
      });
  }

  handleFix = (e) => {
    this.setState({ feedbackNote: e.target.value });
  };

  handleClick = () => {
    let newUpdateFb = {
      feedbackId: this.state.feedbackId,
      feedbackNote: this.state.feedbackNote,
      customerId: this.state.customerId,
    };

    // console.log(newUpdateFb);

    axios
      .put("http://localhost:9090/api/admin/feedback/update", newUpdateFb)
      .then(() => {
        // alert("Update thành công");
        // window.reload()
        this.setState({open:true})
    window.location.replace(`/CustomerDetail/?id=${this.state.customerId}`)
      })
      .catch((err) => {
       
        this.setState({open:true})
      });
  };
  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({open:false})
  };
  render() {
    let { feedbackNote,open } = this.state;
    // console.log(feedbackNote);
    return (
      <div>
        <CTitle>
          <h3>Chỉnh sửa feedback</h3>
        </CTitle>
        <CSpacer />
        <TextArea
          rows={10}
          value={feedbackNote}
          onChange={this.handleFix}
          placeholder="Nhập gì đó ở đây"
        />
        <div style={{display:"flex", justifyContent:"flex-end", padding:"10px"}} >
        <Button variant="contained" color="primary" onClick={this.handleClick}
    
        >
          Chỉnh sửa
        </Button>
        <Snackbar open={open} autoHideDuration={6000} onClose={this.handleClose}>
        <Alert onClose={this.handleClose} severity="success">
    Sửa thành công
        </Alert>
      </Snackbar>
        </div>
      </div>
    );
  }
}

export default Fixfeedback;
