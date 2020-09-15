import React from "react"; //  { useState, useEffect }
import { Grid } from "@material-ui/core";
import Controls from "../../../components/controls/Controls";
import { useForm, Form } from "../../../components/useForm";
// import * as employeeService from "../../services/employeeService";
import TextField from "@material-ui/core/TextField";
import Axios from "axios";
// import FormLabel from "@material-ui/core/FormLabel";
// import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { Card } from "@material-ui/core";
import CTitle from '../../../components/pieces/Title'
import CSpacer from '../../../components/pieces/Spacer'
const genderItems = [
  { id: "Nam", title: "Nam" },
  { id: "Nữ", title: "Nữ" },
  { id: "Khác", title: "Khác" },
];

const initialFValues = {
  id: 0,
  customerName: "",
  email: "",
  phone: "",
  address: "",
  gender: "Nam",
  departmentId: "",
  dob: new Date(),
  isPermanent: false,
};

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function EmployeeForm() {
  const [open, setOpen] = React.useState(false);

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("customerName" in fieldValues)
      temp.customerName = fieldValues.customerName
        ? ""
        : "Không thể bỏ trống tên khách hàng";
    if ("email" in fieldValues)
      temp.email = /$^|.+@.+..+/.test(fieldValues.email)
        ? ""
        : "Email không hợp lệ";
    if ("phone" in fieldValues)
      temp.phone =
      (fieldValues.phone.length<12 && fieldValues.phone.length) > 9 ? "" : "Số điện thoại ít nhất có 10 số";
    if ("phone" in fieldValues)
      temp.phone = /(03|07|08|09|01[2|6|8|9])+([0-9]{8})\b/.test(
        fieldValues.phone
      )
        ? ""
        : "Số điện thoại không hợp lệ";
    setErrors({
      ...temp,
    });

    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };

  const {
    values,
    // setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
  } = useForm(initialFValues, true, validate);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // employeeService.insertEmployee(values)
      resetForm();
    }
    let newCustomer = {
      customerName: values.customerName,
      phone: values.phone,
      email: values.email,
      address: values.address,
      gender: values.gender,
      dob: values.dob,
      //   isPermanent: values.isPermanent,
      // customerCode: this.state.customerCode,
    };
    // console.log("KH moi info", newCustomer);
    (values.customerName === "" && values.phone === "") ||
    errors.phone ||
    errors.email 

      ? // ? alert(`Kiểm tra lại các trường còn thiếu hoặc sai sót`)
        setOpen(true)
      : Axios.post(
          "http://localhost:9090/api/admin/customer/upload",
          newCustomer
        )
          .then(() => {
            // alert("Thêm khách hàng thành công");
            setOpen(true);
            window.location.replace("/CustomerCare/CustomerList");
          })
          .catch((err) => {
            setOpen(true);
            // alert("Chưa thêm được khách hàng")
          });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Card>
      <CTitle >
        <h1 style={{margin:10,padding:10}}>Thêm khách hàng mới</h1>
      </CTitle>
      <CSpacer />
      <Form onSubmit={handleSubmit}>
        <Grid container>
          <Grid item xs={6}>
            <Controls.Input
              name="customerName"
              label="Tên khách hàng"
              value={values.customerName}
              onChange={handleInputChange}
              error={errors.customerName}
            />
            <Controls.Input
              label="Email"
              name="email"
              value={values.email}
              onChange={handleInputChange}
              error={errors.email}
            />
            <Controls.Input
              label="Số điện thoại"
              name="phone"
              value={values.phone}
              onChange={handleInputChange}
              error={errors.phone}
            />
            <Controls.Input
              label="Địa chỉ"
              name="address"
              value={values.address}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <Controls.RadioGroup
              name="gender"
              label="Giới tính"
              value={values.gender}
              onChange={handleInputChange}
              items={genderItems}
            />
            {/* <FormLabel style={{ marginTop: "7px" }}>
            Sinh nhật khách hàng
          </FormLabel> */}
            <TextField
              label="Sinh nhật khách hàng"
              id="date"
              type="date"
              name="dob"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              value={values.dob}
              onChange={handleInputChange}
              style={{
                marginLeft: "10px",
              }}
            />
            <Controls.Checkbox
              name="isPermanent"
              label="Xác nhận chính xác thông tin"
              value={values.isPermanent}
              onChange={handleInputChange}
            />

            <div>
              <Controls.Button
                text="Tạo lại"
                color="default"
                onClick={resetForm}
              />
              {values.isPermanent === false ? (
                <Controls.Button type="submit" text="Thêm mới" disabled />
              ) : (
                <Controls.Button type="submit" text="Thêm mới" />
              )}
              {errors.phone ? (
                <div>
                  <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                  >
                    <Alert onClose={handleClose} severity="error">
                      Đã có lỗi xảy ra
                    </Alert>
                  </Snackbar>
                </div>
              ) : (
                <div>
                  <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                  >
                    <Alert onClose={handleClose} severity="success">
                      Thêm mới khách hàng thành công
                    </Alert>
                  </Snackbar>
                </div>
              )}
            </div>
          </Grid>
        </Grid>
      </Form>
    </Card>
  );
}
