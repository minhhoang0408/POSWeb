import React, { useState} from 'react';
import PropTypes from 'prop-types';
import {InputNumber, message, Row, Select} from 'antd'
RowSelect.propTypes = {
  title: PropTypes.string,
  onChange: PropTypes.func,
  max: PropTypes.number,
};

RowSelect.defaultValue = {
  title: "",
  onChange: null,
  max: 0
}

function RowSelect(props) {

  const{title, onChange, max} = props;
  const {Option} = Select;
  const [isPercent, setIsPercent] = useState(true);
  const [valuePercent, setValuePercent] = useState();
  const [valueMoney, setValueMoney] = useState();

  const onChangeIsPercent = (value) => {
    if(value === "percent"){
      setIsPercent(true);
    }
    else{
      setIsPercent(false);
    }
  }
  return (
   <Row justify="space-between">
    <p style={{ width: "40%" }}>{title}</p>
    <div>
    {isPercent ?
        <InputNumber
          defaultValue={0}
          value={valuePercent}
          formatter={(value) => `${value}%`}
          style={{ width: "46%", textAlign:"right", float:"right" }}
          onChange={value => {
            if(value > 100){
              message.error({
                content: 'Giá trị chiết khấu vượt quá 100% !',
                className: 'custom-class',
                style: {
                  marginTop: '20vh',
                },
              })
              setValuePercent(0);
            }
            else{onChange(value, "percent")
            setValuePercent(value)
          }
          }}
          
          min={0}
          max={100}
         />
        :
        <InputNumber
          defaultValue={0}
          value={valueMoney}
          formatter={(value) =>
            `${value}đ`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }
          style={{ width: "46%", textAlign:"right", float:"right" }}
          onChange={(value) => 
            {
              if(value > max){
                message.error({
                  content: 'Giá trị chiết khấu vượt quá giá trị tổng sản phẩm !',
                  className: 'custom-class',
                  style: {
                    marginTop: '10vh',
                  },
                })
                setValueMoney(max);
              }
              else{
              onChange(value, "money");
              setValueMoney(value)
            }
            }}
          min={0}
          max={max}
        />
      }
      <Select defaultValue="percent" style={{ width: 50, float:"right" }} onChange={onChangeIsPercent}>
        <Option value="percent">%</Option>
        <Option value="money">đ</Option>
      </Select>
      
    </div>
  </Row>
  )
}

export default RowSelect;