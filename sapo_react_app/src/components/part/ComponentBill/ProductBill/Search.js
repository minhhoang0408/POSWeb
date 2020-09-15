import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Popup from 'reactjs-popup'
import axios from 'axios'
import { Input} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { message } from 'antd';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));


Search.propTypes = {
  onClickGetProductItem: PropTypes.func,
};

Search.defaultProps = {
  onClickGetProductItem: null
}

const test1 = {
  prodId: 0,
  prodCode: "SP11",
  prodName: "Ao dai",
  quantity: 10,
  discount: 100,
  priceIn: 1000,
  priceOut: 1000,
  imageLink: "https://gumac.vn/image/t82020/dam-caro-nut-boc-8111310720201718341113.jpg?width=220",
  catId: 0,

}


const ProductItem = (props) => {
  
  const {product} = props;
  

  return (
    <div className="prod-item" style={{background:"white"}}>
      <div className="container">
        <div className="row">
          <div className="col-4">
          <img id="prod-item-image" src={product.imageLink} alt="Logo" />
          <span> {product.prodName} </span>
          </div>
          <div className="col-5">
            <p> Số lượng: <strong> {product.quantity} </strong> </p>
          </div>
          <div className="col-3">
            <h6 id="price-item-prod" > {`${product.priceOut}₫`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} </h6>
          </div>
        </div>
      </div>
    </div>
  )
}


function Search(props) {
  
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("")
  
  const [options, setOptions] = useState([]);
  const [isQuantity, setIsQuantity] = useState(false);

  const {onClickGetProductItem} = props;

  useEffect(() => {
    async function getOptions() {
      const config = {
        name:"",
        page: 0,
        size: 5
      }
  
      axios.get(`http://localhost:9090/api/admin/product?name=${config.name}&page=${config.page}&size=${config.size}`)
      .then(res => {
        if(res.data.result === "found") {
          const newListProduct = res.data.data.content;
          setOptions(newListProduct);
        }else{
          console.log(res.data.data);
        }
      })
      .catch(error => {
        console.log(error);
      })
    }
    getOptions();
  }, [])

  const handleOnChange = (e) => {
    
    // console.log(String(e.target.value).type);
    // console.log(e.target.value.toString().type);
    // let x = Number(e.target.value)
    // console.log("x :", x.type)
    // let y = Number(12);
    // console.log("y", y.type);
    // console.log((Number(x) + 1) * 2);
    e.preventDefault();
    //console.log(e);
    // get API -> set lai Option
    const value = e.target.value;
    const config = {
      name: value,
      page: 0,
      size: 5
    }

    axios.get(`http://localhost:9090/api/admin/product?name=${config.name}&page=${config.page}&size=${config.size}`)
    .then(res => {
      if(res.data.result === "found") {
        const newListProduct = res.data.data.content;
        setOptions(newListProduct);
      }else{
        console.log(res.data.data);
        setOptions([])
      }
    })
    .catch(error => {
      console.log(error);
    })

    setValue(value);

  }

  const onClickProductItem = (product) => {
    
    console.log(product);
    
    if(product.quantity <= 0){
      message.warning({
        content: 'Không còn sản phẩm nào trong kho hàng !',
        className: 'custom-class',
        style: {
          marginTop: '20vh',
        },
      }, 10);
      setIsQuantity(true);
    }
    else{
      onClickGetProductItem(product);
      setIsQuantity(false);
    }
    
    
    //setValue(product.prodCode);
    setValue("")
    // set lai Option  
    setOpen(false)
  }
  return (
    <div className="search-bill">
      <Popup
        trigger={
          
        <form className="form-inline d-flex justify-content-center md-form form-sm" style={{width:"98%"}}>
          <input onChange={handleOnChange} className="form-control form-control-sm fl w-100" style={{padding: "2px"}} type="text" placeholder="Tìm kiếm sản phẩm"
            aria-label="Search" value={value}/>
        </form>
        }
        on="focus"
        closeOnDocumentClick
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        position="bottom center"
        contentStyle={{
          width: "94%",
        }}
      >
        <div className="list-group">
          {options.map((product, key) => (
            
            <button key={key} onClick={() => onClickProductItem(product)} type="button" id="btn-prod-bill-item" className="list-group-item list-group-item-action">
              <ProductItem product={product}/>
            </button>
          ))}
        </div>
      </Popup>
      
    </div>
  );
}

export default Search;