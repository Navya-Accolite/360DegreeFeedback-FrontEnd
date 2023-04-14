import React from 'react'
import {FaStar} from 'react-icons/fa';
import '../Styles/StylesforGiveFeedback.css';
const colors = {
  orange: "#FFBA5A",
  grey: "#A9A9A9"
}
const StarRating = (props) => {
  const stars =Array(5).fill(0);
  const [currentVal, setCurrentVal]=React.useState(0);
  const [hoverVal,setHoverVal]=React.useState(undefined);
  const handleClick = value =>{
    setCurrentVal(value);
    let temp=props.starArr;
    console.log(temp);
  };
  const handleMouseOver = value =>{
    setHoverVal(value)
  }
  const handleMouseLeave = () =>{
    setHoverVal(undefined)
  }
  console.log("Value:",currentVal);
  return(
    <div className='container'>
      <div>
        {stars.map((_, index) => {
          return (
            <FaStar
              key={index}
              size={25}
              className='stars'
              color={(hoverVal || currentVal) > index ? colors.orange : colors.grey}
              onClick={()=>handleClick(index+1)}
              onMouseOver={()=> handleMouseOver(index+1)}
              onMouseLeave={handleMouseLeave}
            />
          )
        })}
      </div>
    </div>
  )
};

export default StarRating;