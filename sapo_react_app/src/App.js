import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Sider from "./components/part/Sider";
import Home from "./pages/Home";
import Bill from './components/part/ComponentBill/Bill'
import BillList from './components/part/ComponentBill/BillList/BillList'
import BillListItem from './components/part/ComponentBill/BillList/BillListItem'

import AddCustomer from './pages/CustomerCare/AddNewCustomer'
import CustomerList from './pages/CustomerCare/CustomerList'
import CustomerResponse from './pages/CustomerCare/CustomerResponse'
import FixFeedback from './pages/Fixfeedback'

import CustomerDetail from './pages/CustomerDetail'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import ProductList from "./pages/WarehouseStaff/ProductList";
import CreateProduct from "./pages/WarehouseStaff/CreateProduct";
import Login from "./pages/Login/index";
import ComponentToPrint from "./components/part/ComponentBill/ComponentToPrint";
import { ProtectedRoute } from "./Auth/ProtectedRoute";



class App extends Component {
  constructor(props) {
    super(props);
    this.state = { logined: false };
  }
  componentWillMount(){
var user=JSON.parse(sessionStorage.getItem("user"));

if(user!==null) this.setState({logined: true})
  }
  render() {
    return (
      <div id="full-screen" className={this.state.logined ?"row":""} >
        <Router>
          <Route path="/login" exact>
          {!this.state.logined ?  <Login />:<Redirect to="/" /> }
          </Route>
          {this.state.logined ?<Sider className="col-sm" />:""}
          <div id={this.state.logined ?"main-content":""} className="col-sm">
            <Switch>
              
              <ProtectedRoute component={Home} path="/" exact />
              <ProtectedRoute component={AddCustomer} path="/CustomerCare/AddNewCustomer" exact />
              <ProtectedRoute component={CustomerList} path="/CustomerCare/CustomerList" exact />
              <ProtectedRoute component={CustomerResponse} path="/CustomerCare/CustomerResponse" exact /> 
              <ProtectedRoute component={CustomerDetail} path="/CustomerDetail" exact />
              <ProtectedRoute component={FixFeedback} path="/Fixfeedback" exact />
              <ProtectedRoute component={Bill} path="/Bill" exact />
              <ProtectedRoute component={BillList} path="/BillList" exact />
              <ProtectedRoute component={BillListItem} path="/BillList/:slug.:id" exact />
              <ProtectedRoute component={CreateProduct} path="/WarehouseStaff/AddProduct" exact />
              <ProtectedRoute component={ProductList} path="/WarehouseStaff/ProductList" exact />


            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
