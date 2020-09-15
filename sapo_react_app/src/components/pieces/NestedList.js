/* eslint-disable no-unused-expressions */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable no-undef */
import React,{useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
// import InboxIcon from "@material-ui/icons/MoveToInbox";
import StorefrontRoundedIcon from '@material-ui/icons/StorefrontRounded';
import AddShoppingCartRoundedIcon from '@material-ui/icons/AddShoppingCartRounded';
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
// import StarBorder from "@material-ui/icons/StarBorder";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { Link } from "react-router-dom";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    background: "#202d3f",
    textAlign: "center",
    color: "white",
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function NestedList() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(1);
  const [open1, setOpen1] = React.useState(1);

  useEffect(() => {
    var open=parseInt(sessionStorage.getItem("siderNumber"));
    var open1=parseInt(sessionStorage.getItem("siderNumber1"));
  
  setOpen(open===null?1:open);
  setOpen1(open1===null?1:open1);
   
});
  const handleClick1 = () => {
    setOpen(open === 1 ? 0 : 1);
    sessionStorage.setItem("siderNumber",1);
  
    setOpen1(1);
    window.location.replace("/Bill");
  };
  const handleClick2 = () => {
    setOpen(open === 2 ? 0 : 2);
    sessionStorage.setItem("siderNumber",2)
    sessionStorage.setItem("siderNumber1",1)
   
  };
  const handleClick3 = () => {
    setOpen(open === 3 ? 0 : 3);
    sessionStorage.setItem("siderNumber",3)
    sessionStorage.setItem("siderNumber1",1)

  };

  const onClick1 = () => {
    setOpen1(1);
    sessionStorage.setItem("siderNumber1",1)
  };
  const onClick2 = () => {
    setOpen1(open === 2 ? 0 : 2);
    sessionStorage.setItem("siderNumber1",2)
  };

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader
          component="div"
          id="nested-list-subheader"
          style={{ color: "white" ,height:"100%" }}
        >
     
        </ListSubheader>
      }
      className={classes.root}
    >
      <ListItem button onClick={handleClick1} >
        <ListItemIcon>
          <AddShoppingCartRoundedIcon style={{ color: "white" }} />
        </ListItemIcon>
        <ListItemText primary="Bán hàng" />
        {open === 1 ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open === 1} timeout="auto" unmountOnExit>
        
        <List component="div" disablePadding>
          <Link to="/Bill" style={{ color: 'white' }}>
          <ListItem button className={classes.nested}  onClick={onClick1}  id={open===1&&open1===1?"active":""}>
            <ListItemText primary="Tạo Đơn" style={{paddingLeft:"40px" }} />
          </ListItem>
          </Link>
          <Link to="/BillList" style={{ color: 'white' }}>
          <ListItem button className={classes.nested}  onClick={onClick2}  id={open===1&&open1===2?"active":""}>
            <ListItemText primary="Đơn Hàng" style={{paddingLeft:"40px"}} />
          </ListItem>
          </Link>
        </List>
      </Collapse>
      <Link to="/CustomerCare/CustomerList" style={{ color: "white" }}>
      <ListItem button onClick={handleClick2} id={open===2?"active":""}>
        <ListItemIcon>
          <AccountCircle style={{ color: "white" }} />
        </ListItemIcon>
        <ListItemText primary="Khách Hàng"/></ListItem>
      </Link>
    <Link to=   "/WarehouseStaff/ProductList/?page=1">
      <ListItem  button onClick={handleClick3} id={open===3?"active":""}>
        <ListItemIcon>
          <StorefrontRoundedIcon style={{ color: "white" }} />
        </ListItemIcon>
        <ListItemText primary="Sản Phẩm" style={{color:"white"}} />
     
      </ListItem>
      </Link>
  
      <ListItem  style={{position:"fixed",bottom:"0 ",borderTop:"1px solid white"}} button onClick={()=>{sessionStorage.removeItem("user");window.location.reload()}} >
        <ListItemIcon>
          <ExitToAppIcon style={{ color: "white" }} />
        </ListItemIcon>
        <ListItemText primary="Đăng Xuất" style={{color:"white"}} />
     
      </ListItem>
    </List>
  );
}